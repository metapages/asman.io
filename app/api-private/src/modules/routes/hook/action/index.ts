import { FastifyReply, FastifyInstance } from "fastify"
import * as requireEnv from "require-env-variable";
import { ActionPayload } from "./ActionPayload";
import { FastifyRequestWithDB } from "../../../db";
import * as actions from "./actions";

// This route is protected by a token that only the graphql service possesses
const bearerAuthPlugin = require('fastify-bearer-auth')

let { API_KEY }: any = requireEnv.default(["API_KEY"]);
const keys = new Set([API_KEY]);

async function routes(server: FastifyInstance) {
    // protect this route with a key known only by the graphql service
    server.register(bearerAuthPlugin, { keys, bearerType: '', });
    server.post("/hook/action", {}, async (request: FastifyRequestWithDB, reply: FastifyReply) => {
        try {
            const actionPayload: ActionPayload<any> = request.body as ActionPayload<any>;
            console.log('request', actionPayload);
            if (actions[actionPayload.action.name]) {
                // decorate the payload with the sdk rather than decorating the request
                actionPayload.request = request;
                // actionPayload.log = request.log;
                const response = await actions[actionPayload.action.name](actionPayload);
                console.log('response', response);
                return reply.code(200).send(response);
            } else {
                // https://hasura.io/docs/1.0/graphql/core/actions/action-handlers.html
                return reply.code(400).send({ message: 'Unrecognized action', code: undefined });
            }
        } catch (error) {
            request.log.error(error);
            return reply.send(500);
        }
    });
}

export default routes;
