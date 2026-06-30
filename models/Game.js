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

  maxPlayers: {
    type: Number,
    required: true
  },

  location: {

    city: {
      type: String,
      default: "Boise"
    },

    state: {
      type: String,
      default: "ID"
    }

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