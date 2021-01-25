import React, { useEffect, useState } from "react";
import { Button, Header, Loader, Message } from "semantic-ui-react";
import { LOGOUT_URL, LOGIN_URL } from "../auth";


export const Logout: React.FC = () => {

  const [ message, setmessage ] = useState<{message:string, type:string} | undefined>();
  const [ loader, setloader ] = useState<boolean>(false);

  useEffect(() => {
    setloader(true);
    // this removes the app auth cookie and sets cookie: <host>_authenticated=false
    const logoutUrl = new URL(LOGOUT_URL);
    logoutUrl.searchParams.append('url', window.location.origin);
    window.location.href = logoutUrl.href;
    fetch(LOGOUT_URL).then(
      () => {
        setloader(false);
        setmessage({message:"Successfully unauthenticated (I don't know who you are anymore)", type:""});
      },
      (e) => console.error(e)
    );
  }, []);

  return (
    <div>
      <Header content="Logging out..." />
      {loader ? <Loader/> : <Button
        onClick={() =>
          // without an auth cookie, the login process is initiated
          (window.location.href = LOGIN_URL)
        }
      >
        Login
      </Button>}
      {message ? <Message error={message.type==='error'}>{message.message}</Message> : null}
    </div>
  );
};
