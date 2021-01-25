/**
 * Auth hook for hasura to validate requests and return the role + userId
 */
import * as env from 'env-var';
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"
import {
    StatusCodes,
} from 'http-status-codes';
import * as NodeCache from "node-cache";
import { FastifyRequestWithDB } from "../../../db";

const APP_FQDN: string = env.get('APP_FQDN').required().asString();

/* Cache tokens for 5m */
const cache = new NodeCache.default({ stdTTL: 5 * 60, useClones: false, maxKeys: 1000000 });

/* For caching failures, in case of DDOS */
const cacheFail = new NodeCache.default({ stdTTL: 10 * 60, useClones: false, maxKeys: 1000000 });

async function routes(server: FastifyInstance) {
    // hasura auth hook
    // https://hasura.io/docs/1.0/graphql/core/auth/authentication/webhook.html
    server.get("/hook/auth", {}, async (request: FastifyRequestWithDB, reply: FastifyReply) => {
        const token: string | undefined = getTokenFromRequest(request);
        if (!token) {
            return reply.code(StatusCodes.UNAUTHORIZED).send('UNAUTHORIZED');
        }

        // don't let adverserial fake tokens tie up the db
        if (cacheFail.get(token)) {
            return reply.code(StatusCodes.UNAUTHORIZED).send('UNAUTHORIZED');
        }

        // check local in-memory cache, relieves unnecessary db hits
        let userId: string | undefined = cache.get(token);
        if (!userId) {
            const user = await request.db.GetUserFromToken({ token, now: new Date() });
            if (user.tokens[0]) {
                userId = user.tokens[0].user;
                cache.set(token, userId);
            }
        }

        if (!userId) {
            // no token in db? Add to fail cache
            cacheFail.set(token, true);
            return reply.code(StatusCodes.UNAUTHORIZED).send('UNAUTHORIZED');
        }

        // https://hasura.io/docs/1.0/graphql/core/auth/authentication/webhook.html#response
        return reply.code(200).send({
            "X-Hasura-User-Id": userId,
            "X-Hasura-Role": "user",
        });
    });
}

/**
 * Get the token from anywhere it could be
 * @param request
 */
const getTokenFromRequest = (request: FastifyRequest): string | undefined => {
    // 1st check cookie
    let token = request.cookies[APP_FQDN];
    if (!token) {
        // 2nd check headers
        const authHeader = request.headers['authorization'];
        if (authHeader) {
            token = authHeader.replace('Bearer', '').trim();
        }
    }
    if (!token) {
        // 2nd check URL params: ?token=...
        token = request.params['token'];
    }

    return token;
}

export default routes;
