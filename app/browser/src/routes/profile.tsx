import React, { useCallback, useState } from "react";
import {
  Card,
  Header,
  Icon,
  Input,
  Image,
  Message,
  Grid,
} from "semantic-ui-react";
import { Page } from "../components/Page";
import { ModalUsernameChooser } from "../components/user/ModalUsernameChooser";
import { useUser } from "../User";

export const Profile: React.FC = () => {
  const user = useUser();
  const [
    modalEditUsernameActive,
    setmodalEditUsernameActive,
  ] = useState<boolean>(false);

  const email = (user && user.email) || "";
  const picture = (user && user.picture) || "";
  const username = (user && user.username) || "";

  const toggleModalEditUsername = useCallback(() => {
    setmodalEditUsernameActive(!modalEditUsernameActive);
  }, [modalEditUsernameActive]);

  if (!user) {
    return (
      <Message negative>
        <Message.Header>Cannot find you</Message.Header>
        <p>Going back is probably your best path</p>
      </Message>
    );
  }

  return (
    <Page>
      <ModalUsernameChooser
        toggle={toggleModalEditUsername}
        active={modalEditUsernameActive}
      />
      <Grid padded rows={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Card>
              <Card.Content>
                <Grid columns="2">
                  <Grid.Row>
                    <Grid.Column width="4"></Grid.Column>
                    <Grid.Column floated="right" width="12">
                      {picture !== "" ? (
                        <Image
                          floated="right"
                          avatar
                          size="large"
                          src={picture}
                        />
                      ) : (
                        <svg
                          viewBox="0 0 100 100"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="50" cy="50" r="50" />
                        </svg>
                      )}
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column
                      width="4"
                      textAlign="right"
                      verticalAlign="middle"
                    >
                      <Header size="tiny">username</Header>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input
                        fluid
                        icon={<Icon name="edit" />}
                        value={username}
                        onClick={toggleModalEditUsername}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column
                      width="4"
                      textAlign="right"
                      verticalAlign="middle"
                    >
                      <Header size="tiny">email</Header>
                    </Grid.Column>
                    <Grid.Column width="12">
                      <Input fluid value={email} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={5} />
        </Grid.Row>
      </Grid>
    </Page>
  );
};
