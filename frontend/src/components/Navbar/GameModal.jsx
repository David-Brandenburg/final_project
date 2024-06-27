import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext.js";
import GameModalCardContainer from "./GameModalCardContainer";
import slugify from "slugify";
import { useLanguage } from "../../contexts/LanguageContext.js";
import "../../styles/modals.scss";

const GameModal = () => {
  const [genre, setGenre] = useState("");
  const { language } = useLanguage();
  const messages = {
    "beliebte-titel": {
      en: "Browse all bestsellers",
      de: "Zu allen beliebten Titeln",
    },
    "neu-erschienen": {
      en: "Browse all new releases",
      de: "Zu allen Neuerscheinungen",
    },
    angebote: {
      en: "Browse all on sale now",
      de: "Zu allen Angeboten",
    },
    abenteuer: {
      en: "Browse all adventure games",
      de: "Zu allen Abenteuerspielen",
    },
    rollenspiel: {
      en: "Browse all RPGs",
      de: "Zu allen Rollenspielen",
    },
    strategie: {
      en: "Browse all strategy games",
      de: "Zu allen Strategiespielen",
    },
    action: {
      en: "Browse all action games",
      de: "Zu allen Actionspielen",
    },
    shooter: {
      en: "Browse all shooter games",
      de: "Zu allen Shootern",
    },
    fantasy: {
      en: "Browse all fantasy games",
      de: "Zu allen Fantasy-Spielen",
    },
    "science-fiction": {
      en: "Browse all science-fiction games",
      de: "Zu allen Science-Fiction-Spielen",
    },
  };
  const { setOpenGameModal, setOpenModalBlocker } = useContext(ModalContext);

  useEffect(() => {
    const gamesGenre = document.querySelectorAll(".games-modal-link");

    const handleMouseEnter = (e) => {
      const currentGenre = e.target;
      if (currentGenre.innerText === "New releases") {
        setGenre("Neu-Erschienen");
      } else if (currentGenre.innerText === "Bestsellers") {
        setGenre("Beliebte-Titel");
      } else if (currentGenre.innerText === "On sale now") {
        setGenre("Angebote");
      } else if (currentGenre.innerText === "Adventure") {
        setGenre("Abenteuer");
      } else if (currentGenre.innerText === "RPG") {
        setGenre("Rollenspiel");
      } else if (currentGenre.innerText === "Strategy") {
        setGenre("Strategie");
      } else {
        setGenre(slugify(currentGenre.innerText));
      }

      gamesGenre.forEach((genre) => {
        if (genre !== currentGenre) {
          genre.classList.remove("active");
        }
      });

      currentGenre.classList.add("active");
    };

    gamesGenre.forEach((genre) => {
      genre.addEventListener("mouseenter", handleMouseEnter);
    });

    return () => {
      gamesGenre.forEach((genre) => {
        genre.removeEventListener("mouseenter", handleMouseEnter);
      });
    };
  }, [genre]);

  const getMessage = (genre, language) => {
    return messages[genre]?.[language] || `Zu allen ${slugify(genre)}-Spielen`;
  };

  return (
    <div className="games-modal" onClick={(e) => {e.stopPropagation(); e.preventDefault()}}>
      <div className="games-genre-list">
        <p className="games-modal-link">
          {language === "en" ? "New releases" : "Neu erschienen"}
        </p>
        <p className="games-modal-link">
          {language === "en" ? "Bestsellers" : "Beliebte Titel"}
        </p>
        <p className="games-modal-link">
          {language === "en" ? "On sale now" : "Angebote"}
        </p>
        <hr style={{ borderBottom: "1px solid #fff" }} />
        <p className="games-modal-link">
          {language === "en" ? "Adventure" : "Abenteuer"}
        </p>
        <p className="games-modal-link">Action</p>
        <p className="games-modal-link">Shooter</p>
        <p className="games-modal-link">
          {language === "en" ? "RPG" : "Rollenspiel"}
        </p>
        <p className="games-modal-link">
          {language === "en" ? "Strategy" : "Strategie"}
        </p>
        <p className="games-modal-link">Fantasy</p>
        <p className="games-modal-link">Science-Fiction</p>
      </div>
      {genre && (
        <div className="games-content">
          <GameModalCardContainer genre={genre} />
          <div className="">
            <NavLink
              to={`/games?=genres=${genre.toLowerCase()}`}
              className="genre-link"
              onClick={(e) => {
                setOpenGameModal(false);
                setOpenModalBlocker(false);
              }}>
              {getMessage(genre, language)}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameModal;
