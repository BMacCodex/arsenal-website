import React, { useEffect, useState } from "react";
import { getPlayerStats } from "../api/apiFootball";
import { Table, Header, Loader, Segment, Icon } from "semantic-ui-react";

function PlayerStats({ setView }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("playerName");
  const [sortDirection, setSortDirection] = useState("ascending");

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  const fetchPlayerStats = async () => {
    try {
      const playerData = await getPlayerStats();
      console.log("Player Data:", playerData);

      const excludePlayerIds = [
        284540, 1452, 309501, 309505, 190, 283026, 41577, 163068, 396206,
        339175, 313229, 727, 1161, 407033, 153407, 309506, 284557, 380697,
        416697, 337933, 1427, 20355, 1468, 41725, 311520, 284502, 284571,
        278074, 380696,
      ];

      const filteredPlayers = playerData.filter(
        (player) => !excludePlayerIds.includes(player.player.id)
      );

      setPlayers(filteredPlayers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching player stats:", error);
      setLoading(false);
    }
  };

  const handleSort = (clickedColumn) => {
    if (sortColumn === clickedColumn) {
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortColumn(clickedColumn);
      setSortDirection("ascending");
    }

    const sortedPlayers = [...players].sort((a, b) => {
      const statA = a.statistics[0];
      const statB = b.statistics[0];
      const valueA = getValue(statA, clickedColumn) || 0;
      const valueB = getValue(statB, clickedColumn) || 0;

      if (valueA < valueB) return sortDirection === "ascending" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "ascending" ? 1 : -1;
      return 0;
    });

    setPlayers(sortedPlayers);
  };

  const getValue = (stat, path) => {
    return path.split(".").reduce((value, key) => value?.[key], stat);
  };

  return (
    <Segment padded>
      <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
        Arsenal Player Stats
      </Header>

      <button onClick={() => setView("home")}>Back to Home</button>

      {loading ? (
        <Loader active inline="centered" size="large">
          Loading player stats...
        </Loader>
      ) : (
        <Table celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={() => handleSort("playerName")}>
                Player{" "}
                {sortColumn === "playerName" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort("games.appearences")}>
                Appearances{" "}
                {sortColumn === "games.appearences" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort("goals.total")}>
                Goals{" "}
                {sortColumn === "goals.total" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort("goals.assists")}>
                Assists{" "}
                {sortColumn === "goals.assists" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort("cards.yellow")}>
                Yellow Cards{" "}
                {sortColumn === "cards.yellow" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort("cards.red")}>
                Red Cards{" "}
                {sortColumn === "cards.red" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort("games.rating")}>
                Average Rating{" "}
                {sortColumn === "games.rating" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort("games.minutes")}>
                Minutes Played{" "}
                {sortColumn === "games.minutes" && (
                  <Icon
                    name={
                      sortDirection === "ascending" ? "arrow up" : "arrow down"
                    }
                  />
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {players.map((player) => (
              <Table.Row key={player.player.id}>
                <Table.Cell>
                  <Icon name="user circle" />
                  {player.player.name}
                </Table.Cell>
                <Table.Cell>
                  {player.statistics[0].games.appearences || 0}
                </Table.Cell>
                <Table.Cell>{player.statistics[0].goals.total || 0}</Table.Cell>
                <Table.Cell>
                  {player.statistics[0].goals.assists || 0}
                </Table.Cell>
                <Table.Cell>
                  {player.statistics[0].cards.yellow || 0}
                </Table.Cell>
                <Table.Cell>{player.statistics[0].cards.red || 0}</Table.Cell>
                <Table.Cell>
                  {player.statistics[0].games.rating || "N/A"}
                </Table.Cell>
                <Table.Cell>
                  {player.statistics[0].games.minutes || 0}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Segment>
  );
}

export default PlayerStats;
