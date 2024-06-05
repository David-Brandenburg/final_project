import { useState, useEffect } from "react";
import PageSubtitle from "../PageSubtitle/PageSubtitle";
import "./BeliebteGamesListe.scss";

const BeliebteGamesListe = () => {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/games/genres/beliebte-titel`
      );
      const data = await response.json();
      setGames(data);
      if (response.ok) {
        console.log("Games fetched successfully");
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  console.log(games);

  return (
    <>
      <PageSubtitle title="Beliebte Spiele" icon="heart-fill" Nav={true} />
      {games.length > 0 ? (
        <div className="container">
          <div className="row">
            {games.map((game, index) => {
              return (
                <div className="col-md-4" key={game.title + index}>
                  <div className="game-card">
                    <div className="game-card-thumbnail-wrapper">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="game-card-thumbnail"
                      />
                    </div>
                    <div className="game-card-content">
                      <h3 className="game-card-title">{game.title}</h3>
                      <p className="game-card-price">{game.price} €</p>
                      {/* <div className="game-card-platforms">
                        {game.platforms.map((platform, index) => {
                          return (
                            <i
                              key={platform + index}
                              className={`bi bi-${platform}`}></i>
                          );
                        })}
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Error</h3>
              <p>Something went wrong</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BeliebteGamesListe;
