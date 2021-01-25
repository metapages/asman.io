# The graphql-engine cli is not bundled with the actual engine itself
FROM hasura/graphql-engine:v1.3.3.cli-migrations-v2
COPY ./migrations /hasura-migrations
COPY ./metadata /hasura-metadata
