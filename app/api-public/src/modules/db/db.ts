import { GraphQLClient } from "graphql-request";
import requireEnv = require("require-env-variable");
import { getSdk, Sdk } from "./graphql/generated/sdk";

// BUG WORKAROUND
// https://github.com/prisma-labs/graphql-request/issues/206#issuecomment-687851388
import { Headers } from "cross-fetch";
// @ts-ignore
global.Headers = global.Headers || Headers;
// END BUG WORKAROUND

// @ts-ignore
let { HASURA_GRAPHQL_ORIGIN, HASURA_GRAPHQL_ADMIN_SECRET }: any = requireEnv(["HASURA_GRAPHQL_ORIGIN", "HASURA_GRAPHQL_ADMIN_SECRET"]);

const sdk = getSdk(new GraphQLClient(`${HASURA_GRAPHQL_ORIGIN}/v1/graphql`, {
  headers: {
    "x-hasura-admin-secret": HASURA_GRAPHQL_ADMIN_SECRET,
  }
}));

export {
  sdk as db,
  Sdk as DB,
};
