import React, { useEffect, useState } from "react";
import { getChampionsLeagueStats } from "../api/apiFootball";
import {
  Header,
  Loader,
  Segment,
  Icon,
  Button,
  Container,
} from "semantic-ui-react";
import { Link } from "react-router-dom"; // Import Link
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function ChampionsLeagueStats() {
  const [playersCL, setPlayersCL] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  const fetchPlayerStats = async () => {
    try {
      const playerData = await getChampionsLeagueStats();
      console.log("Player Data:", playerData);
      const excludePlayerIds = [
        1427, 169295, 41725, 407033, 153407, 278074, 309506, 284557, 380697,
        416697, 342243, 313229, 1468, 727, 1161, 20355,
      ];

      const filteredPlayers = playerData.filter(
        (player) => !excludePlayerIds.includes(player.player.id)
      );

      console.log("Filtered Players:", filteredPlayers);
      setPlayersCL(filteredPlayers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Champions League player stats:", error);
      setLoading(false);
    }
  };

  const columnDefs = [
    { headerName: "Player", field: "playerName", sortable: true, filter: true },
    {
      headerName: "Appearances",
      field: "appearances",
      sortable: true,
      filter: true,
    },
    { headerName: "Goals", field: "goals", sortable: true, filter: true },
    { headerName: "Assists", field: "assists", sortable: true, filter: true },
    { headerName: "Yellow Cards", field: "yellowCards", sortable: true },
    { headerName: "Red Cards", field: "redCards", sortable: true },
    { headerName: "Minutes Played", field: "minutesPlayed", sortable: true },
  ];

  const rowData = playersCL.map((player) => ({
    playerName: player.player.name,
    appearances: player.statistics[0]?.games?.appearences || 0,
    goals: player.statistics[0]?.goals?.total || 0,
    assists: player.statistics[0]?.goals?.assists || 0,
    yellowCards: player.statistics[0]?.cards?.yellow || 0,
    redCards: player.statistics[0]?.cards?.red || 0,
    minutesPlayed: player.statistics[0]?.games?.minutes || 0,
  }));

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
      }}
    >
      <Segment padded style={{ flex: 1, backgroundColor: "red" }}>
        <Button as={Link} to="/" icon labelPosition="left">
          <Icon name="arrow left" />
          Back to Home
        </Button>

        <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
          Champions League Player Stats
        </Header>

        {loading ? (
          <Loader active inline="centered" size="large">
            Loading player stats...
          </Loader>
        ) : (
          <div
            className="ag-theme-alpine"
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              domLayout="autoHeight"
            />
          </div>
        )}
      </Segment>
    </Container>
  );
}

export default ChampionsLeagueStats;
