import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ScreenModeContext } from "../../contexts/ScreenModeContext.js";
import { ModalContext } from "../../contexts/ModalContext.js";
import { AddtoCardContext } from "../../contexts/AddtoCardContext.js";
import { LogginContext } from "../../contexts/LogginContext.js";
import {
  LanguageContext,
  useLanguage,
} from "../../contexts/LanguageContext.js";
import { toast } from "react-toastify";
import Login from "../Navbar/Login.jsx";
import GameModal from "./GameModal.jsx";
import CartModal from "./CartModal.jsx";
import Logo from "../../assets/pixelPlaza.webp";
import defaultPic from "../../assets/defaultProfilepic.webp";
import pixelPlaza from "../../assets/pixelPlaza.webp";
import slugify from "slugify";
import AddToCartBtn from "../AddToCartBtn.jsx";
import "./navbar.scss";

const Navbar = ({ profilePicChange, setProfilePicChange }) => {
  const [navAvatar, setNavAvatar] = useState(
    localStorage.getItem("profilePic")
  );
  const [prefetchedGames, setPrefetchedGames] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filterError, setFilterError] = useState(false);
  const {
    openModalBlocker,
    setOpenModalBlocker,
    openSearch,
    setOpenSearch,
    openCart,
    setOpenCart,
    openLoginModal,
    setOpenLoginModal,
    openGameModal,
    setOpenGameModal,
    adminEditModal,
    setAdminEditModal,
  } = useContext(ModalContext);
  const { screenMode, setScreenMode } = useContext(ScreenModeContext);
  const { cart } = useContext(AddtoCardContext);
  const { loggedInUser, isLoggedIn, setLoggedInUser, setIsAdmin } =
    useContext(LogginContext);
  const { language } = useLanguage();
  const { setInputSearch } = useContext(LanguageContext);
  const gamesLinkRef = useRef(null);
  const cIL = cart.length;
  const URL = process.env.REACT_APP_URL_BACKEND;

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

  const handleOpenSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ((openCart || openLoginModal) && openModalBlocker) {
      setOpenCart(false);
      setOpenLoginModal(false);
    } else {
      setOpenModalBlocker((prev) => !prev);
    }
    setOpenSearch((prev) => !prev);
  };

  const handleCloseAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModalBlocker(false);
    setOpenSearch(false);
    setOpenCart(false);
    setOpenLoginModal(false);
    setOpenGameModal(false);
    setAdminEditModal("");
  };

  const handleOpenCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ((openSearch || openLoginModal || openGameModal) && openModalBlocker) {
      setOpenSearch(false);
      setOpenLoginModal(false);
      setOpenGameModal(false);
    } else if (adminEditModal) {
      setAdminEditModal("");
    } else {
      setOpenModalBlocker((prev) => !prev);
    }
    setOpenCart((prev) => !prev);
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ((openSearch || openCart || openGameModal) && openModalBlocker) {
      setOpenSearch(false);
      setOpenCart(false);
      setOpenGameModal(false);
    } else {
      setOpenModalBlocker((prev) => !prev);
    }
    setOpenLoginModal((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Du wirst ausgeloggt!");
    setIsAdmin(false);
    setTimeout(() => {
      setLoggedInUser({
        benutzername: "",
        email: "",
        id: "",
        token: "",
        googleId: "",
      });
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
			localStorage.setItem("profilePic", "")
    }, 2500);
  };

  const handleScreenMode = (e) => {
    e.preventDefault();
    if (screenMode === "light") {
      setScreenMode("dark");
      localStorage.setItem("screenMode", "dark");
    } else {
      setScreenMode("light");
      localStorage.setItem("screenMode", "light");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      const loginLink = document.getElementById("loginLink");
      loginLink.addEventListener("mouseover", (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpenGameModal(false);
        setOpenModalBlocker(true);
        setOpenSearch(false);
        setOpenCart(false);
        setOpenLoginModal(true);
      });

      return () => {
        loginLink.addEventListener("mouseout", (e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpenLoginModal(false);
          setOpenModalBlocker(false);
        });
      };
    }
  }, []);

  useEffect(() => {
    const gamesLink = gamesLinkRef.current;

    const handleMouseOver = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setOpenGameModal(true);
      setAdminEditModal("");
      setOpenModalBlocker(true);
      setOpenSearch(false);
      setOpenCart(false);
      setOpenLoginModal(false);
    };

    const handleMouseOut = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setOpenGameModal(false);
      setOpenModalBlocker(false);
    };

    if (gamesLink) {
      if (!openSearch) {
        gamesLink.addEventListener("mouseover", handleMouseOver);
        gamesLink.addEventListener("mouseout", handleMouseOut);
      }
    }

    return () => {
      if (gamesLink) {
        gamesLink.removeEventListener("mouseover", handleMouseOver);
        gamesLink.removeEventListener("mouseout", handleMouseOut);
      }
      setFilteredGames(null);
      setPrefetchedGames(null);
    };
  }, [openSearch]);

  useEffect(() => {
    setNavAvatar(localStorage.getItem("profilePic"));
    setProfilePicChange(false);
  }, [loggedInUser, profilePicChange]);

  const handlePrefetch = async (e) => {
    e.preventDefault();
    try {
      const url = `${URL}/games/`;
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        const dataFailed = await response.json();
        throw new Error(dataFailed.message);
      }

      const dataSuccess = await response.json();
      setPrefetchedGames(dataSuccess);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setFilteredGames(null);
      return;
    }

    const filterGames = () => {
      const filterGames = prefetchedGames.filter(
        (game) =>
          game.title.toLowerCase().includes(value) ||
          game.publisher.toLowerCase().includes(value) ||
          game.tags.some((tag) => tag.toLowerCase().includes(value))
      );
      setFilteredGames(filterGames);
    };

    filterGames();
  };

  useEffect(() => {
    if (filteredGames) {
      if (filteredGames.length === 0) {
        setFilterError(true);
      } else {
        setFilterError(false);
      }

      return () => {
        setFilterError(false);
      };
    }
  }, [filteredGames, filterError]);

  return (
    <nav>
      <div className="nav-wrapper" onClick={handleCloseAll}>
        <div className="nav-left">
          <NavLink to="/" className="logo-wrapper">
            <img src={Logo} alt="logo" />
          </NavLink>
          {!openSearch && (
            <div className="item-wrapper">
              <div
                className="dropdown-wrapper"
                id="gamesLink"
                onClick={(e) => {
                  setOpenGameModal(false);
                  setOpenModalBlocker(false);
                  e.stopPropagation();
                }}>
                <NavLink
                  to="/games"
                  className="nav-link"
                  title="navlink"
                  ref={gamesLinkRef}>
                  {language === "en" ? "Games" : "Spiele"}
                  {openGameModal && <GameModal />}
                </NavLink>
              </div>
              <NavLink to="/infos" className="nav-link" title="navlink">
                {language === "en" ? "Infos" : "Infos"}
              </NavLink>
              <NavLink to="/forum" className="nav-link" title="navlink">
                {language === "en" ? "Forum" : "Forum"}
              </NavLink>
              <NavLink to="/help" className="nav-link" title="navlink">
                {language === "en" ? "Help" : "Hilfe"}
              </NavLink>
              {isLoggedIn ? (
                <NavLink to="/profile" className="nav-link">
                  <img
                    className="nav-link-profile-img"
                    src={navAvatar ? navAvatar : defaultPic}
                    alt=""
                  />
                  <p>{loggedInUser.benutzername}</p>
                </NavLink>
              ) : (
                <div className="dropdown-wrapper" id="loginLink">
                  <p className="nav-link" onClick={handleOpenLogin}>
                    Einloggen
                  </p>
                  {openLoginModal && <Login />}
                </div>
              )}
            </div>
          )}
        </div>
        {openSearch && (
          <div className="nav-mid">
            <label htmlFor="search">
              <i className="bi bi-search"></i>
            </label>
            <form
              action="/games"
              onSubmit={(e) => setInputSearch(e.target.value)}
              style={{ width: "1000px" }}>
              <input
                type="text"
                className="nav-search"
                name="search"
                id="search"
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  handleFilter(e);
                  setInputSearch(e.target.value);
                }}
                placeholder="Search for Games, Tags or Publisher"
              />
            </form>
            {filteredGames && (
              <label className="count-games" htmlFor="search">
                <p>{filteredGames.length}</p>
                <p>{language === "en" ? "Games" : "Spiele"}</p>
              </label>
            )}
            {filteredGames && (
              <div className="filtered-games-modal">
                {filteredGames.map((game, index) => (
                  <NavLink
                    key={"filtered-game" + index}
                    to={`/games/${slugify(game.title, "_")}`}
                    className="game-wrapper"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFilteredGames(null);
                      setOpenModalBlocker(false);
                      setOpenSearch(false);
                    }}>
                    <div className="game-thumbnail-wrapper">
                      <img src={game.thumbnail} alt="" />
                    </div>
                    <div className="game-info-wrapper">
                      {game.dlc && <p className="dlc-tag">DLC</p>}
                      <div className="game-title-container">
                        <p className="game-title">{game.title}</p>
                        <small className="game-info">
                          {game.releaseDate.split("-")[0]}, {game?.publisher}
                          {game.developer && ","} {game?.developer}
                        </small>
                      </div>
                    </div>
                    <div className="rating-platform-wrapper">
                      {heartfill(game.rating)}
                      <div className="platform-wrapper">
                        {game.platforms.map((platform) => (
                          <i
                            key={platform}
                            className={`bi bi-${
                              platform === "ios"
                                ? "apple"
                                : platform === "linux"
                                ? "ubuntu"
                                : "windows"
                            } platform`}></i>
                        ))}
                      </div>
                    </div>
                    <div className="price-tag-wrapper">
                      {
                        <p
                          className="discount-tag"
                          style={{
                            background: game.discount > 0 ? "#f85525" : "unset",
                            boxShadow:
                              game.discount > 0
                                ? "0px 0px 3px rgba(0, 0, 0, 0.4)"
                                : "unset",
                          }}>
                          {game.discount > 0 ? `-${game.discount}%` : ""}
                        </p>
                      }
                      <AddToCartBtn
                        className={"btn"}
                        game={game}
                        text={
                          <>
                            <p
                              title={
                                language === "en"
                                  ? "Add to cart"
                                  : "Zum Warenkorb hinzufügen"
                              }
                              className="price-tag">
                              <span>€</span>{" "}
                              {game.discount > 0
                                ? Math.floor(
                                    (game.price -
                                      (game.price * game.discount) / 100) *
                                      100
                                  ) / 100
                                : game.price}
                            </p>
                            {/* <i className="bi bi-cart-plus"></i> */}
                          </>
                        }
                      />
                    </div>
                  </NavLink>
                ))}
                {filterError && (
                  <div className="game-wrapper">
                    <div className="game-thumbnail-wrapper">
                      <img src={pixelPlaza} alt="" />
                    </div>
                    <div className="game-info-wrapper">
                      <div className="game-title-container">
                        <p
                          className="game-title"
                          style={{ fontWeight: "bold" }}>
                          Error 404
                        </p>
                        <small className="game-info">
                          {language === "en"
                            ? "Couldn't find game, publisher or tag!"
                            : "Konnte Spiel, Publisher oder Tag nicht finden!"}
                        </small>
                      </div>
                    </div>
                    <div className="rating-platform-wrapper"></div>
                    <div
                      className="price-tag-wrapper"
                      style={{ justifyContent: "flex-end" }}>
                      <p
                        className="discount-tag"
                        style={{
                          background: "#f85525",
                          width: "40px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                        }}>
                        <i className="bi bi-exclamation-triangle"></i>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div className="nav-right">
          <div
            className="search-wrapper"
            onClick={(e) => {
              handleOpenSearch(e);
              handlePrefetch(e);
            }}>
            <i className={`bi ${!openSearch ? "bi-search" : "bi-x-lg"}`}></i>
          </div>
          <div className="cart-wrapper" onClick={handleOpenCart}>
            <i className="bi bi-cart4"></i>
            <small
              className={`cart-count ${cIL > 0 ? "cart-items" : "cart-empty"}`}
              style={{
                color: cIL > 0 ? "#fff" : "unset",
                background: cIL > 0 ? "#f85525" : "unset",
              }}>
              {cIL}
            </small>
            {/* Cart Count */}
            {openCart && <CartModal />}
          </div>
          <div className="screenmode-wrapper" onClick={handleScreenMode}>
            {screenMode === "light" ? (
              <i className="bi bi-moon"></i>
            ) : (
              <i className="bi bi-brightness-high"></i>
            )}
          </div>
          {isLoggedIn && (
            <div className="logout-wrapper" onClick={handleLogout}>
              <i className="bi bi-door-open"></i>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
