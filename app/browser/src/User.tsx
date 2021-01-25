import React, { useEffect, useState } from "react";
import { Users, useGetUserQuery } from "./graphql/generated/types";
import { useErrorDisplay } from "./ErrorDisplayProvider";
import { LOGOUT_URL } from "./auth";

export type UserType = Pick<Users, "email" | "picture" | "username">;

export const UserContext = React.createContext<UserType | undefined>(undefined);

export const UserProvider: React.FC<any> = (props) => {
  const [user, setUser] = useState<UserType | undefined>();

  // try once to get the user IF we have a cookie indicating we're auth'ed
  // undefined 'user' value means just that: we're not authenticated
  // we can keep as much UI simpler if only the bits that care get the user
  // ASSUME errors here mean unauthenticated (likely not always true but ?)
  const userResult = useGetUserQuery({ errorPolicy:"ignore" });

  const errorDisplay = useErrorDisplay();

  useEffect(() => {
    if (
      userResult.data &&
      userResult.data.users &&
      userResult.data.users[0]
    ) {
      const foundUser: UserType = {
        email: userResult.data.users[0].email,
        picture: userResult.data.users[0].picture,
        username: userResult.data.users[0].username,
      };
      setUser(foundUser);
    } else if (userResult.error) {
      if (errorDisplay) {
        errorDisplay.appendError(userResult.error);
      }
      console.error(userResult.error);
      if (`${userResult.error}`.indexOf('Authentication hook unauthorized this request') > -1) {
        setTimeout(() => window.location.href = LOGOUT_URL, 2000);
      }
    }
  }, [userResult]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return React.useContext(UserContext);
};
