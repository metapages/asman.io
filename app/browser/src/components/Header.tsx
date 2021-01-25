import React from "react";
import { Link, useParams } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { ProfileButton } from "./user/ProfileButton";
import { useUser } from "../User";
import { Params } from "../utils/url";

interface HeaderProps {
  menu: any;
}

const Header: React.FC<HeaderProps> = ({ menu }) => {
  let { username } = useParams() as Params;
  const user = useUser();

  const actualUsername = user && user.username || "";

  let userLink = actualUsername ? (
    <Link to={`/${actualUsername}`}>{actualUsername.toLowerCase()}</Link>
  ) : null;

  // EXAMPLE adding a new link segment
  // let newSegmentLink =
  //   newSegmentName || window.location.pathname.endsWith("/newthing") ? (
  //     <Link to={`/${username}/newthing`}>&nbsp;/ newthing</Link>
  //   ) : null;

  return (
    <Menu>
      <Menu.Item as={Link} icon="home" to="/" />

      {user && user.username ? (
        <Menu.Item>
          {userLink}
          {/* newSegmentLink */}
        </Menu.Item>
      ) : null}

      {menu}
      <Menu.Menu position="right">
        <ProfileButton />
      </Menu.Menu>
    </Menu>
  );
};

export { Header };
