import React, { useEffect, useState } from "react";
import { getArsenalTeamStats } from "../api/apiFootball";
import {
  Table,
  Header,
  Loader,
  Button,
  Container,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

function TeamStats() {
  const [teamStats, setTeamStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getArsenalTeamStats();
        console.log("Fetched Arsenal Team Stats:", data);
        setTeamStats(data);
      } catch (error) {
        console.error("Error fetching team stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
      <Segment
        padded
        style={{
          flex: 1,
        }}
      >
        <Header as="h2" textAlign="center">
          Arsenal Premier League Statistics
        </Header>

        {/* Back Button using Link */}
        <Button as={Link} to="/" primary icon="home" content="Back to Home" />

        {loading ? (
          <Loader active inline="centered" size="large" />
        ) : teamStats ? (
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Games Played</Table.Cell>
                <Table.Cell>
                  {teamStats.fixtures?.played?.total || 0}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Wins</Table.Cell>
                <Table.Cell>{teamStats.fixtures?.wins?.total || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Draws</Table.Cell>
                <Table.Cell>{teamStats.fixtures?.draws?.total || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Losses</Table.Cell>
                <Table.Cell>{teamStats.fixtures?.loses?.total || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Goals Scored</Table.Cell>
                <Table.Cell>
                  {teamStats.goals?.for?.total?.total || 0}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Goals Conceded</Table.Cell>
                <Table.Cell>
                  {teamStats.goals?.against?.total?.total || 0}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Clean Sheets</Table.Cell>
                <Table.Cell>{teamStats.clean_sheet?.total || 0}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ) : (
          <p>No data available</p>
        )}
      </Segment>
    </Container>
  );
}

export default TeamStats;
