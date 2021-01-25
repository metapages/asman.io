// ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                              href                                              │
// ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
// │ protocol │  │        auth         │          host          │           path            │ hash  │
// │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
// │          │  │                     │    hostname     │ port │ pathname │     search     │       │
// │          │  │                     │                 │      │          ├─┬──────────────┤       │
// │          │  │                     │                 │      │          │ │    query     │       │
// "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
// │          │  │          │          │    hostname     │ port │          │                │       │
// │          │  │          │          ├─────────────────┴──────┤          │                │       │
// │ protocol │  │ username │ password │          host          │          │                │       │
// ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
// │   origin    │                     │         origin         │ pathname │     search     │ hash  │
// ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
// │                                              href                                              │
// └────────────────────────────────────────────────────────────────────────────────────────────────┘
// (All spaces in the "" line should be ignored. They are purely for formatting.)

import { useEffect } from "react";
import { useCookies } from "react-cookie";

// allow manual override so we can e.g. test the local browser client against
// any cloud (non-local) server.
// NB: login/out with the dev server must use the actual ingress address otherwise
// the SPA will just route locally and that goes to the dev-reloading server which
// should proxy that request, but doesn't (properly?).

// parcel specific:
// parcel ONLY loads env vars from files, not the environment directly
// so we have to check some assumptions:
//   - if process.env.APP_ORIGIN exists then we are doing local development (process.env.NODE_ENV===development)
//     then use process.env.APP_ORIGIN to get the APP_ORIGIN
//     because the dev browser origin is different from the graphql origin
let APP_ORIGIN = window.location.origin;

if (process.env.NODE_ENV === "development") {
  if (process.env.APP_ORIGIN) {
    APP_ORIGIN = process.env.APP_ORIGIN;
  }
  console.log(`|NODE_ENV === development| APP_ORIGIN=${APP_ORIGIN}`);
}

const logoutUrl = new URL(`${APP_ORIGIN}/logout`);
export const LOGOUT_URL = logoutUrl.href;

const loginUrl = new URL(`${APP_ORIGIN}/login`);
export const LOGIN_URL = loginUrl.href;

const graphqlUrl = new URL(`${APP_ORIGIN}/v1/graphql`);
graphqlUrl.hostname = `graphql.${graphqlUrl.hostname}`;
export const GRAPHQL_URL = graphqlUrl.href;

export const logout = () => {
  window.location.replace("/logout");
};

/**
 * Local development (on the host machine) uses the parcel dev server for the browser assets and
 * thus a different port than the main app. This causes problems for login and logout because
 * those routes are not part of the SPA and for whatever reasons, are not properly proxied by
 * the dev server. To workaround, when NODE_ENV==development (set automatically by parcel during development)
 * then the browser sets a temporary cookie that stores our development origin (https://<hostname>:<port>)
 * so that when login redirection occurs, the browser can set the URL back to the development
 * server, instead of the static browser server by the main app (which do not contain the freshly compiled
 * browser assets).
 * Maybe this isn't the best solution, and maybe I'm missing something, but it works, and I no longer
 * have to think about it.
 */

const TEMP_LOCAL_DEV_LOGIN_COOKIE_NAME = "volatile_development_login_cookie";

export const localDevelopmentCookieCheck = () => {
  const [cookies, _, removeCookie] = useCookies([
    TEMP_LOCAL_DEV_LOGIN_COOKIE_NAME,
  ]);

  useEffect(() => {
    if (cookies[TEMP_LOCAL_DEV_LOGIN_COOKIE_NAME]) {
      console.log(
        `FOUND TEMP_LOCAL_DEV_LOGIN_COOKIE_NAME ${cookies[TEMP_LOCAL_DEV_LOGIN_COOKIE_NAME]}`
      );

      // update the host to the value in the cookie
      const redirectURL = new URL(window.location.href);
      if (redirectURL.host !== cookies[TEMP_LOCAL_DEV_LOGIN_COOKIE_NAME]) {
        console.log(`I want to redirect to ${redirectURL.href}`);
        window.location.href = cookies[TEMP_LOCAL_DEV_LOGIN_COOKIE_NAME];
      }
    }
  }, [cookies]);
};
