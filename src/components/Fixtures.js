import React, { useEffect, useState } from "react";
import { getUpcomingFixtures } from "../api/apiFootball";
import { Button, Header, Loader, Segment, Card, Icon } from "semantic-ui-react";

function Fixtures({ setView }) {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFixtures();
  }, []);

  const fetchFixtures = async () => {
    try {
      const data = await getUpcomingFixtures();
      setFixtures(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching fixtures:", error);
    }
  };

  return (
    <Segment padded>
      <Button primary onClick={() => setView("home")} icon labelPosition="left">
        <Icon name="home" />
        Back to Home
      </Button>
      <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
        Upcoming Fixtures
      </Header>

      {loading ? (
        <Loader active inline="centered" size="large">
          Loading upcoming fixtures...
        </Loader>
      ) : (
        <Card.Group centered>
          {fixtures.map((fixture) => (
            <Card key={fixture.fixture.id}>
              <Card.Content>
                <Card.Header>
                  {fixture.teams.home.name} vs {fixture.teams.away.name}
                </Card.Header>
                <Card.Meta>
                  <span className="date">
                    {new Date(fixture.fixture.date).toLocaleDateString()} -{" "}
                    {new Date(fixture.fixture.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </Card.Meta>
                <Card.Description>
                  <p>
                    <strong>Venue:</strong> {fixture.fixture.venue.name}
                  </p>
                  <p>
                    <strong>City:</strong> {fixture.fixture.venue.city}
                  </p>
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Segment>
  );
}

export default Fixtures;
