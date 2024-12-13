import React, { useEffect, useState } from "react";
import { getFixtures } from "../api/apiFootball";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Loader, Container, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Results() {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "Home Team", field: "homeTeam" },
    { headerName: "Away Team", field: "awayTeam" },
    { headerName: "Score", field: "score" },
    { headerName: "Goalscorers & Assists", field: "goalDetails", flex: 2 },
  ]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await getFixtures();
      const seasonStart = new Date("2024-08-01");
      const seasonEnd = new Date("2025-05-31");

      const pastMatches = data
        .filter(
          (fixture) =>
            fixture.fixture.status.short === "FT" &&
            new Date(fixture.fixture.date) >= seasonStart &&
            new Date(fixture.fixture.date) <= seasonEnd &&
            (fixture.teams.home.name === "Arsenal" ||
              fixture.teams.away.name === "Arsenal")
        )
        .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
        .map((match) => ({
          date: new Date(match.fixture.date).toLocaleDateString(),
          homeTeam: match.teams.home.name,
          awayTeam: match.teams.away.name,
          score: `${match.goals.home} - ${match.goals.away}`,
          goalDetails: match.events
            .filter((event) => event.type === "Goal")
            .map((event) => {
              let assist = event.assist?.name
                ? ` (Assist: ${event.assist.name})`
                : "";
              return `${event.player.name} - ${event.time.elapsed}'${assist}`;
            })
            .join(", "),
        }));

      setRowData(pastMatches);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "red" }}>
      <Segment padded style={{ backgroundColor: "red" }}>
        {loading ? (
          <Loader active inline="centered" size="large">
            Loading recent results...
          </Loader>
        ) : (
          <div
            className="ag-theme-alpine"
            style={{
              height: "710px",
              width: "100%",
              marginTop: "10px",
              backgroundColor: "red",
            }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              pagination={true}
              paginationPageSize={2}
              domLayout="normal"
            />
          </div>
        )}
      </Segment>
    </Container>
  );
}

export default Results;
