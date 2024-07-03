import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useLanguage } from "../../contexts/LanguageContext.js";
import AddToCartBtn from "../AddToCartBtn";
import slugify from "slugify";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../HomePage/GamesModal.scss";

const GamesModal = ({ game }) => {
  const { language } = useLanguage();
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
          <i
            key="multiplayer"
            className="bi bi-people"
            title={language === "en" ? "Multiplayer" : "Mehrspieler"}></i>
        );
      case "Einzelspieler":
        return (
          <i
            key="singleplayer"
            className="bi bi-person"
            title={language === "en" ? "Singleplayer" : "Einzelspieler"}></i>
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
            title={language === "en" ? "Achievements" : "Erfolge"}></i>
        );
      case "Cloud-Speicherstände":
        return (
          <i
            key="cloud"
            className="bi bi-cloud-upload"
            title={
              language === "en" ? "Cloud saves" : "Cloud-Speicherstände"
            }></i>
        );
      case "Controller-Unterstützung":
        return (
          <i
            key="controller"
            className="bi bi-controller"
            title={
              language === "en"
                ? "Controller-Support"
                : "Controller-Unterstützung"
            }></i>
        );
      case "Einblendungen":
        return (
          <i
            key="ads"
            className="bi bi-aspect-ratio"
            title={language === "en" ? "Overlay" : "Einblendungen"}></i>
        );
      case "Ranglisten":
        return (
          <i
            key="leaderboard"
            className="bi bi-clipboard2-data"
            title={language === "en" ? "Leaderboards" : "Ranglisten"}></i>
        );
      case "Koop":
        return (
          <i
            key="coop"
            className="bi bi-people-fill"
            title={language === "en" ? "Coop" : "Koop"}></i>
        );
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

  const messages = {
    Indie: {
      en: "Indie",
      de: "Indie",
    },
    Strategie: {
      en: "Strategy",
      de: "Strategie",
    },
    Action: {
      en: "Action",
      de: "Action",
    },
    Abenteuer: {
      en: "Adventure",
      de: "Abenteuer",
    },
    Rollenspiel: {
      en: "RPG",
      de: "Rollenspiel",
    },
    Fantasy: {
      en: "Fantasy",
      de: "Fantasy",
    },
    "Science-Fiction": {
      en: "Science-Fiction",
      de: "Science-Fiction",
    },
    Shooter: {
      en: "Shooter",
      de: "Shooter",
    },
    Atmosphärisch: {
      en: "Atmospheric",
      de: "Atmosphärisch",
    },
    Überleben: {
      en: "Survival",
      de: "Überleben",
    },
    Horror: {
      en: "Horror",
      de: "Horror",
    },
    "Spannende Geschichte": {
      en: "Exciting Story",
      de: "Spannende Geschichte",
    },
    Erkundung: {
      en: "Exploration",
      de: "Erkundung",
    },
    "Toller Soundtrack": {
      en: "Great Soundtrack",
      de: "Toller Soundtrack",
    },
    "First-Person": {
      en: "First-Person",
      de: "First-Person",
    },
    "Third Person": {
      en: "Third-Person",
      de: "Third-Person",
    },
    "Offene Spielwelt": {
      en: "Open World",
      de: "Offene Spielwelt",
    },
    Sandbox: {
      en: "Sandbox",
      de: "Sandbox",
    },
    FPS: {
      en: "FPS",
      de: "FPS",
    },
    Postapokalyptisch: {
      en: "Postapocalyptic",
      de: "Postapokalyptisch",
    },
    Historisch: {
      en: "Historical",
      de: "Historisch",
    },
    Ressourcenverwaltung: {
      en: "Resource Management",
      de: "Ressourcenverwaltung",
    },
    Crafting: {
      en: "Crafting",
      de: "Crafting",
    },
    Mittelalterlich: {
      en: "Medieval",
      de: "Mittelalterlich",
    },
    Bauen: {
      en: "Building",
      de: "Bauen",
    },
    Basenbau: {
      en: "Base Building",
      de: "Basenbau",
    },
    Städtebauer: {
      en: "City Builder",
      de: "Städtebauer",
    },
    Kämpfen: {
      en: "Combat",
      de: "Kämpfen",
    },
    Wissenschaft: {
      en: "Science",
      de: "Wissenschaft",
    },
    Rundenbasiert: {
      en: "Turn-based",
      de: "Rundenbasiert",
    },
    Klassisch: {
      en: "Classic",
      de: "Klassisch",
    },
    Taktisch: {
      en: "Tactical",
      de: "Taktisch",
    },
    Isometrisch: {
      en: "Isometric",
      de: "Isometrisch",
    },
    "Good Old Game": {
      en: "Good Old Game",
      de: "Good Old Game",
    },
    "Taktik-RPG": {
      en: "Tactical RPG",
      de: "Taktik-RPG",
    },
    cRPG: {
      en: "cRPG",
      de: "cRPG",
    },
    Rätsel: {
      en: "Puzzle",
      de: "Rätsel",
    },
    Detektivgeschichten: {
      en: "Detective Stories",
      de: "Detektivgeschichten",
    },
    Leicht: {
      en: "Easy",
      de: "Leicht",
    },
    Lustig: {
      en: "Funny",
      de: "Lustig",
    },
    "Point&Click": {
      en: "Point&Click",
      de: "Point&Click",
    },
    Mystery: {
      en: "Mystery",
      de: "Mystery",
    },
    Ermittlung: {
      en: "Investigation",
      de: "Ermittlung",
    },
    kurz: {
      en: "Short",
      de: "kurz",
    },
    Erzählung: {
      en: "Narrative",
      de: "Erzählung",
    },
    Noir: {
      en: "Noir",
      de: "Noir",
    },
    Gemütlich: {
      en: "Cozy",
      de: "Gemütlich",
    },
    "Keine Gewalt": {
      en: "No Violence",
      de: "Keine Gewalt",
    },
    "2D": {
      en: "2D",
      de: "2D",
    },
    Weltraum: {
      en: "Space",
      de: "Weltraum",
    },
    "Von-Oben-Ansicht": {
      en: "Top-Down",
      de: "Von-Oben-Ansicht",
    },
    "Prozedural Generiert": {
      en: "Procedurally Generated",
      de: "Prozedural Generiert",
    },
    "Bullet Hell": {
      en: "Bullet Hell",
      de: "Bullet Hell",
    },
    Fliegen: {
      en: "Flying",
      de: "Fliegen",
    },
    "Looter Shooter": {
      en: "Looter Shooter",
      de: "Looter Shooter",
    },
    Verwaltung: {
      en: "Management",
      de: "Verwaltung",
    },
    "Schwarzer Humor": {
      en: "Black Humor",
      de: "Schwarzer Humor",
    },
    "Psychologischer Horror": {
      en: "Psychological Horror",
      de: "Psychologischer Horror",
    },
    Überlebenshorror: {
      en: "Survival Horror",
      de: "überlebenshorror",
    },
    Lovecraft: {
      en: "Lovecraft",
      de: "Lovecraft",
    },
    Fischen: {
      en: "Fishing",
      de: "Fischen",
    },
    "Mehrere Enden": {
      en: "Multiple Endings",
      de: "Mehrere Enden",
    },
    "Weibliche Protagonistin": {
      en: "Female Protagonist",
      de: "Weibliche Protagonistin",
    },
    "Entscheidungen Zählen": {
      en: "Choices Matter",
      de: "Entscheidungen Zählen",
    },
    "Nicht jugendfrei": {
      en: "Not for Children",
      de: "Nicht Jugendfrei",
    },
    "LGBTQ+": {
      en: "LGBTQ+",
      de: "LGBTQ+",
    },
    "Hunde Streicheln": {
      en: "Petting Dogs",
      de: "Hunde Streicheln",
    },
    Echtzeit: {
      en: "Real-time",
      de: "Echtzeit",
    },
    Magie: {
      en: "Magic",
      de: "Magie",
    },
    Brettspiel: {
      en: "Board Game",
      de: "Brettspiel",
    },
    "Lokaler Coop": {
      en: "Local Coop",
      de: "lokaler Koop",
    },
    "Entscheidungen zählen": {
      en: "Choices Matter",
      de: "Entscheidungen Zählen",
    },
    Gewalttätig: {
      en: "Violence",
      de: "Gewaltätig",
    },
    Nacktheit: {
      en: "Nudity",
      de: "Nacktheit",
    },
    "Nur Auf GOG": {
      en: "Only on PIXELPLAZA",
      de: "Nur auf PIXELPLAZA",
    },
    "Lokaler Multiplayer": {
      en: "Local Multiplayer",
      de: "Lokaler Multiplayer",
    },
    Düster: {
      en: "Gloomy",
      de: "Düster",
    },
    Untergrund: {
      en: "Underground",
      de: "Untergrund",
    },
    Schwierig: {
      en: "Difficult",
      de: "Schwierig",
    },
    Pixelgrafik: {
      en: "Pixel Graphics",
      de: "Pixelgrafik",
    },
    "Sexuelle Inhalte": {
      en: "Sexual Content",
      de: "Sexuelle Inhalte",
    },
    "Wähle Dein Eigenes Abenteuer": {
      en: "Choose your own Adventure",
      de: "Wähle dein eigenes Abenteuer",
    },
    Verbrechen: {
      en: "Crime",
      de: "Verbrechen",
    },
    Kampfkunst: {
      en: "Martial Arts",
      de: "Kampfkunst",
    },
    Schleichen: {
      en: "Stealth",
      de: "Schleichen",
    },
    "Geteilter Bildschirm": {
      en: "Split Screen",
      de: "Geteilter Bildschirm",
    },
    Werwölfe: {
      en: "Werewolves",
      de: "Werwölfe",
    },
    Entspannend: {
      en: "Relaxing",
      de: "Entspannend",
    },
    "1.Weltkrieg": {
      en: "WW1",
      de: "1.Weltkrieg",
    },
    Textbasiert: {
      en: "Text-based",
      de: "Textbasiert",
    },
  };

  const getMessages = (tags, language) => {
    return tags.map((tag) => messages[tag]?.[language] || tag);
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
      <NavLink
        to={`/games/${slugify(game.title, "_")}`}
        className="game-modal-info-wrapper">
        <div className="game-modal-header-wrapper">
          <div className="game-modal-header-left">
            <h2 className="game-modal-title">{game.title}</h2>
            <div className="game-modal-platform">
              {game.platforms?.map(getPlatformIcon)}
              <p>
                {language === "en"
                  ? "English (audio, text)"
                  : "Deutsch (audio, text)"}
              </p>
            </div>
          </div>
          <div className="game-modal-header-right">
            {heartfill(game.rating)}
            <p>{game.rating}</p>
          </div>
        </div>
        <div className="game-modal-tags">
					<p>
						{getMessages(game.tags, language).map((message, index) => (
							<React.Fragment key={'tag' + index}>
								<span style={{width: 'max-content'}} key={index}>{message}</span>
								{index < game.tags.length - 1 && <span className="space-holder">,</span>}
							</React.Fragment>
						))}
					</p>
        </div>

        <div className="game-modal-functions">
          <h3>{language === "en" ? "Functions:" : "Funktionen:"}</h3>
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

export default GamesModal;
