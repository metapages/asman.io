/**
 * Login handler using vouch-proxy to do the OAuth heavy lifting.
 * Don't use e.g. passport since we are not protecting routes, we are using
 * validate callbacks
 */
import { assert } from 'console';
import * as env from 'env-var';
import { FastifyRequest, FastifyReply } from "fastify";
import { PluginMetadata } from "fastify-plugin";
import { default as fp } from "fastify-plugin";
import { Response, default as got } from "got";
import {
    StatusCodes,
} from 'http-status-codes';
import parse from 'parse-duration';
import { FastifyInstanceWithDB } from "../../db/index";

// env var config
const ORIGIN_VOUCH_INTERNAL: string = env.get('ORIGIN_VOUCH_INTERNAL').required().asString();
const APP_FQDN: string = env.get('APP_FQDN').required().asString();
const APP_PORT: string = env.get('APP_PORT').default('443').asString();
const APP_FQDN_PLUS_PORT: string = `${APP_FQDN}${APP_PORT === "443" ? "" : ":" + APP_PORT}`;
const VOUCH_ORIGIN_EXTERNAL = `https://oauth.${APP_FQDN_PLUS_PORT}`;
const AUTH_ORIGIN_EXTERNAL = `https://${APP_FQDN_PLUS_PORT}`;

const COOKIE_MAX_AGE_SECONDS = parse('1 week', 's');

// ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                              href                                              │
// ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
// │ protocol │  │        auth         │          host          │           path            │ hash  │
// │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
// │          │  │                     │    hostname     │ port │ pathname │     search     │       │
// │          │  │                     │                 │      │          ├─┬──────────────┤       │
// │          │  │                     │                 │      │          │ │    query     │       │
// "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
// │          │  │          │          │    hostname     │ port │          │                │       │
// │          │  │          │          ├─────────────────┴──────┤          │                │       │
// │ protocol │  │ username │ password │          host          │          │                │       │
// ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
// │   origin    │                     │         origin         │ pathname │     search     │ hash  │
// ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
// │                                              href                                              │
// └────────────────────────────────────────────────────────────────────────────────────────────────┘
// (All spaces in the "" line should be ignored. They are purely for formatting.)

export default fp(async (server: FastifyInstanceWithDB, _: PluginMetadata, next: any) => {
    // see https://www.fastify.io/docs/latest/TypeScript/ to type headers and the body
    server.get("/login", {}, async (request: FastifyRequest, reply: FastifyReply) => {
        const urlVouchValidate = `${ORIGIN_VOUCH_INTERNAL}/validate`;
        let vouchResponse: Response<string>;

        const hostDomain :string = request.hostname;
        const referrerDomain :string = request.headers.referer ? new URL(request.headers.referer).hostname : '';

        // Think like a cookie: if we have a development server on a different domain when we redirect after a login
        // we go to the APP_FQDN server NOT the development server (which we want) so set a cookie to tell the
        // non-dev client to redirect to the dev server
        if (hostDomain !== referrerDomain && referrerDomain.endsWith('.localhost')) {
            reply.setCookie('volatile_development_login_cookie', request.headers.referer, { sameSite: 'none', domain: APP_FQDN, maxAge: 10, httpOnly: false, path: '/', secure: true });
            // also tell the development server that they are authenticated, even tho technically they aren't YET
            // but this is the last time we have enough context to tell the dev server
            reply.setCookie(`${referrerDomain}_authenticated`, 'true', { sameSite: 'none', domain: referrerDomain, maxAge: COOKIE_MAX_AGE_SECONDS, httpOnly: false, path: '/', secure: true });
        }

        try {
            // only the cookie needs to be passed along to vouch
            vouchResponse = await got.get(urlVouchValidate, { headers: { cookie: request.headers.cookie }, throwHttpErrors: false });

            if (vouchResponse.statusCode === StatusCodes.UNAUTHORIZED) {
                // create a 302 redirect as per vouch docs
                // normally handled with ngnix config but we need to do it here to
                // magically handle all the different use cases
                // see https://github.com/vouch/vouch-proxy
                // convention
                // we redirect back to THIS endpoint so that we can harvest the vouch JWT and get the user data
                const urlRedirect = `${VOUCH_ORIGIN_EXTERNAL}/login?url=${AUTH_ORIGIN_EXTERNAL}/login&vouch-failcount=&X-Vouch-Token=&error=`;
                console.log('urlRedirect', urlRedirect);

                return reply.redirect(urlRedirect);
            } else if (vouchResponse.statusCode !== StatusCodes.OK) {
                request.log.error(`${urlVouchValidate} status=${vouchResponse.statusCode} body=${vouchResponse.body}`);
                return reply.code(500).send('Internal error ugh');
            }
            // continue the main block
        } catch (err) {
            request.log.error({ error: `${err}` });
            return reply.code(500).send('Internal error ugh');
        }
        // create the user if needed
        // create a new browser cookie session
        // add cookie to cache
        const email: string = vouchResponse.headers["x-vouch-idp-claims-email"] as string;
        const picture: string | undefined = vouchResponse.headers["x-vouch-idp-claims-picture"] as string;
        const vouch_success = vouchResponse.headers["x-vouch-success"] === 'true';
        if (!vouch_success || !email || email === '') {
            request.log.error(`${urlVouchValidate} status=${vouchResponse.statusCode} but no user found`);
            return reply.code(500).send('Internal error ugh');
        }

        try {
            await server.db.UpsertUser({ email, picture });

            const responseGetUser = await server.db.GetUserByEmail({ email });
            if (responseGetUser.users.length == 0) {
                request.log.error(`email=${email} error=Failed to find user after upsert`);
                return reply.code(500).send('Internal error ugh');
            }

            const user = responseGetUser.users[0];
            const userId = user.id;

            const tokenResponse = await server.db.CreateSessionToken({ userId });
            const token: string = tokenResponse.insert_tokens.returning[0].token;
            assert(token);

            // finally everything worked, we have a new app cookie
            // SameSite=None is required for the dev case, but also for things like embedded apps, which is most of my apps so far 🤷
            reply.setCookie(APP_FQDN, token, { sameSite: 'none', domain: APP_FQDN, maxAge: COOKIE_MAX_AGE_SECONDS, httpOnly: true, path: '/', secure: true });
            reply.setCookie(`${APP_FQDN}_authenticated`, 'true', { sameSite: 'none', domain: APP_FQDN, maxAge: COOKIE_MAX_AGE_SECONDS, httpOnly: false, path: '/', secure: true });
            // clients cannot see the above cookie, but it's much easier for clients to know the state
        } catch (err) {
            request.log.error(`Failed to upsert user or insert token email=${email} error=${err}`);
            return reply.code(500).send('Internal error ugh');
        }

        // by default, redirect to the main app. Should this be configurable or dynamic?
        return reply.redirect(`https://${APP_FQDN_PLUS_PORT}`);
    });
    next();
});
