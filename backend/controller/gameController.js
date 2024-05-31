import Game from "../model/Games.js";

async function getGames(req, res) {
	try {
		const games = await Game.find();
		if (!games) {
			return res.status(404).send({ message: 'No games found', ok: false })
		}

		return res.status(200).json(games);
	} catch (error) {
		return res.status(500).send({ message: "Internal Server Error", ok: false, error: error.message })
	}
};

async function getGame(req, res) {
	const gameTitle = req.params.title;
	try {
		const orginalTitle = gameTitle.replace(/_/g, ' ')
		console.log(orginalTitle)
		const foundGame = await Game.findOne({ title: orginalTitle })
		if (!foundGame) {
			return res.status(404).send({ message: "Game not found!", ok: false })
		}

		return res.status(200).json(foundGame);
	} catch (error) {
		return res.status(500).send({ message: "Internal Server Error", ok: false, error: error.message })
	}
};

async function getGamesByGenres(req, res) {
	const genre = req.params.genre;
	try {
		const games = await Game.find();
		if (!games) {
			return res.status(404).send({ message: 'No games found', ok: false })
		}

		const gamesByGenre = games.filter((game) => game.genres.includes(genre.toLowerCase()))

		return res.status(200).json(gamesByGenre)
	} catch (error) {
		return res.status(500).send({ message: "Internal Server Error", ok: false, error: error.message })
	}
};

export { getGame, getGames, getGamesByGenres }