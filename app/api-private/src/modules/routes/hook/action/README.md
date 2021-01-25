## Adding actions:

Convention: hasura action names match the file name of the handler (see `./actions` for a list of actions)

**Requires:*
 - `just up`

- `just graphql console`
- "Actions"
- "Create"
- "Handler"
  - Value: `{{HASURA_GRAPHQL_ACTION_HOOK}}` (literal, with braces)
- Fill out the rest
  - "# Define your action here" matches the file handler name created in `./actions`
- Create a handler in `./actions` (copy an existing, and rename as appropriate)
- Add custom logic
