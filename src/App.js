import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import PlayerStats from "./components/PlayerStats";
import Results from "./components/Results";
import Fixtures from "./components/Fixtures";
import ChampionsLeagueStats from "./components/ChampionsLeagueStats";
import TeamStats from "./components/TeamStats";
import "./App.css";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <Router>
      <NavBar />
      <Container fluid style={{ minHeight: "100vh", paddingTop: "2em" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player-stats" element={<PlayerStats />} />
          <Route path="/results" element={<Results />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route
            path="/champions-league-stats"
            element={<ChampionsLeagueStats />}
          />
          <Route path="/team-stats" element={<TeamStats />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
