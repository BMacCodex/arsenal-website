import React from "react";
import { Container, Header, Button } from "semantic-ui-react";

function HomePage({ setView }) {
  return (
    <Container textAlign="center" style={{ marginTop: "2em" }}>
      <Header as="h1" style={{ fontSize: "2.5em" }}>
        Arsenal FC Tracker
      </Header>
      <p style={{ fontSize: "1.2em" }}>
        Track Arsenal's player statistics, recent match results, and upcoming
        fixtures!
      </p>
      <Button primary onClick={() => setView("playerStats")}>
        View Player Stats
      </Button>
      <Button secondary onClick={() => setView("results")}>
        Recent Results
      </Button>
      <Button secondary onClick={() => setView("fixtures")}>
        Upcoming Fixtures
      </Button>
    </Container>
  );
}

export default HomePage;
