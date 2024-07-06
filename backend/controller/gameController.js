import Game from "../model/Games.js";

async function getGames(req, res) {
  try {
    const games = await Game.find();
    if (!games) {
      return res.status(404).send({ message: "No games found", ok: false });
    }

    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

async function postGame(req, res) {
  const game = req.body;
  try {
    const newGame = new Game(game);
    await newGame.save();
    return res.status(201).send({ message: "Game created", ok: true });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

async function postGameSold(req, res) {
  const { title } = req.body; // Assuming title is passed in the request body

  try {
    const updatedGame = await Game.findOneAndUpdate(
      { title },
      {
        $inc: { sold: 1 },
        $push: { salesHistory: { date: new Date() } },
      },
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).send({
        message: "Game not found",
        ok: false,
      });
    }

    return res.status(200).send({
      message: "Game updated successfully",
      ok: true,
      game: updatedGame,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

async function getGame(req, res) {
  const gameTitle = req.params.title;
  try {
    const orginalTitle = gameTitle.replace(/_/g, " ");

    const foundGame = await Game.findOne({ title: orginalTitle });
    if (!foundGame) {
      const foundGameById = await Game.findById(gameTitle);
      if (!foundGameById) {
        return res.status(404).send({ message: "Game not found!", ok: false });
      } else if (foundGameById) {
        return res.status(200).json(foundGameById);
      } else {
        return res.status(404).send({ message: "Game not found!", ok: false });
      }
    }

    return res.status(200).json(foundGame);
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

async function getGamesByGenres(req, res) {
  const genre = req.params.genre;
  try {
    const games = await Game.find();
    if (!games) {
      return res.status(404).send({ message: "No games found", ok: false });
    }

    const gamesByGenre = games.filter((game) => game.genres.includes(genre));

    // console.log(gamesByGenre)

    return res.status(200).json(gamesByGenre);
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      ok: false,
      error: error.message,
    });
  }
}

export { getGame, getGames, getGamesByGenres, postGameSold, postGame };
