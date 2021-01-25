import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Footer: React.FC = () => (
  <Menu text>
    <Menu.Item as={Link} name="Terms" to="/terms" />
    <Menu.Item as={Link} name="Privacy" to="/privacy" />
    <Menu.Menu position="right">
      <Menu.Item as={Link} name="About" to="/about" />
      <Menu.Item as={Link} name="Contact" to="/contact" />
    </Menu.Menu>
  </Menu>
);

export { Footer };
