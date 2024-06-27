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

  const fetchGames = async () => {
    try {
      const response = await fetch(`http://localhost:3001/games/`);
      const data = await response.json();
      setGames(data);
      if (response.ok) {
        console.log("Games fetched successfully");
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
    if (genre === "strategie") {
      return language === "en" ? "Strategy" : "Strategie";
    } else if (genre === "bauen") {
      return language === "en" ? "Building" : "Bauen";
    } else if (genre === "historisch") {
      return language === "en" ? "Historical" : "Historisch";
    } else if (genre === "neu-erschienen") {
      return language === "en" ? "New releases" : "Neu erschienen";
    } else if (genre === "rollenspiel") {
      return language === "en" ? "Role-playing" : "Rollenspiel";
    } else if (genre === "action") {
      return language === "en" ? "Action" : "Action";
    } else if (genre === "open-world") {
      return language === "en" ? "Open World" : "Open-World";
    } else if (genre === "beliebte-titel") {
      return language === "en" ? "Bestsellers" : "Beliebte Titel";
    } else if (genre === "fantasy") {
      return language === "en" ? "Fantasy" : "Fantasy";
    } else if (genre === "simulation") {
      return language === "en" ? "Simulation" : "Simulation";
    } else if (genre === "science-fiction") {
      return language === "en" ? "Science Fiction" : "Science-Fiction";
    } else if (genre === "rundenbasiert") {
      return language === "en" ? "Turn-based" : "Rundenbasiert";
    } else if (genre === "überleben") {
      return language === "en" ? "Survival" : "Überleben";
    } else if (genre === "abenteuer") {
      return language === "en" ? "Adventure" : "Abenteuer";
    } else if (genre === "erzählung") {
      return language === "en" ? "Narrative" : "Erzählung";
    } else if (genre === "shooter") {
      return language === "en" ? "Shooter" : "Shooter";
    } else if (genre === "egoperspektive") {
      return language === "en" ? "First-person" : "Egoperspektive";
    } else if (genre === "point-and-click") {
      return language === "en" ? "Point-and-click" : "Point-and-Click";
    } else if (genre === "detektivgeschichten") {
      return language === "en" ? "Detective stories" : "Detektivgeschichten";
    } else if (genre === "exploration") {
      return language === "en" ? "Exploration" : "Exploration";
    } else if (genre === "echtzeit") {
      return language === "en" ? "Real-time" : "Echtzeit";
    } else if (genre === "angebote") {
      return language === "en" ? "Offers" : "Angebote";
    } else if (genre === "puzzle") {
      return language === "en" ? "Puzzle" : "Puzzle";
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
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="">
        {genres.map(
          (genre, index) =>
            genreDiscounts[genre] !== null &&
            genreDiscounts[genre] > 0 && (
              <SwiperSlide key={index}>
                <NavLink
                  to={`/games?=genres=${genre.toLowerCase()}`}
                  className="genre-link">
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
