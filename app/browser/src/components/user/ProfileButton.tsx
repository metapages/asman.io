import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu, Dropdown, Image } from "semantic-ui-react";
import { logout } from "../../auth";
import { useUser } from "../../User";

enum DropdownMenu {
  Logout = "Log out",
}

const onClick = (_: any, data: any) => {
  if (data.text === DropdownMenu.Logout) {
    logout();
  }
};

export const ProfileButton: React.FC = () => {
  const user = useUser();

  if (!user) {
    return (
      <Dropdown
        trigger={
          <span>
            <Icon name="cancel" />
          </span>
        }
        pointing
        className="link item"
      >
        <Dropdown.Menu>
          <Menu.Item as={Link} name="Log in" to={"/login"} />
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  const picture = (user && user.picture) || "";
  const username = (user && user.username) || "";

  return (
    <Dropdown
      trigger={
        picture !== "" ? (
          <Image circular size="mini" src={picture} />
        ) : (
          <span>{username}</span>
        )
      }
      pointing
      className="link item"
    >
      <Dropdown.Menu>
        <Menu.Item as={Link} name="Profile" to={"/profile"} />
        <Dropdown.Divider />
        <Dropdown.Item text={DropdownMenu.Logout} onClick={onClick} />
      </Dropdown.Menu>
    </Dropdown>
  );
};
