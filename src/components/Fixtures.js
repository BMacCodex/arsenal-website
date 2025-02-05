import React, { useEffect, useState } from "react";
import { getUpcomingFixtures } from "../api/apiFootball";
import {
  Button,
  Header,
  Loader,
  Segment,
  Card,
  Icon,
  Container,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Initialize navigate hook

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
    <Container
      fluid
      style={{
        minHeight: "100vh",
        padding: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Segment padded style={{ flex: 1, backgroundColor: "red" }}>
        {/* Back Button using Link */}
        <Button as={Link} to="/" icon labelPosition="left">
          <Icon name="arrow left" />
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
          <Card.Group centered style={{ width: "100%" }}>
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
    </Container>
  );
}

export default Fixtures;
