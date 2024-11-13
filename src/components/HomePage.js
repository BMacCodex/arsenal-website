import React from "react";
import { Container, Header, Button } from "semantic-ui-react";

function HomePage({ setView }) {
  return (
    <Container textAlign="center" style={{ marginTop: "2em" }}>
      <Header as="h1" style={{ fontSize: "2.5em" }}>
        Arsenal FC Tracker
      </Header>
      <p style={{ fontSize: "1.2em", color: "black" }}>
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
      <Button secondary onClick={() => setView("championsLeagueStats")}>
        Champions League Stats
      </Button>{" "}
      {/* Added button to navigate to Champions League Stats */}
      <Button onClick={() => setView("teamStats")}>Team Stats</Button>{" "}
      {/* Add Team Stats button */}
    </Container>
  );
}

export default HomePage;
