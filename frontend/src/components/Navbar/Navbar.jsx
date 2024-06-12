import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ScreenModeContext } from "../../contexts/ScreenModeContext.js";
import { ModalContext } from "../../contexts/ModalContext.js";
import { AddtoCardContext } from "../../contexts/AddtoCardContext.js";
import Logo from "../../assets/pixelPlaza.webp";
import "./navbar.scss";
import Login from "../Navbar/Login.jsx";
import GameModal from "./GameModal.jsx";
import CartModal from "./CartModal.jsx";
import { LogginContext } from "../../contexts/LogginContext.js";
import { toast } from "react-toastify";
import defaultPic from "../../assets/defaultProfilepic.webp";
import { useLanguage } from "../../contexts/LanguageContext.js";

const Navbar = ({ profilePicChange, setProfilePicChange }) => {
	const [navAvatar, setNavAvatar] = useState(localStorage.getItem("profilePic"))
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
  } = useContext(ModalContext);
  const { screenMode, setScreenMode } = useContext(ScreenModeContext);
  const { cart } = useContext(AddtoCardContext);
  const { loggedInUser, isLoggedIn, setLoggedInUser, setIsLoggedIn } =
    useContext(LogginContext);
  const { language, toggleLanguage } = useLanguage();

  const cIL = cart.length;

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
  };

  const handleOpenCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ((openSearch || openLoginModal || openGameModal) && openModalBlocker) {
      setOpenSearch(false);
      setOpenLoginModal(false);
      setOpenGameModal(false);
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
    setTimeout(() => {
      setLoggedInUser({
        benutzername: "",
        email: "",
        id: "",
        profilePic: "",
        token: "",
      });
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
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
    const gamesLink = document.getElementById("gamesLink");
    gamesLink.addEventListener("mouseover", (e) => {
      e.stopPropagation();
      e.preventDefault();
      setOpenGameModal(true);
      setOpenModalBlocker(true);
      setOpenSearch(false);
      setOpenCart(false);
      setOpenLoginModal(false);
    });

    return () => {
      gamesLink.addEventListener("mouseout", (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpenGameModal(false);
        setOpenModalBlocker(false);
      });
    };
  }, []);

	useEffect(() => {
		setNavAvatar(localStorage.getItem("profilePic"))
		setProfilePicChange(false)
	}, [loggedInUser, profilePicChange])

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
                <NavLink to="/games" className="nav-link" title="navlink">
                  {language === "en" ? "Store" : "Spiele"}
                </NavLink>
                {openGameModal && <GameModal />}
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
                  <img className="nav-link-profile-img" src={ navAvatar ? navAvatar : defaultPic } alt="" />
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
            <input
              type="text"
              className="nav-search"
              name="search"
              id="search"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div className="nav-right">
          <div className="search-wrapper" onClick={handleOpenSearch}>
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
