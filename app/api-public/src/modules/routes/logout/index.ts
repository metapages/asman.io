/**
 * Login handler using vouch-proxy to do the OAuth heavy lifting.
 * Don't use e.g. passport since we are not protecting routes, we are using
 * validate callbacks
 */
import * as env from 'env-var';
import { FastifyRequest, FastifyReply } from "fastify";
import { PluginMetadata } from "fastify-plugin";
import { default as fp } from "fastify-plugin";
import { FastifyInstanceWithDB } from "../../db/index";

// env var config
const APP_FQDN: string = env.get('APP_FQDN').required().asString();
const APP_PORT: string = env.get('APP_PORT').default('443').asString();
const APP_FQDN_PLUS_PORT: string = `${APP_FQDN}${APP_PORT === "443" ? "" : ":" + APP_PORT}`;

export default fp(async (server: FastifyInstanceWithDB, _: PluginMetadata, next: any) => {
    // see https://www.fastify.io/docs/latest/TypeScript/ to type headers and the body
    server.get("/logout", {}, async (request: FastifyRequest, reply: FastifyReply) => {
        const redirectUrl = request.query['url'] ? request.query['url'] : `https://${APP_FQDN_PLUS_PORT}`;
        reply.clearCookie(APP_FQDN, { domain: APP_FQDN, httpOnly: true, path: '/', secure: true });
        reply.clearCookie(`${APP_FQDN}_authenticated`, { domain: APP_FQDN, httpOnly: true, path: '/', secure: true });

        // the name of this cookie comes from vouch configuration
        // e.g. app/vouch/oauth/app1.dev:443.yaml
        reply.clearCookie(`${APP_FQDN}_OAuthCookie`.replace(':', '.'), { domain: APP_FQDN, httpOnly: true, path: '/', secure: true });

        return reply.redirect(redirectUrl);
    });
    next();
});
