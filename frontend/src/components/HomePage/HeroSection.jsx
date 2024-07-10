import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HeroSection.scss";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { NavLink } from "react-router-dom";
import PageSubtitle from "../PageSubtitle/PageSubtitle.jsx";
import slugify from "slugify";
import AddToCartBtn from "../AddToCartBtn.jsx";
import { useLanguage } from "../../contexts/LanguageContext";

const HeroSection = () => {
  const [games, setGames] = useState([]);
  const { language } = useLanguage();
  const URL = process.env.REACT_APP_URL_BACKEND;

  const fetchGames = async () => {
    try {
      const response = await fetch(`${URL}/games`);
      const data = await response.json();
      setGames(data);
      if (response.ok) {
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "windows":
        return <i key="windows" className="bi bi-windows"></i>;
      case "ios":
        return <i key="ios" className="bi bi-apple"></i>;
      case "linux":
        return <i key="linux" className="bi bi-ubuntu"></i>;
      default:
        return null;
    }
  };

  return (
    <>
      <PageSubtitle
        title={language === "en" ? "On Sale" : "Angebote"}
        icon="star-fill"
      />
      <div className="swiper-wrapper">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 10000,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container">
          {games
            .filter((game) => game.discount > 0 && game.rating > 4.0)
            .slice(0, 10)
            .map((game) => {
              const discountedPrice =
                (game.price * (100 - game.discount)) / 100;
              return (
                <SwiperSlide key={game._id}>
                  <img
                    className="background-image"
                    src={game.bgPic}
                    alt="slide_image"
                  />
                  <div className="game-logo">
                    {game.logo && (
                      <NavLink to={`/games/${slugify(game.title, "_")}`}>
                        <img src={game.logo} alt="game_logo" />{" "}
                      </NavLink>
                    )}
                  </div>
                  <div className="overlay">
                    <NavLink
                      className="text-wrapper"
                      to={`/games/${slugify(game.title, "_")}`}>
                      <div className="text-icon-p">
                        {game.platforms?.map(getPlatformIcon)}
                        <p>
                          {language === "en"
                            ? "Now on Sale"
                            : "Jetzt im Angebot"}
                        </p>
                      </div>
                      <h3>{game.title}</h3>
                    </NavLink>
                    <div className="price-btn-wrapper">
                      <div className="rabatt">
                        <p>-{game.discount}%</p>
                      </div>
                      <div className="price">
                        <p>
                          {discountedPrice === 0
                            ? "Free"
                            : discountedPrice.toFixed(2)}
                          €
                        </p>
                      </div>
                      <AddToCartBtn
                        className={"btn"}
                        game={game}
                        text={
                          <>
                            <i className="bi bi-cart-plus"></i>
                            <p>
                              {language === "en"
                                ? "Add to Cart"
                                : "In den Warenkorb"}
                            </p>
                          </>
                        }
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

          <div className="slider_controler">
            <div className="swiper-button-prev arrow-left">
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className="swiper-button-next arrow-right">
              <i className="fas fa-chevron-right"></i>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default HeroSection;
