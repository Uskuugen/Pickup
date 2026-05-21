const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

//fake database sample
const games = [
  {
    id: 1,
    court: "Julia Davis Park",
    type: "5v5",
    players: 8
  },
  {
    id: 2,
    court: "Boise State Rec Center",
    type: "3v3",
    players: 4
  }
];

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get all games
app.get("/games", (req, res) => {
  res.json(games);
});

// Start Server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});