import express from "express";
import {
  getGame,
  getGames,
  getGamesByGenres,
  postGameSold,
} from "../controller/gameController.js";

const router = express.Router();

router.get("/", getGames);

router.get("/:title", getGame);

router.post("/sold", postGameSold);

router.get("/genres/:genre", getGamesByGenres);

export default router;
