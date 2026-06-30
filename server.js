const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");



const Game = require("./models/Game");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.get("/games", async (req, res) => {

  try {

    const games = await Game.find();

    res.json(games);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.delete("/games/:id", async (req, res) => {

  try {

    const { username } = req.body;

    const game = await Game.findById(req.params.id);

    if (!game) {

      return res.status(404).json({
        error: "Game not found"
      });

    }

    if (game.host !== username) {

      return res.status(403).json({
        error: "Only host can delete"
      });

    }

    await Game.findByIdAndDelete(req.params.id);

    res.json({
      message: "Game deleted"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

app.put("/games/:id", async (req, res) => {

  try {

    const { username, updates } = req.body;

    const game = await Game.findById(req.params.id);

    if (!game) {

      return res.status(404).json({
        error: "Game not found"
      });

    }

    if (game.host !== username) {

      return res.status(403).json({
        error: "Only host can edit"
      });

    }

    Object.assign(game, updates);

    await game.save();

    res.json(game);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


app.post("/games", async (req, res) => {
  try {
    const game = new Game(req.body);

    await game.save();

    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
app.post("/games/:id/join", async (req, res) => {

  try {

    const { username } = req.body;

    console.log("Username:", username);

    const game = await Game.findById(req.params.id);

    console.log("Joined players:", game.joinedPlayers);

    if (!game) {
      return res.status(404).json({
        error: "Game not found"
      });
    }

    if (game.players >= game.maxPlayers) {
      return res.status(400).json({
        error: "Game full"
      });
    }

    if (game.joinedPlayers.includes(username)) {

      return res.status(400).json({
        error: "Already joined"
      });
    }

    game.players += 1;

    game.joinedPlayers.push(username);

    await game.save();

    res.json(game);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});
app.post("/games/:id/leave", async (req, res) => {

  try {

    const { username } = req.body;

    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        error: "Game not found"
      });
    }

    if (!game.joinedPlayers.includes(username)) {
      return res.status(400).json({
        error: "You are not in this run"
      });
    }


    if (game.host === username) {
      return res.status(400).json({
        error: "Host cannot leave their own run"
      });
    }

    game.joinedPlayers = game.joinedPlayers.filter(
      player => player !== username
    );

    game.players -= 1;

    await game.save();

    res.json(game);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});