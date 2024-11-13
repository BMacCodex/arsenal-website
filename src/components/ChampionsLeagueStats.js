import React, { useEffect, useState } from "react";
import { getChampionsLeagueStats } from "../api/apiFootball"; // Import the new function
import {
  Table,
  Header,
  Loader,
  Segment,
  Icon,
  Button,
  Container,
} from "semantic-ui-react";

function ChampionsLeagueStats({ setView }) {
  const [playersCL, setPlayersCL] = useState([]); // State to hold Champions League player data
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("playerName");
  const [sortDirection, setSortDirection] = useState("ascending");

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  const fetchPlayerStats = async () => {
    try {
      const playerData = await getChampionsLeagueStats(); // Use the new function
      console.log("Champions League Player Data:", playerData);
      console.log("Fetched Champions League Player Data:", playerData); // Log the data to check its structure

      const excludePlayerIds = [
        284540, 1452, 309501, 309505, 190, 283026, 41577, 163068,
      ];

      const filteredPlayers = playerData.filter(
        (player) => !excludePlayerIds.includes(player.player.id)
      );

      console.log("Filtered Players:", filteredPlayers); // Check if filtering is working as expected
      setPlayersCL(filteredPlayers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Champions League player stats:", error);
      setLoading(false);
    }
  };

  // Helper function to safely access nested values, including arrays
  const getValue = (stat, path) => {
    const pathParts = path.split("."); // Split the path into parts

    return pathParts.reduce((value, part) => {
      // Handle array indices in the path (e.g., "statistics[0]")
      const match = part.match(/^(.+)\[(\d+)\]$/);
      if (match) {
        const [_, arrayKey, index] = match;
        return value?.[arrayKey]?.[parseInt(index, 10)] || undefined; // Access the array element
      }
      // For normal object properties, just access the key
      return value?.[part] || undefined;
    }, stat);
  };

  // Sorting function
  const handleSort = (clickedColumn) => {
    const newDirection =
      sortColumn === clickedColumn && sortDirection === "ascending"
        ? "descending"
        : "ascending";

    setSortColumn(clickedColumn); // Update the current column
    setSortDirection(newDirection); // Update the direction

    console.log("Sorting by column:", clickedColumn);
    console.log("New sort direction:", newDirection);

    const sortedPlayers = [...playersCL].sort((a, b) => {
      const statA = a.statistics[0];
      const statB = b.statistics[0];

      // Access the value for the clicked column and log it
      const valueA = getValue(statA, clickedColumn);
      const valueB = getValue(statB, clickedColumn);

      console.log("Comparing:", valueA, "vs", valueB);

      if (valueA < valueB) return newDirection === "ascending" ? -1 : 1;
      if (valueA > valueB) return newDirection === "ascending" ? 1 : -1;
      return 0; // Equal values
    });

    console.log("Sorted Players:", sortedPlayers); // Log the sorted players

    setPlayersCL(sortedPlayers); // Update the state with sorted data
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        padding: "0",
        display: "flex",
        flexDirection: "column", // Flexbox to ensure full height
      }}
    >
      <Segment
        padded
        style={{
          flex: 1, // This allows the Segment to stretch and take the remaining space
        }}
      >
        <Button
          primary
          onClick={() => setView("home")}
          icon
          labelPosition="left"
        >
          <Icon name="home" />
          Back to Home
        </Button>
        <Header as="h2">Champions League Player Stats</Header>

        {loading ? (
          <Loader active inline="centered" />
        ) : (
          <Table celled sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell onClick={() => handleSort("playerName")}>
                  Player{" "}
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
                  Appearances{" "}
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
                  Goals{" "}
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
                  Assists{" "}
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
                  Yellow Cards{" "}
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
                  Red Cards{" "}
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
                  Minutes Played{" "}
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
