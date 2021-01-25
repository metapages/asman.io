import { FastifyInstance, FastifyRequest } from "fastify";
import { PluginMetadata } from "fastify-plugin";
import { default as fp } from "fastify-plugin";
import { db, DB } from "./db";

export interface FastifyRequestWithDB extends FastifyRequest {
  db: DB;
}

export interface FastifyInstanceWithDB extends FastifyInstance {
  db: DB;
}

// fastify plugin register
export default fp(async (server: FastifyInstance, opts: PluginMetadata, next: any) => {

  server.decorate("db", db);

  next();
});
