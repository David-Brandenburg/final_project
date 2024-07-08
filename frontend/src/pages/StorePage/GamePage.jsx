import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { ModalContext } from "../../contexts/ModalContext.js";
import { format } from "date-fns";
import AddToCartBtn from "../../components/AddToCartBtn.jsx";
import BuyNowBtn from "../../components/BuyNowBtn.jsx";
import slugify from "slugify";
import LanguagesListTag from "../../components/TrasnlationLanguages/LanguagesListTag.jsx";
import LanguagesListGenres from "../../components/TrasnlationLanguages/LanguagesListgGenres.jsx";
import usk0 from "../../assets/usk/USK_0.svg.png";
import usk6 from "../../assets/usk/USK_6.svg.png";
import usk12 from "../../assets/usk/USK_12.svg.png";
import usk16 from "../../assets/usk/USK_16.svg.png";
import usk18 from "../../assets/usk/USK_18.svg.png";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./gamepage.scss";

const GamePage = () => {
  const [gameData, setGameData] = useState(null);
  const [gameDLCS, setGameDLCS] = useState([]);
  const [mainGame, setMainGame] = useState(null);
  const [openTags, setOpenTags] = useState(false);
  const [recommendations1, setRecommendations1] = useState(null);
  const [recommendations2, setRecommendations2] = useState(null);
  const { title } = useParams();
  const { language } = useLanguage();
  const [languageTag, setLanguageTag] = useState("en"); // Standardmäßig Englisch
  const [languageGenre, setLanguageGenre] = useState("en"); // Standardmäßig Englisch

  const { setOpenModalBlocker, setOpenImageModal, setOpenTrailerModal } =
    useContext(ModalContext);
  const URL = process.env.REACT_APP_URL_BACKEND;

  useEffect(() => {
    const fetchGame = async () => {
      const url = `${URL}/games/${title}`;
      try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          const data = await response.json();
          toast.error(data.message);
          throw new Error(data.message);
        } else {
          const data = await response.json();
          setGameData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGame();

    return () => {
      setGameData(null);
      setOpenTags(false);
    };
  }, [title]);

  useEffect(() => {
    document.title =
      (gameData && gameData.discount > 0 ? `-${gameData.discount}% ` : "") +
      title.split("_").join(" ") +
      (language === "en" ? " on " : " auf ") +
      "PixelPlaza";

    window.scrollTo(0, 0);
  }, [language, title, gameData]);

  const handleImageModal = (e, pic) => {
    e.preventDefault();
    setOpenModalBlocker(true);
    setOpenImageModal(pic);
  };

  const handleTrailerModal = (e, trailer) => {
    e.preventDefault();
    setOpenModalBlocker(true);
    setOpenTrailerModal(trailer);
  };

  useEffect(() => {
    const fetchDLCS = async (title, abortSignal) => {
      try {
        const url = `${URL}/games/${slugify(title, "_")}`;
        const response = await fetch(url, {
          method: "GET",
          signal: abortSignal,
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
        return null;
      }
    };

    if (gameData) {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchAllDLCS = async () => {
        const dlcsData = await Promise.all(
          gameData.dlcs.map((title) => fetchDLCS(title, signal))
        );
        setGameDLCS(dlcsData.filter((dlc) => dlc !== null));
      };

      if (gameData.dlcs.length > 0) {
        fetchAllDLCS();
      }

      return () => {
        controller.abort();
      };
    }
  }, [gameData]);

  useEffect(() => {
    const fetchMainGame = async (title, abortSignal) => {
      try {
        const url = `${URL}/games/${slugify(title, "_")}`;
        const response = await fetch(url, {
          method: "GET",
          signal: abortSignal,
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
        return null;
      }
    };

    if (gameData && gameData.mainGame) {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchMainGameData = async () => {
        const mainGameData = await fetchMainGame(gameData.mainGame, signal);
        if (mainGameData) {
          setMainGame(mainGameData);
        }
      };

      fetchMainGameData();

      return () => {
        controller.abort();
        setMainGame(null);
      };
    }
  }, [gameData, title]);

  useEffect(() => {
    const fetchGames = async (signal) => {
      try {
        const url = `${URL}/games/`;
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          const dataFailed = await response.json();
          throw new Error(dataFailed.message);
        }

        const dataSuccess = await response.json();
        return dataSuccess;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
        return null;
      }
    };

    if (gameData) {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchGamesData = async () => {
        const gamesData = await fetchGames(signal);
        if (gamesData) {
          const foundRecommendations1 = gamesData.filter(
            (game) =>
              game.genres.includes(gameData.genres[0]) &&
              !game.dlc &&
              game.title !== gameData.title
          );
          const slicedRecommendations1 = foundRecommendations1.slice(0, 4);
          setRecommendations1(slicedRecommendations1);

          const recommendation1Titles = new Set(
            slicedRecommendations1.map((game) => game.title)
          );

          const foundRecommendations2 = gamesData.filter(
            (game) =>
              game.genres.includes(gameData.genres[1]) &&
              !game.dlc &&
              game.title !== gameData.title &&
              !recommendation1Titles.has(game.title)
          );
          const slicedRecommendations2 = foundRecommendations2.slice(0, 4);
          setRecommendations2(slicedRecommendations2);
        }
      };

      fetchGamesData();

      return () => {
        controller.abort();
        setRecommendations1(null);
        setRecommendations2(null);
      };
    }
  }, [gameData]);

  return (
    <div className="main-wrapper gamepage-wrapper">
      {gameData && (
        <>
          <div className="gamepage-hero">
            <img
              src={gameData.pageThumbnail}
              className="hero-thumbnail"
              alt=""
              loading="eager"
            />
            <img src={gameData.logo} className="hero-logo" alt="" />
            {gameData.trailer.length > 0 && (
              <i
                className="bi bi-play-circle hero-play-button"
                onClick={(e) => handleTrailerModal(e, gameData.trailer[0])}></i>
            )}
            <div className="gamepage-info-container">
              <div className="gamepage-info-inner-wrapper">
                {gameData.discount > 0 && (
                  <div className="discount-tag-wrapper">
                    <p className="discount-tag">-{gameData.discount}%</p>
                  </div>
                )}
                <div className="price-tag-wrapper">
                  <p
                    className="price-tag"
                    style={{
                      color: gameData.discount > 0 ? "gray" : "unset",
                      fontSize: gameData.discount > 0 ? "16px" : "30px",
                      textDecoration:
                        gameData.discount > 0 ? "line-through" : "unset",
                    }}>
                    {gameData.price === 0
                      ? "Free"
                      : gameData.price.toFixed(2) + " €"}
                  </p>
                  {gameData.discount > 0 && (
                    <p className="price-tag-discount">
                      {" "}
                      {(
                        Math.floor(
                          (gameData.price -
                            (gameData.price * gameData.discount) / 100) *
                            100
                        ) / 100
                      ).toFixed(2) + " €"}
                    </p>
                  )}
                </div>
                <hr />
                <AddToCartBtn
                  className={"btnCart"}
                  game={gameData}
                  text={
                    <>
                      <i className="bi bi-cart-plus"></i>
                      <p>
                        {language === "en" ? "Add to Cart" : "In den Warenkorb"}
                      </p>
                    </>
                  }
                />
                <BuyNowBtn
                  className={"btnBuy"}
                  game={gameData}
                  text={
                    <>
                      <p>{language === "en" ? "Buy now" : "Jetzt kaufen"}</p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
          <div className="gamepage-hero-info">
            <h2 className="gamepage-title">{gameData.title}</h2>
            <div className="gamepage-sub-info">
              <p>
                {gameData.rating > 0 && (
                  <i
                    className="bi bi-star-fill"
                    style={{ fontSize: "12px" }}></i>
                )}
                <span>
                  {gameData.rating > 0
                    ? `${gameData.rating} / 5`
                    : `${
                        language === "en"
                          ? "Awaiting more ratings"
                          : "Warte auf weitere Bewertungen"
                      }`}
                </span>
              </p>
              <hr />
              <div className="gamepage-platform-wrapper">
                {gameData.platforms.map((platform, index) => (
                  <i
                    key={index}
                    className={`bi bi-${
                      platform === "ios"
                        ? "apple"
                        : platform === "linux"
                        ? "ubuntu"
                        : platform
                    }`}
                    style={{ fontSize: "14px" }}></i>
                ))}
              </div>
              <hr />
              <div className="gamepage-language-wrapper">
                {gameData.languages.length < 2 && (
                  <p>{gameData.languages[0]}</p>
                )}
                {gameData.languages.length > 2 &&
                  gameData.languages.slice(0, 2).map((language, index) => (
                    <p className="language-tag" key={index}>
                      {language}
                    </p>
                  ))}
                {gameData.languages.length > 2 && (
                  <p>
                    & {gameData.languages.length - 2}
                    {language === "en" ? " more" : " weitere"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Swiper
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={4}
            loop={false}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="gamepage-swiper">
            {gameData.trailer.length > 0 &&
              gameData.trailer.map((trailer, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="gamepage-swiper-trailer-wrapper"
                    onClick={(e) => handleTrailerModal(e, trailer)}>
                    <img
                      className="gamepage-swiper-img"
                      src={`https://img.youtube.com/vi/${trailer}/hqdefault.jpg`}
                      alt=""
                    />
                    <i className="bi bi-play-circle gamepage-play-button"></i>
                  </div>
                </SwiperSlide>
              ))}
            {gameData.pics.length > 0 &&
              gameData.pics.map((pic, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="gamepage-swiper-img-wrapper"
                    onClick={(e) => handleImageModal(e, pic)}>
                    <img className="gamepage-swiper-img" src={pic} alt="" />
                  </div>
                </SwiperSlide>
              ))}
            <div className="slider_controller">
              <div className="swiper-button-prev arrow-left">
                <i className="fas fa-chevron-left"></i>
              </div>
              <div className="swiper-button-next arrow-right">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Swiper>
          <div className="gamepage-description-info-wrapper">
            <div className="gamepage-description-left">
              <div className="header-container">
                <p className="header-left">
                  {language === "en" ? "Description" : "Beschreibung"}
                </p>
                <hr className="header-hr" />
              </div>
              {gameData.earlyAccess && (
                <div className="earlyAccess-wrapper">
                  <div>
                    <p className="earlyAccess-title">
                      {language === "en"
                        ? "This game is currently in Early Access."
                        : "Dieses Spiel befindet sich derzeit im Early Access."}
                    </p>
                    <ul>
                      <li>
                        <NavLink
                          className="earlyAccess-link"
                          to={`/help/games_in_development_faq`}
                          rel="norefferer noopener">
                          {language === "en"
                            ? "Learn more about early access."
                            : "Erfahre mehr über Early Access-Spiele."}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="earlyAccess-link"
                          to={`/forum/${slugify(gameData.title, "_")}`}
                          rel="norefferer noopener">
                          {language === "en"
                            ? "Visit the forums and learn more about this game."
                            : "In unseren Foren findest du mehr zu diesem Spiel."}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="gear-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="70"
                      height="70"
                      fill=""
                      class="bi bi-gear-wide"
                      viewBox="0 0 16 16">
                      <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-tools"
                      viewBox="0 0 16 16">
                      <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="description-content">
                {Array.isArray(gameData.description) &&
                  gameData.description.map((item, index) => {
                    const key = Object.keys(item)[0];
                    if (key === "bannerGif") {
                      return (
                        <video
                          key={"bannerGif" + index}
                          muted
                          preload="auto"
                          loop
                          autoPlay="autoplay">
                          <source
                            src={Object.values(item)[0]}
                            type="video/mp4"
                          />
                        </video>
                      );
                    }
                    if (key === "bannerLink") {
                      return (
                        <Link
                          className="bannerLink"
                          key={"bannerLink" + index}
                          to={Object.values(item)[0].link}
                          rel="noopener norefferer"
                          target="_blank">
                          <img src={Object.values(item)[0].banner} alt="" />
                        </Link>
                      );
                    }
                    if (key === "subHeaderDE" || key === "subHeaderEN") {
                      return (
                        <p className="subHeader" key={"subHeader" + index}>
                          {language === "en"
                            ? Object.values(item)[1]
                            : Object.values(item)[0]}
                        </p>
                      );
                    }
                    if (
                      key === "paragraphHeaderDE" ||
                      key === "paragraphHeaderEN"
                    ) {
                      return (
                        <p
                          className="paragraphHeader"
                          key={"paragraphHeader" + index}>
                          {language === "en"
                            ? Object.values(item)[1]
                            : Object.values(item)[0]}
                        </p>
                      );
                    }
                    if (key === "paragraphDE" || key === "paragraphEN") {
                      return (
                        <p className="paragraph" key={"paragraph" + index}>
                          {language === "en"
                            ? Object.values(item)[1]
                            : Object.values(item)[0]}
                        </p>
                      );
                    }
                    if (key === "bannerDE" || key === "bannerEN") {
                      return (
                        <img
                          key={"banner" + index}
                          src={
                            language === "en"
                              ? Object.values(item)[1]
                              : Object.values(item)[0]
                          }
                          alt=""
                          loading="lazy"
                        />
                      );
                    }
                    if (key === "listDE" || key === "listEN") {
                      const languageList =
                        language === "en" && item.listEN
                          ? item.listEN
                          : item.listDE;
                      return (
                        <ul key={"list" + index} className="gamepage-list">
                          {Array.isArray(languageList) &&
                            languageList.map((listItem, listIndex) => (
                              <li key={"listItem" + listIndex}>
                                {listItem.listItem}
                              </li>
                            ))}
                        </ul>
                      );
                    }
                    if (key === "quoteDE" || key === "quoteEN") {
                      return (
                        <p key={"quote" + index} className="quote">
                          {language === "en"
                            ? Object.values(item)[1]
                            : Object.values(item)[0]}
                        </p>
                      );
                    }
                    if (key === "devQuoteDE" || key === "devQuoteEN") {
                      return (
                        <p
                          key={"devQuote" + index}
                          className="devQuote"
                          dangerouslySetInnerHTML={{
                            __html:
                              language === "en"
                                ? Object.values(item)[1]
                                : Object.values(item)[0],
                          }}
                        />
                      );
                    }
                    if (key === "midQuoteDE" || key === "midQuoteEN") {
                      return (
                        <p
                          key={"midQuote" + index}
                          className="midQuote"
                          dangerouslySetInnerHTML={{
                            __html:
                              language === "en"
                                ? Object.values(item)[1]
                                : Object.values(item)[0],
                          }}
                        />
                      );
                    }
                    if (key === "sectionHR") {
                      return <hr key={"sectionHr" + index} />;
                    }
                    if (key === "boxNoteDE" || key === "boxNoteEN") {
                      return (
                        <div
                          key={"boxNote" + index}
                          className="boxNote-wrapper">
                          <p
                            key={"boxNoteParagraph" + index}
                            className="boxNote"
                            dangerouslySetInnerHTML={{
                              __html:
                                language === "en"
                                  ? Object.values(item)[1]
                                  : Object.values(item)[0],
                            }}></p>
                        </div>
                      );
                    }
                    if (key === "footNote") {
                      return (
                        <small key={"footNote" + index} className="footNote">
                          {Object.values(item)[0]}
                        </small>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
            <div className="gamepage-info-right">
              {mainGame && (
                <>
                  <div className="header-container">
                    <p className="header-left">
                      {language === "en"
                        ? "To play this game you also need"
                        : "Zum Spielen benötigst du außerdem"}
                    </p>
                    <hr className="header-hr" />
                  </div>
                  <div className="game-maingame-container">
                    <NavLink
                      to={`/games/${slugify(mainGame.title, "_")}`}
                      className="game-maingame">
                      <div className="maingame-thumbnail-wrapper">
                        <img src={mainGame.thumbnail} alt="" />
                      </div>
                      <div className="maingame-info-wrapper">
                        <small>{mainGame.title}</small>
                        <div className="maingame-info-pricetags">
                          {mainGame.discount > 0 && (
                            <p
                              className="discount-tag"
                              style={{
                                color: "var(--mainColor)",
                                fontWeight: "bold",
                              }}>
                              -{mainGame.discount}%
                            </p>
                          )}
                          <div className="maingame-pricetags">
                            {mainGame.discount === 0 && (
                              <p>€ {mainGame.price}</p>
                            )}
                            {mainGame.discount > 0 && (
                              <div className="maingame-pricetags-discount">
                                <small
                                  style={{
                                    color: "gray",
                                    textDecoration: "line-through",
                                  }}>
                                  € {mainGame.price}
                                </small>
                                <p>
                                  €{" "}
                                  {Math.floor(
                                    (mainGame.price -
                                      (mainGame.price * mainGame.discount) /
                                        100) *
                                      100
                                  ) / 100}
                                </p>
                              </div>
                            )}
                          </div>
                          <AddToCartBtn
                            className={"btn"}
                            game={mainGame}
                            text={<i className="bi bi-cart-plus"></i>}
                            title={
                              language === "en"
                                ? "Add to cart"
                                : "Zum Warenkorb hinzufügen"
                            }
                          />
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </>
              )}
              <div className="header-container">
                <p className="header-left">
                  {language === "en" ? "Game details" : "Spieldetails"}
                </p>
                <hr className="header-hr" />
              </div>
              <div className="game-details">
                <div className="game-details-row">
                  <p className="game-details-tag">Genre:</p>
                  <div className="game-details-content">
                    {gameData.genres.slice(0, 3).map((genre, index) => (
                      <React.Fragment key={"genre" + index}>
                        <NavLink
                          className="game-details-link"
                          to={`/games?=genres=${slugify(genre, "_")}`}
                          style={{ textUnderlineOffset: "4px" }}>
                          {genre}
                        </NavLink>
                        {index < gameData.genres.length - 1 && (
                          <span className="space-holder2">-</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="game-details-row">
                  <p className="game-details-tag">Tags:</p>
                  <div className="game-details-content">
                    {!openTags &&
                      gameData.tags.slice(0, 5).map((tag, index) => (
                        <React.Fragment key={"tag" + index}>
                          <NavLink
                            className="game-details-link"
                            to={`/games?=tags=${slugify(tag, "_")}`}
                            style={{ textUnderlineOffset: "4px" }}>
                            {tag}
                          </NavLink>
                          {index < gameData.tags.length - 1 && (
                            <span className="space-holder">,</span>
                          )}
                        </React.Fragment>
                      ))}
                    {openTags &&
                      gameData.tags.map((tag, index) => (
                        <React.Fragment key={"tag" + index}>
                          <NavLink
                            className="game-details-link"
                            to={`/games?=tags=${slugify(tag, "_")}`}
                            style={{ textUnderlineOffset: "4px" }}>
                            {tag}
                          </NavLink>
                          {index < gameData.tags.length - 1 && (
                            <span className="space-holder">,</span>
                          )}
                        </React.Fragment>
                      ))}
                    {!openTags && gameData.tags.length > 5 && (
                      <span
                        style={{
                          textTransform: "none",
                          textDecoration: "underline",
                          cursor: "pointer",
                          textUnderlineOffset: "4px",
                        }}
                        onClick={() => setOpenTags((prev) => !prev)}>
                        {language === "en"
                          ? ` show ${gameData.tags.length - 5} more..`
                          : ` zeige ${gameData.tags.length - 5} weitere..`}
                      </span>
                    )}
                  </div>
                </div>
                <div className="game-details-row">
                  <p className="game-details-tag">
                    {language === "en" ? "Works on" : "Läuft auf"}:
                  </p>
                  <div className="game-details-content">
                    {gameData.platforms.map((platform, index) => (
                      <React.Fragment key={"platform" + index}>
                        <p>
                          {platform === "ios"
                            ? "Mac OS"
                            : platform === "windows"
                            ? "Windows (10, 11)"
                            : "Linux"}
                        </p>
                        {index < gameData.platforms.length - 1 && (
                          <span className="space-holder">,</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="game-details-row">
                  <p className="game-details-tag">
                    {language === "en" ? "Release date" : "Veröffentlicht"}:
                  </p>
                  <div className="game-details-content">
                    <p>
                      {format(
                        new Date(gameData.releaseDate),
                        language === "en" ? "MMMM dd, yyyy" : "dd. MMMM, yyyy"
                      )}
                    </p>
                  </div>
                </div>
                <div className="game-details-row">
                  <p className="game-details-tag">
                    {language === "en" ? "Company" : "Entwickler"}:
                  </p>
                  <div className="game-details-content">
                    {gameData.publisher && !gameData.developer && (
                      <NavLink
                        className="game-details-link"
                        style={{ textUnderlineOffset: "4px" }}
                        to={`/games?=publishers=${slugify(
                          gameData.publisher,
                          "-"
                        )}`}>
                        {gameData.publisher}
                      </NavLink>
                    )}
                    {gameData.developer && !gameData.publisher && (
                      <NavLink
                        className="game-details-link"
                        style={{ textUnderlineOffset: "4px" }}
                        to={`/games?=developers=${slugify(
                          gameData.developer,
                          "-"
                        )}`}>
                        {gameData.developer}
                      </NavLink>
                    )}
                    {gameData.developer && gameData.publisher && (
                      <>
                        <NavLink
                          className="game-details-link"
                          to={`/games?=developers=${slugify(
                            gameData.developer,
                            "-"
                          )}`}
                          style={{ textUnderlineOffset: "4px" }}>
                          {gameData.developer}
                        </NavLink>
                        <span className="space-holder2">/</span>
                        <NavLink
                          className="game-details-link"
                          to={`/games?=publishers=${slugify(
                            gameData.publisher,
                            "-"
                          )}`}
                          style={{ textUnderlineOffset: "4px" }}>
                          {gameData.publisher}
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="game-details-row">
                <p className="game-details-tag">Links:</p>
                <div className="game-details-content">
                  <p
                    style={{
                      textTransform: "none",
                      textDecoration: "underline",
                      cursor: "pointer",
                      textUnderlineOffset: "4px",
                    }}
                    onClick={() =>
                      toast.info(
                        language === "en"
                          ? "Under construction.."
                          : "Arbeiten im Gange.."
                      )
                    }>
                    {language === "en" ? "Forum discussion" : "Forum zum Spiel"}
                  </p>
                </div>
              </div>
              <div className="game-details-row">
                <p className="game-details-tag">
                  {language === "en" ? "Rating" : "Bewertung"}:
                </p>
                <div
                  className="game-details-content"
                  style={{ justifyContent: "space-between" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      width: "70%",
                      textTransform: "none",
                    }}>
                    {language === "en" ? "USK Rating" : "USK-Einstufung"}:{" "}
                    {gameData.usk}{" "}
                    <span>
                      {gameData.usk === 18
                        ? "(Not approved for young persons aged under 18)"
                        : gameData.usk === 16
                        ? "(Approved for children aged 16 and above)"
                        : gameData.usk === 12
                        ? "(Approved for children aged 12 and above)"
                        : gameData.usk === 6
                        ? "(Approved for children aged 6 and above)"
                        : "(Approved for everyone)"}
                    </span>
                  </p>
                  <img
                    src={
                      gameData.usk === 18
                        ? usk18
                        : gameData.usk === 16
                        ? usk16
                        : gameData.usk === 12
                        ? usk12
                        : gameData.usk === 6
                        ? usk6
                        : usk0
                    }
                    alt=""
                    style={{ width: "40px" }}
                  />
                </div>
              </div>
              <hr />
              <div className="game-details-row">
                <p className="game-details-tag">
                  {language === "en" ? "Game features" : "Spielfunktionen"}:
                </p>
                <div className="game-details-content">
                  <div className="game-functions-tag">
                    {gameData.functions[0] === "Cloud-Speicherstände" ? (
                      <>
                        <i className="bi bi-cloud-upload"></i>
                        <p>
                          {language === "en"
                            ? "Cloud saves"
                            : "Cloud-Speicherstände"}
                        </p>
                      </>
                    ) : gameData.functions[0] === "Einzelspieler" ? (
                      <>
                        <i className="bi bi-person"></i>
                        <p>
                          {language === "en"
                            ? "Single-player"
                            : "Einzelspieler"}
                        </p>
                      </>
                    ) : gameData.functions[0] === "Mehrspieler" ? (
                      <>
                        <i className="bi bi-people"></i>
                        <p>
                          {language === "en" ? "Multi-player" : "Mehrspieler"}
                        </p>
                      </>
                    ) : gameData.functions[0] === "Ranglisten" ? (
                      <>
                        <i className="bi bi-clipboard2-data"></i>
                        <p>
                          {language === "en" ? "Leaderboards" : "Ranglisten"}
                        </p>
                      </>
                    ) : gameData.functions[0] === "Koop" ? (
                      <>
                        <i className="bi bi-people-fill"></i>
                        <p>{language === "en" ? "Coop" : "Koop"}</p>
                      </>
                    ) : gameData.functions[0] === "crossplatform" ? (
                      <>
                        <i className="bi bi-globe"></i>
                        <p>
                          {language === "en"
                            ? "Crossplatform"
                            : "Crossplatform"}
                        </p>
                      </>
                    ) : gameData.functions[0] === "Controller-Unterstützung" ? (
                      <>
                        <i className="bi bi-controller"></i>
                        <p>
                          {language === "en"
                            ? "Controller support"
                            : "Controller-Unterstützung"}
                        </p>
                      </>
                    ) : gameData.functions[0] === "Erfolge" ? (
                      <>
                        <i className="bi bi-trophy"></i>
                        <p>{language === "en" ? "Achievments" : "Erfolge"}</p>
                      </>
                    ) : gameData.functions[0] === "Einblendungen" ? (
                      <>
                        <i className="bi bi-aspect-ratio"></i>
                        <p>{language === "en" ? "Overlay" : "Einblendungen"}</p>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="game-functions-content">
                {gameData.functions.slice(1).map((functions, index) => (
                  <div key={"row" + index} className="game-details-row">
                    <p className="game-details-tag-link" />
                    <div
                      className="game-functions-tag"
                      key={"function" + index}>
                      {functions === "Cloud-Speicherstände" ? (
                        <>
                          <i className="bi bi-cloud-upload"></i>
                          <p>
                            {language === "en"
                              ? "Cloud saves"
                              : "Cloud-Speicherstände"}
                          </p>
                        </>
                      ) : functions === "Einzelspieler" ? (
                        <>
                          <i className="bi bi-person"></i>
                          <p>
                            {language === "en"
                              ? "Single-player"
                              : "Einzelspieler"}
                          </p>
                        </>
                      ) : functions === "Mehrspieler" ? (
                        <>
                          <i className="bi bi-people"></i>
                          <p>
                            {language === "en" ? "Multi-player" : "Mehrspieler"}
                          </p>
                        </>
                      ) : functions === "Ranglisten" ? (
                        <>
                          <i className="bi bi-clipboard2-data"></i>
                          <p>
                            {language === "en" ? "Leaderboards" : "Ranglisten"}
                          </p>
                        </>
                      ) : functions === "Koop" ? (
                        <>
                          <i className="bi bi-people-fill"></i>
                          <p>{language === "en" ? "Coop" : "Koop"}</p>
                        </>
                      ) : functions === "crossplatform" ? (
                        <>
                          <i className="bi bi-globe"></i>
                          <p>
                            {language === "en"
                              ? "Crossplatform"
                              : "Crossplatform"}
                          </p>
                        </>
                      ) : functions === "Controller-Unterstützung" ? (
                        <>
                          <i className="bi bi-controller"></i>
                          <p>
                            {language === "en"
                              ? "Controller support"
                              : "Controller-Unterstützung"}
                          </p>
                        </>
                      ) : functions === "Erfolge" ? (
                        <>
                          <i className="bi bi-trophy"></i>
                          <p>{language === "en" ? "Achievments" : "Erfolge"}</p>
                        </>
                      ) : functions === "Einblendungen" ? (
                        <>
                          <i className="bi bi-aspect-ratio"></i>
                          <p>
                            {language === "en" ? "Overlay" : "Einblendungen"}
                          </p>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="game-details-row">
                <p className="game-details-tag">
                  {language === "en" ? "Languages" : "Sprachen"}:
                </p>
                <div className="game-details-content">
                  <p className="game-functions-tag">{gameData.languages[0]}</p>
                </div>
              </div>
              <div className="game-functions-content">
                {gameData.languages.slice(1).map((language, index) => (
                  <div key={"row2" + index} className="game-details-row">
                    <p className="game-details-tag-link" />
                    <p className="game-functions-tag" key={"function" + index}>
                      {language}
                    </p>
                  </div>
                ))}
              </div>
              {gameData.dlcs.length > 0 && (
                <>
                  <div className="header-container">
                    <p className="header-left">
                      {language === "en" ? "DLCs" : "DLCs"}
                    </p>
                    <hr className="header-hr" />
                  </div>
                  <div className="game-dlc-container">
                    {gameDLCS.map((dlc, index) => (
                      <NavLink
                        to={`/games/${slugify(dlc.title, "_")}`}
                        key={"dlc" + index}
                        className="game-dlc">
                        <div className="dlc-thumbnail-wrapper">
                          <img src={dlc.thumbnail} alt="" />
                        </div>
                        <div className="dlc-info-wrapper">
                          <small>{dlc.title}</small>
                          <div className="dlc-info-pricetags">
                            {dlc.discount > 0 && (
                              <p
                                className="discount-tag"
                                style={{
                                  color: "var(--mainColor)",
                                  fontWeight: "bold",
                                }}>
                                -{dlc.discount}%
                              </p>
                            )}
                            <div className="dlc-pricetags">
                              {dlc.discount === 0 && <p>€ {dlc.price}</p>}
                              {dlc.discount > 0 && (
                                <>
                                  <small
                                    style={{
                                      color: "gray",
                                      textDecoration: "line-through",
                                    }}>
                                    € {dlc.price}
                                  </small>
                                  <p>
                                    €{" "}
                                    {Math.floor(
                                      (dlc.price -
                                        (dlc.price * dlc.discount) / 100) *
                                        100
                                    ) / 100}
                                  </p>
                                </>
                              )}
                            </div>
                            <AddToCartBtn
                              className={"btn"}
                              game={dlc}
                              text={<i className="bi bi-cart-plus"></i>}
                              title={
                                language === "en"
                                  ? "Add to cart"
                                  : "Zum Warenkorb hinzufügen"
                              }
                            />
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="gamepage-recommendation-wrapper">
            <div className="header-container">
              <p className="header-left">
                {language === "en"
                  ? "You may like these products"
                  : "Das könnt dir auch gefallen"}
              </p>
              <hr className="header-hr" />
            </div>
            <div className="recommendations-wrapper">
              {recommendations1 && recommendations2 && (
                <>
                  <div className="recommendations1-container">
                    {recommendations1.map((game, index) => (
                      <NavLink
                        key={"gamelink" + index}
                        to={`/games/${slugify(game.title, "_")}`}
                        className="game-card">
                        <div className="game-card-thumbnail-wrapper">
                          <img src={game.thumbnail} alt="" />
                        </div>
                        <div className="game-card-info-wrapper">
                          <div className="game-card-title-wrapper">
                            <p>{game.title}</p>
                          </div>
                          <div className="game-card-pricetags-wrapper">
                            {game.discount > 0 && (
                              <p className="discount-tag">-{game.discount}%</p>
                            )}
                            <div className="price-discount-wrapper">
                              {game.discount > 0 && (
                                <small
                                  style={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                  }}>
                                  {game.price} €
                                </small>
                              )}
                              <p>
                                {game.discount > 0
                                  ? Math.floor(
                                      (game.price -
                                        (game.price * game.discount) / 100) *
                                        100
                                    ) / 100
                                  : game.price}{" "}
                                €
                              </p>
                            </div>
                            <AddToCartBtn
                              className={"btn"}
                              game={game}
                              text={<i className="bi bi-cart-plus"></i>}
                              title={
                                language === "en"
                                  ? "Add to cart"
                                  : "Zum Warenkorb hinzufügen"
                              }
                            />
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                  <div className="recommendations2-container">
                    {recommendations2.map((game, index) => (
                      <NavLink
                        key={"gamelink2" + index}
                        to={`/games/${slugify(game.title, "_")}`}
                        className="game-card">
                        <div className="game-card-thumbnail-wrapper">
                          <img src={game.thumbnail} alt="" />
                        </div>
                        <div className="game-card-info-wrapper">
                          <div className="game-card-title-wrapper">
                            <p>{game.title}</p>
                          </div>
                          <div className="game-card-pricetags-wrapper">
                            {game.discount > 0 && (
                              <p className="discount-tag">-{game.discount}%</p>
                            )}
                            <div className="price-discount-wrapper">
                              {game.discount > 0 && (
                                <small
                                  style={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                  }}>
                                  {game.price} €
                                </small>
                              )}
                              <p>
                                {game.discount > 0
                                  ? Math.floor(
                                      (game.price -
                                        (game.price * game.discount) / 100) *
                                        100
                                    ) / 100
                                  : game.price}{" "}
                                €
                              </p>
                            </div>
                            <AddToCartBtn
                              className={"btn"}
                              game={game}
                              text={<i className="bi bi-cart-plus"></i>}
                              title={
                                language === "en"
                                  ? "Add to cart"
                                  : "Zum Warenkorb hinzufügen"
                              }
                            />
                          </div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
