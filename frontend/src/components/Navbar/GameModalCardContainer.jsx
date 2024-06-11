import React, { useEffect, useState } from "react";
import slugify from "slugify";
import { NavLink } from "react-router-dom";
import AddToCartBtn from "../AddToCartBtn";
import { useLanguage } from "../../contexts/LanguageContext";

const GameModalCardContainer = ({ genre }) => {
  const [games, setGames] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    const controller = new AbortController();
    const fetchGames = async () => {
      const signal = controller.signal;
      const url = `http://localhost:3001/games/genres/${genre}`;

      try {
        const response = await fetch(url, { method: "GET", signal });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        } else {
          const data = await response.json();
          if (data.length < 1) {
            setGames(null);
          } else {
            setGames(data.slice(0, 6));
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }

      return () => controller.abort();
    };

    fetchGames();

    // Cleanup function to abort the fetch request if genre changes before fetch completes
    return () => {
      controller.abort();
    };
  }, [genre]);

  return (
    <div className="games-card-container">
      {!games ? (
        <div className="games-card-error-wrapper">
          <h3>{language === "en" ? "Error" : "Fehler"}</h3>
          <p>
            {language === "en"
              ? "Something went wrong"
              : "Etwas ist schief gelaufen!"}
          </p>
        </div>
      ) : (
        games.map((game, index) => {
          return (
            <NavLink
              to={`games/${slugify(game.title, "_")}`}
              className="game-card"
              key={game.title + index}>
              <div className="game-card-thumbnail-wrapper">
                <img src={game.thumbnail} alt="" />
              </div>
              <div className="game-card-info-wrapper">
                <div className="game-card-platforms-wrapper">
                  {game.platforms.map((platform) => (
                    <small key={platform} className="game-card-platform">
                      <i className={`bi bi-${platform}`}></i>
                    </small>
                  ))}
                </div>
                <div className="price-tags-wrapper">
                  {game.discount > 0 && (
                    <div className="game-discount-wrapper">
                      <small className="discountprice-tag">
                        {Math.floor(
                          (game.price - (game.price * game.discount) / 100) *
                            100
                        ) / 100}
                        €
                      </small>
                      <small className="discount-tag">-{game.discount}%</small>
                    </div>
                  )}
                  <AddToCartBtn
                    className={`game-card-price-tag${
                      game.discount > 0 ? "-discount" : ""
                    }`}
                    game={game}
                    text={<p>{game.price}€</p>}
                  />
                </div>
              </div>
            </NavLink>
          );
        })
      )}
    </div>
  );
};

export default GameModalCardContainer;
