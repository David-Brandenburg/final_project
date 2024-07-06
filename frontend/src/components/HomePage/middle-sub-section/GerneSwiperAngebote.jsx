import React, { useState, useEffect } from "react";
import PageSubtitle from "../../PageSubtitle/PageSubtitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "./GerneSwiperAngebote.scss";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";

const GerneSwiperAngebote = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreDiscounts, setGenreDiscounts] = useState({});
  const [genreBackgrounds, setGenreBackgrounds] = useState({});
  const { language } = useLanguage();
  const URL = process.env.REACT_APP_URL_BACKEND;

  const fetchGames = async () => {
    try {
      const response = await fetch(`${URL}/games/`);
      const data = await response.json();
      setGames(data);
      if (response.ok) {
        const genresList = data.map((game) => game.genres);
        const uniqueGenres = [...new Set(genresList.flat())];
        setGenres(uniqueGenres);
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  const findHighestDiscountForGenre = (genre) => {
    const gamesInGenre = games.filter((game) => game.genres.includes(genre));
    if (gamesInGenre.length === 0) return null;
    return gamesInGenre.reduce(
      (max, game) => (game.discount > max ? game.discount : max),
      -Infinity
    );
  };

  const selectRandomGameBgPicForGenre = (genre) => {
    const gamesInGenre = games.filter((game) => game.genres.includes(genre));
    if (gamesInGenre.length === 0) return null;
    const randomGame =
      gamesInGenre[Math.floor(Math.random() * gamesInGenre.length)];
    return randomGame.bgPic;
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const discounts = {};
    const backgrounds = {};
    genres.forEach((genre) => {
      const highestDiscount = findHighestDiscountForGenre(genre);
      discounts[genre] = highestDiscount;
      const bgPic = selectRandomGameBgPicForGenre(genre);
      backgrounds[genre] = bgPic;
    });
    setGenreDiscounts(discounts);
    setGenreBackgrounds(backgrounds);
  }, [genres, games]);

  function getGenreTranslation(genre, language) {
    if (genre === "Strategie") {
      return language === "en" ? "Strategy" : "Strategie";
    } else if (genre === "Bauen") {
      return language === "en" ? "Building" : "Bauen";
    } else if (genre === "Historisch") {
      return language === "en" ? "Historical" : "Historisch";
    } else if (genre === "Neu-Erschienen") {
      return language === "en" ? "New releases" : "Neu erschienen";
    } else if (genre === "Rollenspiel") {
      return language === "en" ? "Role-playing" : "Rollenspiel";
    } else if (genre === "action") {
      return language === "en" ? "Action" : "Action";
    } else if (genre === "Open-World") {
      return language === "en" ? "Open World" : "Open-World";
    } else if (genre === "Beliebte-Titel") {
      return language === "en" ? "Bestsellers" : "Beliebte Titel";
    } else if (genre === "Fantasy") {
      return language === "en" ? "Fantasy" : "Fantasy";
    } else if (genre === "Simulation") {
      return language === "en" ? "Simulation" : "Simulation";
    } else if (genre === "Science-Fiction") {
      return language === "en" ? "Science Fiction" : "Science-Fiction";
    } else if (genre === "Rundenbasiert") {
      return language === "en" ? "Turn-based" : "Rundenbasiert";
    } else if (genre === "Überleben") {
      return language === "en" ? "Survival" : "Überleben";
    } else if (genre === "Abenteuer") {
      return language === "en" ? "Adventure" : "Abenteuer";
    } else if (genre === "Erzählung") {
      return language === "en" ? "Narrative" : "Erzählung";
    } else if (genre === "Shooter") {
      return language === "en" ? "Shooter" : "Shooter";
    } else if (genre === "Egoperspektive") {
      return language === "en" ? "First-person" : "Egoperspektive";
    } else if (genre === "Point-and-Click") {
      return language === "en" ? "Point-and-click" : "Point-and-Click";
    } else if (genre === "detektivgeschichten") {
      return language === "en" ? "Detective stories" : "Detektivgeschichten";
    } else if (genre === "Erkundung") {
      return language === "en" ? "Exploration" : "Erkundung";
    } else if (genre === "Echtzeit") {
      return language === "en" ? "Real-time" : "Echtzeit";
    } else if (genre === "Angebote") {
      return language === "en" ? "Offers" : "Angebote";
    } else if (genre === "Rätsel") {
      return language === "en" ? "Puzzle" : "Rätsel";
    } else if (genre === "Horror") {
      return language === "en" ? "Horror" : "Horror";
    } else if (genre === "JRPG") {
      return language === "en" ? "JRPG" : "JRPG";
    } else if (genre === "Management") {
      return language === "en" ? "Management" : "Management";
    } else {
      return genre;
    }
  }

  return (
    <>
      <PageSubtitle
        title={language === "en" ? "On sale by genre" : "Angebote in Genres"}
        icon="tag"
      />
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Navigation]}
        className="swiper-genres">
        {genres.map(
          (genre, index) =>
            genreDiscounts[genre] !== null &&
            genreDiscounts[genre] > 0 && (
              <SwiperSlide key={index}>
                <NavLink to={`/games?=genres=${genre}`} className="genre-link">
                  <div className="genre-swiper-kachel-wrapper">
                    <div
                      className="genre-swiper-kachel-bg"
                      style={{
                        backgroundImage: `url(${genreBackgrounds[genre]})`,
                      }}
                    />
                    <div className="genre-kachel">
                      <h3>{getGenreTranslation(genre, language)}</h3>
                      <p className="genre-kachel-discount">
                        {`- ${genreDiscounts[genre]}%`}
                      </p>
                      <p className="genre-kachel-angebote-text">
                        {language === "en"
                          ? "Browse our special offers"
                          : "Durchstöbere unsere Sonderangebote"}
                      </p>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            )
        )}
        <div className="slider_controler">
          <div className="swiper-button-prev arrow-left">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="swiper-button-next arrow-right">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default GerneSwiperAngebote;
