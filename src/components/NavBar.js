import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Menu inverted fixed="top" size="large">
      <Menu.Item header>ArsenalStats.com</Menu.Item>

      <Menu.Item as={Link} to="/" name="Home" />
      <Menu.Item as={Link} to="/player-stats" name="Premier League Stats" />
      <Menu.Item
        as={Link}
        to="/champions-league-stats"
        name="Champions League Stats"
      />
      <Menu.Item as={Link} to="/team-stats" name="Team Stats" />
      <Menu.Item as={Link} to="/results" name="Results" />
      <Menu.Item as={Link} to="/fixtures" name="Fixtures" />
    </Menu>
  );
}

export default NavBar;
