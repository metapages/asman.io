import { FastifyInstance, FastifyRequest } from "fastify";
import { default as fp } from "fastify-plugin";
import { db, DB } from "./db";

export interface FastifyRequestWithDB extends FastifyRequest {
  db: DB;
}

// export interface FastifyInstanceWithDB extends FastifyInstance {
//   db: DB;
// }

// fastify plugin register
export default fp(async (server: FastifyInstance, opts: any, next: any) => {

  // server.decorate("db", db);
  server.decorateRequest("db", db);

  next();
});
