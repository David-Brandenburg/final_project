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

const GerneSwiperAngebote = () => {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreDiscounts, setGenreDiscounts] = useState({});
  const [genreBackgrounds, setGenreBackgrounds] = useState({});

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

  return (
    <>
      <PageSubtitle title="Angebote in Genres" icon="tag" />
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
            // Prüfe, ob das Genre einen Rabatt über 0 hat
            genreDiscounts[genre] !== null &&
            genreDiscounts[genre] > 0 && (
              <SwiperSlide key={index}>
                <NavLink
                  to={`/games/genres/${genre.toLowerCase()}`}
                  className="genre-link">
                  <div className="genre-swiper-kachel-wrapper">
                    <div
                      className="genre-swiper-kachel-bg"
                      style={{
                        backgroundImage: `url(${genreBackgrounds[genre]})`,
                      }}
                    />
                    <div className="genre-kachel">
                      <h3>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h3>
                      <p className="genre-kachel-discount">
                        {`- ${genreDiscounts[genre]}`}
                      </p>
                      <p className="genre-kachel-angebote-text">
                        Durchstöbere unsere Sonderangebote
                      </p>
                    </div>
                  </div>{" "}
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
