import React, { useEffect, useState } from "react";
import { getChampionsLeagueStats } from "../api/apiFootball"; // Import the new function
import { Table, Header, Loader, Segment, Icon } from "semantic-ui-react";

function ChampionsLeagueStats() {
  const [playersCL, setPlayersCL] = useState([]); // State to hold Champions League player data
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("playerName");
  const [sortDirection, setSortDirection] = useState("ascending");

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  // Fetch player stats for Champions League
  const fetchPlayerStats = async () => {
    try {
      const playerData = await getChampionsLeagueStats(); // Use the new function
      console.log("Champions League Player Data:", playerData);

      const excludePlayerIds = [
        // Exclude specific players if necessary
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

  const handleSort = (clickedColumn) => {
    if (sortColumn === clickedColumn) {
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortColumn(clickedColumn);
      setSortDirection("ascending");
    }

    const sortedPlayers = [...playersCL].sort((a, b) => {
      const statA = a.statistics[0];
      const statB = b.statistics[0];
      const valueA = getValue(statA, clickedColumn) || 0;
      const valueB = getValue(statB, clickedColumn) || 0;

      if (valueA < valueB) return sortDirection === "ascending" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "ascending" ? 1 : -1;
      return 0;
    });

    setPlayersCL(sortedPlayers);
  };

  const getValue = (stat, path) => {
    return path.split(".").reduce((value, key) => value?.[key], stat);
  };

  return (
    <Segment>
      <Header as="h2">Champions League Player Stats</Header>

      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <Table celled sortable>
          <Table.Header>{/* Table headers and body as before */}</Table.Header>

          <Table.Body>
            {playersCL.map((player) => (
              <Table.Row key={player.player.id}>
                {/* Render table rows as before */}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Segment>
  );
}

export default ChampionsLeagueStats;
