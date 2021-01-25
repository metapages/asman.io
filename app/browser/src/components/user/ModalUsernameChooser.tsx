import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Header, Label, Loader, Modal } from "semantic-ui-react";
import {
  useSetUsernameMutation,
  useIsUsernameQuery,
} from "../../graphql/generated/types";
import { useUser } from "../../User";
import { useErrorDisplay } from "../../ErrorDisplayProvider";
import { useInputChange } from "../../utils/hooks";

export interface ModalUsernameChooserProps {
  active?: boolean;
  force?: boolean;
  toggle?: () => void;
}

// Show the username model IF the user doesn't have one
export const ModalUsernameChooserCheck: React.SFC = () => {
  const user = useUser();

  if (user && !user.username) {
    return <ModalUsernameChooser force={true} />;
  }

  return null;
};

interface Inputs {
  username?: string;
}
export const ModalUsernameChooser: React.SFC<ModalUsernameChooserProps> = ({
  active,
  force,
  toggle,
}) => {
  const user = useUser();
  const errorDisplay = useErrorDisplay();

  const [input, setInput, handleInputChange] = useInputChange<Inputs>();
  const [submittedUsername, setsubmittedUsername] = useState<
    string | undefined
  >();
  const [error, seterror] = useState<string | undefined>();

  // update the current username if the actual user object is updated ∴ has a new username
  useEffect(() => {
    if (
      input.username === undefined &&
      user &&
      user.username !== undefined &&
      user.username !== ""
    ) {
      setInput({
        username: user.username !== null ? user.username : undefined,
      });
    }
  }, [input.username, user]);

  // run the search on every username update
  const usenameQueryResult = useIsUsernameQuery({
    variables: {
      username: input.username!,
    },
    skip: !input.username,
  });

  const [
    upsertUsernameMutation,
    upsertUsernameMutationResult,
  ] = useSetUsernameMutation({
    refetchQueries: () => ["GetUser"],
  });

  const insertOrUpdateUsername = useCallback(async () => {
    if (input.username !== undefined && input.username !== "") {
      // tell the rest of the dialog that we're submitting
      const nameToSubmit = input.username.toLowerCase();
      setsubmittedUsername(nameToSubmit);
      const upsertResult = await upsertUsernameMutation({
        variables: { username: input.username },
      });

      if (!upsertResult.errors && toggle) {
        toggle();
      }
      if (errorDisplay && upsertResult.errors) {
        console.log("appending to error list");
        errorDisplay?.appendError(upsertResult.errors);
      }
      setsubmittedUsername(undefined);
    }
  }, [input.username]);

  const isSuggestedNameTaken: boolean =
    usenameQueryResult?.data?.isUsername?.exists === true;
  let isUsernameOkThing = null;

  if (usenameQueryResult && usenameQueryResult.loading) {
    isUsernameOkThing = <Loader />;
  }
  if (usenameQueryResult && usenameQueryResult.error) {
    console.error(error);
  } else {
    if (user && input.username && input.username !== user.username) {
      if (usenameQueryResult && usenameQueryResult.data) {
        isUsernameOkThing = (
          <Label basic color="green" pointing="left">
            is available!
          </Label>
        );
      } else if (isSuggestedNameTaken) {
        isUsernameOkThing = (
          <Label basic color="red" pointing="left">
            is taken
          </Label>
        );
      }
    } else if (user && input.username && input.username === user.username) {
      isUsernameOkThing = (
        <Label basic color="yellow" pointing="left">
          is your current username
        </Label>
      );
    }
  }

  return (
    <Modal open={!!(active || force)} closeIcon={!force} onClose={toggle}>
      <Header icon="archive" content="Choose a unique username" />

      <Modal.Content>
        <Form>
          <Form.Group>
            <Form.Field inline width={16}>
              <input
                name="username"
                autoFocus
                type="text"
                onChange={handleInputChange}
                value={input.username || ""}
              />
              {isUsernameOkThing}
            </Form.Field>
          </Form.Group>

          <Button
            type="submit"
            onClick={insertOrUpdateUsername}
            disabled={
              input.username === undefined ||
              input.username === "" ||
              isSuggestedNameTaken
                ? true
                : false
            }
            loading={submittedUsername !== undefined}
          >
            {force ? "Set" : "Change"}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
