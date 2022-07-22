const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter player's name"
    },
    finalScore: {
      type: Number,
      required: "Player's final score"
    },
   
  }
);

const Transaction = mongoose.model("Score", scoreSchema);

module.exports = Score;
