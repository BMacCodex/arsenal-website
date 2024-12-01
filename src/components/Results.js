import React, { useEffect, useState } from "react";
import { getFixtures, getMatchDetails } from "../api/apiFootball";
import {
  Button,
  Header,
  Loader,
  Segment,
  Card,
  Icon,
  List,
  Container,
  Modal,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const navigate = useNavigate(); // Initialize navigate hook

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

  const handleMatchClick = async (fixtureId) => {
    setLoadingDetails(true);
    try {
      const matchDetails = await getMatchDetails(fixtureId);
      setSelectedMatch(matchDetails);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching match details:", error);
    } finally {
      setLoadingDetails(false);
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
      <Segment padded style={{ flex: 1 }}>
        {/* Back Button using Link */}
        <Button as={Link} to="/" icon labelPosition="left">
          <Icon name="arrow left" />
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
          <Card.Group centered style={{ width: "100%" }}>
            {results.map((match) => (
              <Card
                key={match.fixture.id}
                onClick={() => handleMatchClick(match.fixture.id)}
              >
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
                            {event.time.elapsed}'
                            {event.detail === "Penalty" ? " (Penalty)" : ""}
                          </List.Item>
                        ))}
                    </List>
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} closeIcon>
          <Modal.Header>Match Details</Modal.Header>
          <Modal.Content>
            {loadingDetails ? (
              <Loader active inline="centered" size="large">
                Loading match details...
              </Loader>
            ) : selectedMatch ? (
              <>
                <Header as="h3">Lineups</Header>
                <List>
                  {selectedMatch.lineups?.length > 0 ? (
                    selectedMatch.lineups.map((lineup, index) => (
                      <List.Item key={index}>
                        <strong>{lineup.team.name}:</strong>{" "}
                        {lineup.startXI
                          ? lineup.startXI
                              .map((player) => player.player.name)
                              .join(", ")
                          : "No lineup data available"}
                      </List.Item>
                    ))
                  ) : (
                    <p>No lineup data available.</p>
                  )}
                </List>

                <Header as="h3">Events</Header>
                <List>
                  {selectedMatch.events?.length > 0 ? (
                    selectedMatch.events.map((event, index) => (
                      <List.Item key={index}>
                        <Icon
                          name={
                            event.type === "Goal" ? "soccer" : "yellow card"
                          }
                        />
                        {event.time.elapsed}' - {event.player.name} (
                        {event.team.name}){" "}
                        {event.type === "Goal" && event.detail === "Penalty"
                          ? "(Penalty)"
                          : ""}
                        {event.type === "Card" && event.detail === "Yellow Card"
                          ? "(Yellow Card)"
                          : ""}
                      </List.Item>
                    ))
                  ) : (
                    <p>No event data available.</p>
                  )}
                </List>
              </>
            ) : (
              <p>No additional match data available.</p>
            )}
          </Modal.Content>
        </Modal>
      </Segment>
    </Container>
  );
}

export default Results;
