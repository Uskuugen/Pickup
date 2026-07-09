const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  court: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  players: {
    type: Number,
    default: 0
  },
  host: {
    type: String,
    required: true
  },

  joinedPlayers: {
    type: [String],
    default: []
  },

}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model("Game", gameSchema, "pickups");