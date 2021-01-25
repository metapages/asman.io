import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify"

async function routes(server: FastifyInstance) {
    server.get("/healthz", { logLevel: 'warn' }, async (_: FastifyRequest, reply: FastifyReply) => {
        return reply.code(200).send('OK');
    });
}

export default routes;
