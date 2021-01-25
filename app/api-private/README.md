# App API

Roles:

1. Respond to graphql events and actions
2. Possibly handle auth if the auth service is removed
3. Handle job queues
4. Other business logic

## Deployment

`api` can be deployed to scalable instances, or lambdas/cloud functions. The latter is favoured for automatic scaling and cost.
