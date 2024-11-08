import React, { useState } from "react";
import HomePage from "./components/HomePage";
import PlayerStats from "./components/PlayerStats";
import Results from "./components/Results";
import Fixtures from "./components/Fixtures";
import ChampionsLeagueStats from "./components/ChampionsLeagueStats"; // Import the ChampionsLeagueStats component
import "./App.css";
import { Container } from "semantic-ui-react"; // Import the Container component

function App() {
  const [view, setView] = useState("home"); // Default to 'home'

  return (
    <Container fluid style={{ minHeight: "100vh" }}>
      {view === "home" && <HomePage setView={setView} />}
      {view === "playerStats" && <PlayerStats setView={setView} />}
      {view === "results" && <Results setView={setView} />}
      {view === "fixtures" && <Fixtures setView={setView} />}
      {view === "championsLeagueStats" && (
        <ChampionsLeagueStats setView={setView} />
      )}{" "}
      {/* Add the Champions League stats view */}
    </Container>
  );
}

export default App;
