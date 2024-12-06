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
    </Container>
  );
}

export default HomePage;
