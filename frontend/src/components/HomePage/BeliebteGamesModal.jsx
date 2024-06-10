import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BeliebteGamesModal.scss";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import AddToCartBtn from "../AddToCartBtn";
import { NavLink } from "react-router-dom";

const BeliebteGamesModal = ({ game }) => {
  const discountedPrice = game.price - (game.price * game.discount) / 100;
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

  const getFunctionIcon = (functions) => {
    switch (functions) {
      case "Mehrspieler":
        return (
          <i key="multiplayer" className="bi bi-people" title="Mehrspieler"></i>
        );
      case "Einzelspieler":
        return (
          <i
            key="singleplayer"
            className="bi bi-person"
            title="Einzelspieler"></i>
        );
      case "crossplatform":
        return (
          <i
            key="crossplatform"
            className="bi bi-globe"
            title="Crossplatfrom"></i>
        );
      case "Erfolge":
        return (
          <i
            key="achievements"
            className="bi bi-trophy"
            title="Achievements"></i>
        );
      case "Cloud-Speicherstände":
        return (
          <i
            key="cloud"
            className="bi bi-cloud-upload"
            title="Cloud-Speicherstände"></i>
        );
      case "Controller-Unterstützung":
        return (
          <i
            key="controller"
            className="bi bi-controller"
            title="Controller-Unterstützung"></i>
        );
      case "Einblendungen":
        return (
          <i key="ads" className="bi bi-megaphone" title="Einblendungen"></i>
        );
      case "Koop":
        return <i key="coop" className="bi bi-people-fill" title="Koop"></i>;
      default:
        return null;
    }
  };

  const heartfill = (rating) => {
    let hearts;

    switch (true) {
      case rating >= 4.75:
        hearts = (
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
          <div className="game-modal-rating-hearts">
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
    <div className="game-modal-wrapper">
      <div className="game-modal-swiper-wrapper">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
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
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="game-modal-Swiper">
          {game.pics.map((pic, index) => (
            <SwiperSlide key={game._id + index}>
              <img
                src={pic}
                alt={game.title}
                className="game-modal-swiper-pic"
              />
            </SwiperSlide>
          ))}
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
      <NavLink to={`/game/${game._id}`} className="game-modal-info-wrapper">
        <div className="game-modal-header-wrapper">
          <div className="game-modal-header-left">
            <h2 className="game-modal-title">{game.title}</h2>
            <div className="game-modal-platform">
              {game.platforms?.map(getPlatformIcon)}
              <p>Deutsch (audio,text)</p>
            </div>
          </div>
          <div className="game-modal-header-right">
            {heartfill(game.rating)}
            <p>{game.rating}</p>
          </div>
        </div>
        <div className="game-modal-tags">
          {game.tags.map((tag, index) => (
            <span key={tag + index}>{tag}, </span>
          ))}
        </div>

        <div className="game-modal-functions">
          <h3>Funktionen:</h3>
          {game.functions.map(getFunctionIcon)}
        </div>
        <div className="game-modal-price">
          {game.discount >= 1 && (
            <div className="game-modal-rabatt">
              <p>-{game.discount}%</p>
            </div>
          )}
          <div className="game-modal-price-text">
            <p>{discountedPrice.toFixed(2)}€</p>{" "}
          </div>
          <AddToCartBtn
            className="game-modal-price-btn"
            game={game}
            text={<i className="bi bi-cart-plus"></i>}
          />
        </div>
      </NavLink>
    </div>
  );
};

export default BeliebteGamesModal;
