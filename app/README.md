# `app`: The Deployed Application

Opinionated web/service server stack for scalable cloud services, web servers, work queues.

Flexible, extendible cloud based applications built from a sturdy skeleton.

- deployed into a cloud provider
- hasura graphql + postgres as flexible database/state representation
  - scalable containers plus configurable persistent database
  - browser clients only speak graphql and cloud storage
- typescript nodejs event handlers, for application logic and database backed work queues
  - cloud functions/lambdas, or autoscaling containers
- typed database backed web client
  - served via any mixture of cloud CDN, application server, cloud storage
