import React from "react";
import { Grid } from 'semantic-ui-react';
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Page: React.FC<any> = props => (
  <div>
    <Header menu={props.menu} />
      <Grid padded={true} >
        <Grid.Column>
          {props.children}
        </Grid.Column>
      </Grid>
    <Footer />
  </div>
);
