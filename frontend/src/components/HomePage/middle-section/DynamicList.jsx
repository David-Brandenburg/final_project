import { useState, useEffect } from "react";
import { useLanguage } from "../../../contexts/LanguageContext.js";
import PageSubtitle from "../../PageSubtitle/PageSubtitle.jsx";
import GamesModal from "../GamesModal.jsx";
import "./dynamiclist.scss";

const DynamicList = ({ genre }) => {
  const [games, setGames] = useState([]);
  const [hoveredGame, setHoveredGame] = useState(null);
  const { language } = useLanguage();
  const URL = process.env.REACT_APP_URL_BACKEND;

  const fetchGames = async () => {
    try {
      const url = `${URL}/games/genres/${genre}`;
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      } else {
        const data = await response.json();
        setGames(data);
        console.log("Games fetched successfully");
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [genre]);

  const handleMouseEnter = (game) => {
    setHoveredGame(game);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  return (
    <>
      <PageSubtitle
        title={
          (genre === "Beliebte-Titel" && language === "en"
            ? "Bestsellers"
            : "Beliebte Titel") ||
          (genre === "Neu-Erschienen" && language === "en"
            ? "123"
            : "Neu Erscheinungen")
        }
        icon={
          genre === "Beliebte-Titel"
            ? "heart-fill"
            : genre === "Neu-Erschienen"
            ? "dropbox"
            : ""
        }
        Nav={true}
      />
      {games && (
        <div className="dynamic-gameslist-wrapper">
          {games.slice(0, 6).map((game, index) => (
            <div
              key={`game-card` + index}
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
                <div className="game-card-title">
                  <h3 className="game-card-title">{game.title}</h3>
                </div>
                <div className="game-card-pricetags">
                  {game.discount > 0 && (
                    <p className="game-discount-tag">-{game.discount}%</p>
                  )}
                  <div className="game-pricetags">
                    {game.discount > 0 && (
                      <small className="game-pricetag-discount">
                        {game.price} €
                      </small>
                    )}
                    <p className="game-card-price">
                      {game.discount > 0
                        ? Math.floor(
                            (game.price - (game.price * game.discount) / 100) *
                              100
                          ) / 100
                        : game.price}{" "}
                      €
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DynamicList;
