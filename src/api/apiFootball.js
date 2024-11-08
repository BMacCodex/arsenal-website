import axios from "axios";

const apiFootball = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-rapidapi-host": "v3.football.api-sports.io",
    "x-rapidapi-key": "668a264ea5bed89b4281eede93950299", // Replace with your actual API key
  },
});

// Function to fetch fixtures for Arsenal
export const getFixtures = async () => {
  const teamId = 42; // Arsenal's team ID
  const response = await apiFootball.get("/fixtures", {
    params: {
      team: teamId,
      season: 2024,
      last: 5, // Adjust to get the last 5 results
    },
  });
  const fixtures = response.data.response;

  // Fetch events for each fixture
  const fixturesWithEvents = await Promise.all(
    fixtures.map(async (fixture) => {
      const eventsResponse = await apiFootball.get(`/fixtures/events`, {
        params: {
          fixture: fixture.fixture.id,
        },
      });
      return {
        ...fixture,
        events: eventsResponse.data.response, // Add events data to each fixture
      };
    })
  );

  return fixturesWithEvents;
};

// Function to fetch upcoming fixtures for Arsenal
export const getUpcomingFixtures = async () => {
  const teamId = 42; // Arsenal's team ID
  const response = await apiFootball.get("/fixtures", {
    params: {
      team: teamId,
      season: 2024,
      league: 39, // Premier League ID
      next: 10, // Get the next 10 upcoming fixtures
    },
  });

  return response.data.response;
};

// Function to fetch player stats for the Premier League (Existing)
export const getPlayerStats = async () => {
  const teamId = 42; // Arsenal's team ID
  const season = 2024;
  const league = 39; // Premier League
  let players = [];
  let page = 1;
  let hasMorePlayers = true;

  while (hasMorePlayers) {
    const response = await apiFootball.get("/players", {
      params: {
        team: teamId,
        season,
        league,
        page, // Incrementing page for each request
      },
    });

    const data = response.data.response;
    players = players.concat(data);

    // Stop if there are no more players to fetch
    hasMorePlayers = data.length > 0;
    page += 1; // Move to the next page for the next request
  }

  return players; // Returns an array with all player stats for the season
};

// New function to fetch Champions League player stats
export const getChampionsLeagueStats = async () => {
  const teamId = 42; // Arsenal's team ID
  const season = 2024;
  const league = 2; // Champions League ID (2 corresponds to UEFA Champions League)
  let players = [];
  let page = 1;
  let hasMorePlayers = true;

  while (hasMorePlayers) {
    const response = await apiFootball.get("/players", {
      params: {
        team: teamId,
        season,
        league, // Use Champions League ID (2)
        page, // Incrementing page for each request
      },
    });

    const data = response.data.response;
    players = players.concat(data);

    // Stop if there are no more players to fetch
    hasMorePlayers = data.length > 0;
    page += 1; // Move to the next page for the next request
  }

  return players; // Returns an array with all Champions League player stats for the season
};
