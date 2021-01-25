import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ErrorDisplayProvider, ErrorDisplay } from "./ErrorDisplayProvider";
import { Login } from "./routes/login";
import { Logout } from "./routes/logout";
import { About } from "./routes/about";
import { Index } from "./routes/index";
import { Profile } from "./routes/profile";
import { Terms } from "./routes/terms";
import { Contact } from "./routes/contact";
import { Privacy } from "./routes/privacy";
import { Index as UserRoute } from "./routes/user";
import { ModalUsernameChooserCheck } from "./components/user/ModalUsernameChooser";

import { UserProvider } from "./User";
import { localDevelopmentCookieCheck } from "./auth";

export const App: React.FC = () => {
  // To get seamless login/logout on a development browser, we temporarily store a short-lived
  // cookie 🍪 only if logging in on the dev browser (just app/browser/dev).
  // If:
  //   - the cookie 🍪 exists
  //   - and we are authenticated
  // then redirect to the development browser location (the value of the cookie)
  // This code is ignored in production
  localDevelopmentCookieCheck();

  return (
    <div className="App">
      <ErrorDisplayProvider>
        <ErrorDisplay />
        <UserProvider>
          <BrowserRouter basename="/">
            <ModalUsernameChooserCheck />
            <QueryParamProvider ReactRouterRoute={Route}>
              <Switch>
                <Route exact path="/" component={Index} />
                <Route key="login" path="/login" component={Login} />
                <Route key="logout" path="/logout" component={Logout} />
                <Route key="about" path="/about" component={About} />
                <Route key="terms" path="/terms" component={Terms} />
                <Route key="contact" path="/contact" component={Contact} />
                <Route key="privacy" path="/privacy" component={Privacy} />
                <Route
                  key="profile"
                  path="/profile"
                  render={(props: any) => <Profile {...props} />}
                />
                <Route
                  path="/:username"
                  render={(props: any) => <UserRoute {...props} />}
                />
              </Switch>
            </QueryParamProvider>
          </BrowserRouter>
        </UserProvider>
      </ErrorDisplayProvider>
    </div>
  );
};
