import express from 'express';
import { getGame, getGames, getGamesByGenres } from '../controller/gameController.js';

const router = express.Router();

router.get("/", getGames);

router.get("/:title", getGame);

router.get("/genres/:genre", getGamesByGenres);

export default router;