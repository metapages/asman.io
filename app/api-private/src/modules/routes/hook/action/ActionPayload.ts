// import { DB } from "../../db";
// import {FastifyLoggerInstance } from "fastify";
import {FastifyRequestWithDB } from "../../../db/index";

type SessionVariables = Record<string, string> & {["x-hasura-user-id"]:string,["x-hasura-role"]:string};

export interface ActionPayload<T> {
    // These are from hasura
    session_variables: SessionVariables;
    input: T;
    action: { name: string };
    request: FastifyRequestWithDB;
    // These are added by our app
    // db: DB;
    // log: FastifyLoggerInstance
}
