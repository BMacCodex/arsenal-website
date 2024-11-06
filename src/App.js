import React, { useState } from "react";
import HomePage from "./components/HomePage";
import PlayerStats from "./components/PlayerStats";
import Results from "./components/Results";
import Fixtures from "./components/Fixtures";

function App() {
  const [view, setView] = useState("home"); // Default to 'home'

  return (
    <div>
      {view === "home" && <HomePage setView={setView} />}
      {view === "playerStats" && <PlayerStats setView={setView} />}
      {view === "results" && <Results setView={setView} />}
      {view === "fixtures" && <Fixtures setView={setView} />}
    </div>
  );
}

export default App;
