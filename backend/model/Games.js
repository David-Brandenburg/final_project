import mongoose from "mongoose";

// MongoDB Schema
const GamesSchema = new mongoose.Schema({
  thumbnail: { type: String, default: "" },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  title: { type: String, default: "" },
  platforms: { type: Array, default: [] },
  description: { type: String, default: "" },
  publisher: { type: String, default: "" },
  rating: { type: String, default: "" },
  genres: { type: Array, default: [] },
  dlc: { type: Boolean, default: false },
  pageThumbnail: { type: String, default: "" },
  logo: { type: String, default: "" },
  bgPic: { type: String, default: "" },
  pics: { type: Array, default: [] },
  tags: { type: Array, default: [] },
  trailer: { type: Array, default: [] },
  functions: { type: Array, default: [] },
  salesHistory: [{ date: { type: Date, default: Date.now } }],
  sold: { type: Number, default: 0 },
  releaseDate: { type: String, default: "" },
  earlyAccess: { type: Boolean, default: false },
  languages: { type: Array, default: [] },
  trailerThumbnails: { type: Array, default: [] },
});

const Game = mongoose.model("games", GamesSchema);

export default Game;
