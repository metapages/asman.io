// inspired by https://github.com/sharenowTech/fastify-with-typescript-demo

import * as sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import * as fastify from "fastify";
import fastifyBlipp from "fastify-blipp";
import fastifyCookie from "fastify-cookie";
import { Server, IncomingMessage, ServerResponse } from "http";
// import statusRoutes from "./modules/routes/status";
import healthz from "./modules/routes/healthz";
import routeAction from "./modules/routes/hook/action";
import routeValidate from "./modules/routes/hook/auth";
// import errorThrowerRoutes from "./modules/routes/error-thrower";
import db from "./modules/db";

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify.fastify({ logger: true });

server.register(fastifyBlipp);
server.register(healthz);
server.register(db);
server.register(fastifyCookie);
server.register(routeAction);
server.register(routeValidate);
// server.register(statusRoutes);
// server.register(errorThrowerRoutes);

// Google Cloud Run will set this environment variable for you, so
// you can also use it to detect if you are running in Cloud Run
const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const start = async () => {
  try {
    await server.listen(port, "0.0.0.0");
    // Minimize cloud-run logs
    if (IS_GOOGLE_CLOUD_RUN) {
      server.blipp();
    }
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

process.on("uncaughtException", error => {
  console.error(error);
});
process.on("unhandledRejection", error => {
  console.error(error);
});

start();
