import React, { useEffect, useState } from "react";
import { getChampionsLeagueStats } from "../api/apiFootball";
import {
  Table,
  Header,
  Loader,
  Segment,
  Icon,
  Button,
  Container,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

function ChampionsLeagueStats() {
  const [playersCL, setPlayersCL] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("playerName");
  const [sortDirection, setSortDirection] = useState("ascending");

  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  const fetchPlayerStats = async () => {
    try {
      const playerData = await getChampionsLeagueStats();
      const excludePlayerIds = [
        284540, 1452, 309501, 309505, 190, 283026, 41577, 163068,
      ];

      const filteredPlayers = playerData.filter(
        (player) => !excludePlayerIds.includes(player.player.id)
      );

      setPlayersCL(filteredPlayers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Champions League player stats:", error);
      setLoading(false);
    }
  };

  const getValue = (stat, path) => {
    const pathParts = path.split(".");
    return pathParts.reduce((value, part) => {
      const match = part.match(/^(.+)\[(\d+)\]$/);
      if (match) {
        const [_, arrayKey, index] = match;
        return value?.[arrayKey]?.[parseInt(index, 10)] || undefined;
      }
      return value?.[part] || undefined;
    }, stat);
  };

  const handleSort = (clickedColumn) => {
    const newDirection =
      sortColumn === clickedColumn && sortDirection === "ascending"
        ? "descending"
        : "ascending";

    setSortColumn(clickedColumn);
    setSortDirection(newDirection);

    const sortedPlayers = [...playersCL].sort((a, b) => {
      const statA = a.statistics[0];
      const statB = b.statistics[0];
      const valueA = getValue(statA, clickedColumn);
      const valueB = getValue(statB, clickedColumn);

      if (valueA < valueB) return newDirection === "ascending" ? -1 : 1;
      if (valueA > valueB) return newDirection === "ascending" ? 1 : -1;
      return 0;
    });

    setPlayersCL(sortedPlayers);
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
          Champions League Player Stats
        </Header>

        {loading ? (
          <Loader active inline="centered" size="large" />
        ) : (
          <Table celled sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell onClick={() => handleSort("playerName")}>
                  Player
                  {sortColumn === "playerName" && (
                    <Icon
                      name={
                        sortDirection === "ascending"
                          ? "arrow up"
                          : "arrow down"
                      }
                    />
                  )}
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => handleSort("statistics[0].games.appearences")}
                >
                  Appearances
                  {sortColumn === "statistics[0].games.appearences" && (
                    <Icon
                      name={
                        sortDirection === "ascending"
                          ? "arrow up"
                          : "arrow down"
                      }
                    />
                  )}
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => handleSort("statistics[0].goals.total")}
                >
                  Goals
                  {sortColumn === "statistics[0].goals.total" && (
                    <Icon
                      name={
                        sortDirection === "ascending"
                          ? "arrow up"
                          : "arrow down"
                      }
                    />
                  )}
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => handleSort("statistics[0].assists.total")}
                >
                  Assists
                  {sortColumn === "statistics[0].assists.total" && (
                    <Icon
                      name={
                        sortDirection === "ascending"
                          ? "arrow up"
                          : "arrow down"
                      }
                    />
                  )}
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => handleSort("statistics[0].cards.yellow")}
                >
                  Yellow Cards
                  {sortColumn === "statistics[0].cards.yellow" && (
                    <Icon
                      name={
                        sortDirection === "ascending"
                          ? "arrow up"
                          : "arrow down"
                      }
                    />
                  )}
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => handleSort("statistics[0].cards.red")}
                >
                  Red Cards
                  {sortColumn === "statistics[0].cards.red" && (
                    <Icon
                      name={
                        sortDirection === "ascending"
                          ? "arrow up"
                          : "arrow down"
                      }
                    />
                  )}
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => handleSort("statistics[0].games.minutes")}
                >
                  Minutes Played
                  {sortColumn === "statistics[0].games.minutes" && (
                    <Icon
                      name={
                        sortDirection === "ascending"
                          ? "arrow up"
                          : "arrow down"
                      }
                    />
                  )}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {playersCL.map((player) => (
                <Table.Row key={player.player.id}>
                  <Table.Cell>{player.player.name}</Table.Cell>
                  <Table.Cell>
                    {player.statistics[0]?.games?.appearences || 0}
                  </Table.Cell>
                  <Table.Cell>
                    {player.statistics[0]?.goals?.total || 0}
                  </Table.Cell>
                  <Table.Cell>
                    {player.statistics[0]?.assists?.total || 0}
                  </Table.Cell>
                  <Table.Cell>
                    {player.statistics[0]?.cards?.yellow || 0}
                  </Table.Cell>
                  <Table.Cell>
                    {player.statistics[0]?.cards?.red || 0}
                  </Table.Cell>
                  <Table.Cell>
                    {player.statistics[0]?.games?.minutes || 0}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </Segment>
    </Container>
  );
}

export default ChampionsLeagueStats;
