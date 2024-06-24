import express from "express";
import {
  getGame,
  getGames,
  getGamesByGenres,
  postGameSold,
  postGame
} from "../controller/gameController.js";

const router = express.Router();

router.get("/", getGames);

router.get("/:title", getGame);

router.post("/sold", postGameSold);

router.post("/addGame", postGame);

router.get("/genres/:genre", getGamesByGenres);

export default router;
