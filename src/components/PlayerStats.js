import React, { useEffect, useState } from "react";
import { getPlayerStats } from "../api/apiFootball";
import {
  Header,
  Loader,
  Segment,
  Icon,
  Container,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./PlayerStats.css";

function PlayerStats() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  const fetchPlayerStats = async () => {
    try {
      const playerData = await getPlayerStats();

      // Exclude certain player IDs
      const excludePlayerIds = [
        284540, 1452, 309501, 309505, 190, 283026, 41577, 163068, 396206,
        339175, 313229, 727, 1161, 407033, 153407, 309506, 284557, 380697,
        416697, 337933, 1427, 20355, 1468, 41725, 311520, 284502, 284571,
        278074, 380696,
      ];

      const filteredPlayers = playerData.filter(
        (player) => !excludePlayerIds.includes(player.player.id)
      );

      const rowData = filteredPlayers.map((player) => ({
        playerName: player.player.name,
        appearances: player.statistics[0]?.games?.appearences || 0,
        goals: player.statistics[0]?.goals?.total || 0,
        assists: player.statistics[0]?.goals?.assists || 0,
        yellowCards: player.statistics[0]?.cards?.yellow || 0,
        redCards: player.statistics[0]?.cards?.red || 0,
        averageRating: player.statistics[0]?.games?.rating || "N/A",
        minutesPlayed: player.statistics[0]?.games?.minutes || 0,
      }));

      setPlayers(rowData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching player stats:", error);
      setLoading(false);
    }
  };

  const columnDefs = [
    { headerName: "Player", field: "playerName", sortable: true, filter: true },
    { headerName: "Appearances", field: "appearances", sortable: true },
    { headerName: "Goals", field: "goals", sortable: true },
    { headerName: "Assists", field: "assists", sortable: true },
    { headerName: "Yellow Cards", field: "yellowCards", sortable: true },
    { headerName: "Red Cards", field: "redCards", sortable: true },
    { headerName: "Average Rating", field: "averageRating", sortable: true },
    { headerName: "Minutes Played", field: "minutesPlayed", sortable: true },
  ];

  return (
    <div className="player-stats-container">
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
        <Segment
          padded
          style={{
            flex: 1,
            backgroundColor: "red",
          }}
        >
          <Button as={Link} to="/" primary icon="home" content="Back to Home" />
          <Header as="h2" textAlign="center" style={{ marginTop: "20px" }}>
            Arsenal Player Stats
          </Header>

          {loading ? (
            <Loader active inline="centered" size="large">
              Loading player stats...
            </Loader>
          ) : (
            <div
              className="ui segment ag-theme-alpine"
              style={{
                height: "100%",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <AgGridReact
                rowData={players}
                columnDefs={columnDefs}
                pagination={false}
                domLayout="autoHeight"
              />
            </div>
          )}
        </Segment>
      </Container>
    </div>
  );
}

export default PlayerStats;
