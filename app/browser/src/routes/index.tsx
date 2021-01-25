import React from "react";
import { Page } from "../components/Page";
import { useUser } from "../User";

export const Index: React.FC = () => {
  const user = useUser();

  return (
    // this key is a hack
    <Page menu={[]}>
      {user ? <div>Logged in!</div> : <div>NOT Logged in!</div>}
    </Page>
  );
};
