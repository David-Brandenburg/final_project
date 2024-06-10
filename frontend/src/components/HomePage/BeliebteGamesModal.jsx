import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BeliebteGamesModal.scss";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import AddToCartBtn from "../AddToCartBtn";

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
      <div className="game-modal-info-wrapper">
        <div className="game-modal-header-wrapper">
          <div className="game-modal-header-left">
            <h2 className="game-modal-title">{game.title}</h2>
            <div className="game-modal-platform">
              {game.platforms?.map(getPlatformIcon)}
              <p>Deutsch (audio,text)</p>
            </div>
          </div>
          <div className="game-modal-header-right">
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart"></i>
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
          {game.functions.map((func, index) => (
            <span className="game-modal-fuctions-span" key={func + index}>
              {func},{" "}
            </span>
          ))}
        </div>
        <div className="game-modal-price">
          <div className="game-modal-rabatt">
            <p>-{game.discount}%</p>
          </div>
          <div className="game-modal-price-text">
            <p>{discountedPrice.toFixed(2)}€</p>{" "}
          </div>
          <AddToCartBtn
            className="game-modal-price-btn"
            game={game}
            text={<i className="bi bi-cart-plus"></i>}
          />
        </div>
      </div>
    </div>
  );
};

export default BeliebteGamesModal;
