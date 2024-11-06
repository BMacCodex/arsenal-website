import React, { useEffect, useState } from "react";
import { getFixtures } from "../api/apiFootball";
import {
  Button,
  Header,
  Loader,
  Segment,
  Card,
  Icon,
  List,
} from "semantic-ui-react";

function Results({ setView }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await getFixtures();
      const pastMatches = data
        .filter((fixture) => fixture.fixture.status.short === "FT")
        .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

      setResults(pastMatches);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <Segment padded>
      <Button primary onClick={() => setView("home")} icon labelPosition="left">
        <Icon name="home" />
        Back to Home
      </Button>
      <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
        Recent Results
      </Header>

      {loading ? (
        <Loader active inline="centered" size="large">
          Loading recent results...
        </Loader>
      ) : (
        <Card.Group centered>
          {results.map((match) => (
            <Card key={match.fixture.id}>
              <Card.Content>
                <Card.Header>
                  {match.teams.home.name} vs {match.teams.away.name}
                </Card.Header>
                <Card.Meta>
                  <span className="date">
                    {new Date(match.fixture.date).toLocaleDateString()}
                  </span>
                </Card.Meta>
                <Card.Description>
                  <p>
                    <strong>Score:</strong> {match.goals.home} -{" "}
                    {match.goals.away}
                  </p>
                  <List>
                    <List.Header>Goalscorers</List.Header>
                    {match.events
                      .filter((event) => event.type === "Goal")
                      .map((event, index) => (
                        <List.Item key={index}>
                          <Icon name="soccer" />
                          {event.player.name} ({event.team.name}) -{" "}
                          {event.time.elapsed}'{" "}
                          {event.detail === "Penalty" ? "(Penalty)" : ""}
                        </List.Item>
                      ))}
                  </List>
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Segment>
  );
}

export default Results;
