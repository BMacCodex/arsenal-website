import React, { useState } from "react";
import HomePage from "./components/HomePage";
import PlayerStats from "./components/PlayerStats";
import Results from "./components/Results";
import Fixtures from "./components/Fixtures";
import ChampionsLeagueStats from "./components/ChampionsLeagueStats";
import TeamStats from "./components/TeamStats";
import "./App.css";
import { Container } from "semantic-ui-react";

function App() {
  const [view, setView] = useState("home");

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      {view === "home" && <HomePage setView={setView} />}
      {view === "playerStats" && <PlayerStats setView={setView} />}
      {view === "results" && <Results setView={setView} />}
      {view === "fixtures" && <Fixtures setView={setView} />}
      {view === "championsLeagueStats" && (
        <ChampionsLeagueStats setView={setView} />
      )}
      {view === "teamStats" && <TeamStats setView={setView} />} {/* Added */}
    </Container>
  );
}

export default App;
