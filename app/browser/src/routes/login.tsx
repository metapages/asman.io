import React, { useEffect } from "react";
import { Loader, Header } from "semantic-ui-react";
import { LOGIN_URL } from "../auth";

export const Login: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      if (new URL(window.location.href).origin !== new URL(LOGIN_URL).origin) {
        console.log("LOGIN_URL", LOGIN_URL);
      }
      // start the auth process by loading the login route from the server
      window.location.href = LOGIN_URL;
      if (window.location.origin === new URL(LOGIN_URL).origin) {
        // we are NOT a dev server, so refresh, since being here means the SPA
        // didn't hit the server
        window.location.reload();
      } else {
        // since the login origin and our origin don't match, we're a dev browser,
        // so switch to the server origin to get the proper removal of cookies
        window.location.href = LOGIN_URL;
      }
    }, 100);
  }, []);

  return (
    <div>
      <Header content="Logging in" />
      <Loader active />
    </div>
  );
};
