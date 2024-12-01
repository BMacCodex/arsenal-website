import React from "react";
import { Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container textAlign="center" style={{ marginTop: "2em" }}>
      <Header as="h1" style={{ fontSize: "2.5em" }}>
        Arsenal FC Tracker
      </Header>
      <p style={{ fontSize: "1.2em", color: "black" }}>
        Track Arsenal's player statistics, recent match results, and upcoming
        fixtures!
      </p>

      <Button primary as={Link} to="/player-stats">
        View Player Stats
      </Button>
      <Button secondary as={Link} to="/results">
        Recent Results
      </Button>
      <Button secondary as={Link} to="/fixtures">
        Upcoming Fixtures
      </Button>
      <Button secondary as={Link} to="/champions-league-stats">
        Champions League Stats
      </Button>
      <Button as={Link} to="/team-stats">
        Team Stats
      </Button>
    </Container>
  );
}

export default HomePage;
