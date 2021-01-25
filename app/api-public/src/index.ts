// inspired by https://github.com/sharenowTech/fastify-with-typescript-demo
import * as sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import { readFileSync } from 'fs';
import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import fastifyBlipp from "fastify-blipp";
import fastifyCookie from "fastify-cookie";
import db from "./modules/db";
import healthz from "./modules/routes/healthz";
import login from "./modules/routes/login";
import logout from "./modules/routes/logout";

// Google Cloud Run will set this environment variable for you, so
// you can also use it to detect if you are running in Cloud Run
const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

// Browser assets live here
const root = '/var/www/html/';

const server: fastify.FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
// Decide if logging should be disabled. I can't think of a reason to
// disable it for any cases yet.
> = fastify.fastify({ logger: true });

server.register(fastifyBlipp);
server.register(healthz);
server.register(db);
server.register(fastifyCookie);
server.register(login);
server.register(logout);

// serve browser assets
// even if using a CDN, likely makes sense to serve index.html from the main app
server.register(require('fastify-static'), {
    root,
    wildcard: false,
});

// If you cannot find the asset, serve the index by default (Single Page Application SPA)
// When in development mode, always serve the fresh index.html rather than the cached file
const index :string|undefined = process.env.NODE_ENV !== 'development' ? readFileSync(`${root}index.html`, 'utf-8') : undefined;
server.get('/*', (_, reply) => {
    if (index) {
        reply.type('text/html').send(index);
    } else {
        reply.type('text/html').send(readFileSync(`${root}index.html`, 'utf-8'));
    }
});

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
