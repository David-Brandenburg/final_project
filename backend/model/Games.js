import mongoose from "mongoose";

// MongoDB Schema
const GamesSchema = new mongoose.Schema({
  thumbnail: { type: String, default: '' },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  title: { type: String, default: '' },
	platforms: { type: Array, default: [] },
	description: { type: String, default: '' },
	publisher: { type: String, default: '' },
	rating: { type: String, default: '' },
	genres: { type: Array, default: [] },
	dlc: { type: Boolean, default: false },
});

const Game = mongoose.model("games", GamesSchema);

export default Game;
