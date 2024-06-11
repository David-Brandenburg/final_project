import { useState, useEffect } from "react";
import PageSubtitle from "../../PageSubtitle/PageSubtitle.jsx";
import "../middle-section/NeueErschinenGamesListe.scss";
import GamesModal from "../GamesModal.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.js";

const NeueErschinenGamesListe = () => {
  const [games, setGames] = useState([]);
  const [hoveredGame, setHoveredGame] = useState(null);
  const { language } = useLanguage();

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/games/genres/neu-erschienen`
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

  const handleMouseEnter = (game) => {
    setHoveredGame(game);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  return (
    <>
      <PageSubtitle
        title={language === "en" ? "New releases" : "Neu Erscheinung"}
        icon="dropbox"
        Nav={true}
      />
      {games.length > 0 ? (
        <div className="beliebte-spiele-wrapper">
          <div className="row">
            {games.slice(0, 5).map((game, index) => (
              <div className="col-md-4" key={game.title + index}>
                <div
                  className="game-card"
                  onMouseEnter={() => handleMouseEnter(game)}
                  onMouseLeave={handleMouseLeave}>
                  {hoveredGame === game && <GamesModal game={game} />}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>{language === "en" ? "Error" : "Fehler"}</h3>
              <p>
                {language === "en"
                  ? "Something went wrong"
                  : "Etwas ist schief gelaufen"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NeueErschinenGamesListe;
