import React, { useContext, useEffect, useState } from "react";
import { LogginContext } from "../../contexts/LogginContext.js";
import slugify from "slugify";
import "./gameslibrary.scss";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext.js";

const GamesLibrary = () => {
  const [games, setGames] = useState([]);
  const [fullGames, setFullGames] = useState([]);
  const { loggedInUser } = useContext(LogginContext);
  const URL = process.env.REACT_APP_URL_BACKEND;

  const { language } = useLanguage();

  const fetchData = async (e) => {
    try {
      const response = await fetch(`${URL}/accounts/${loggedInUser.id}`, {
        method: "GET",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      } else {
        const data = await response.json();
        setGames(data.myGames);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loggedInUser]);

  useEffect(() => {
    const fetchGames = async () => {
      const fetchedGames = [];

      for (const game of games) {
        try {
          const response = await fetch(`${URL}/games/${slugify(game, "_")}`);
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
          }
          const data = await response.json();
          fetchedGames.push(data);
        } catch (error) {
          console.error(error);
        }
      }

      setFullGames(fetchedGames);
    };

    if (games.length > 0) {
      fetchGames();
    }
  }, [URL, games]);

  const heartfill = (rating) => {
    let hearts;

    switch (true) {
      case rating >= 4.75:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
          </div>
        );
        break;
      case rating >= 4.25:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-half"></i>
          </div>
        );
        break;
      case rating >= 3.75:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;
      case rating >= 3.25:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-half"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;
      case rating >= 2.75:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;
      case rating >= 2.25:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-half"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;
      case rating >= 1.75:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;
      case rating >= 1.25:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart-half"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;
      case rating >= 0.75:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-fill"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;
      case rating >= 0.25:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart-half"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
        break;

      default:
        hearts = (
          <div className="rating-wrapper">
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
          </div>
        );
    }

    return hearts;
  };

  return (
    <>
      <div className="profile-game-card-wrapper">
        {fullGames.length > 0 &&
          fullGames.map((game, index) => (
            <NavLink
              key={"profile-game-card" + index}
              to={`/games/${slugify(game.title, "_")}`}
              className="profile-game-card">
              <div className="profile-game-card-thumbnail-wrapper">
                <img src={game.thumbnail} alt="" />
              </div>
              <div className="profile-game-card-info-wrapper">
                <div className="upper-wrapper">
                  <p>{game.title}</p>
                </div>
                <div className="lower-wrapper">
                  <small>{game.publisher}</small>
                  {heartfill(game.rating)}
                </div>
              </div>
            </NavLink>
          ))}
      </div>
      {fullGames.length < 1 && (
        <div className="profile-game-card-wrapper-empty">
          <h3>{language === "en" ? "Sorry!" : "Entschuldigung!"}</h3>
          <p>
            {language === "en"
              ? "You don't have any games in your library yet!"
              : "Du hast noch keine Spiele in deiner Bibliothek!"}
          </p>
        </div>
      )}
    </>
  );
};

export default GamesLibrary;
