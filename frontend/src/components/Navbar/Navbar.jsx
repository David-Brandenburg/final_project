import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ScreenModeContext } from "../../contexts/ScreenModeContext.js";
import { ModalContext } from "../../contexts/ModalContext.js";
import Logo from "../../assets/pixelPlaza.webp";
import "./navbar.scss";
import Login from "../Navbar/Login.jsx";
import { set } from "date-fns";

const Navbar = () => {
  const {
    openModalBlocker,
    setOpenModalBlocker,
    openSearch,
    setOpenSearch,
    openCart,
    setOpenCart,
    openLoginModal,
    setOpenLoginModal,
  } = useContext(ModalContext);
  const { screenMode, setScreenMode } = useContext(ScreenModeContext);

  const cartItems = ["Assassins Creed", "Cyberpunk"];
  const cIL = cartItems.length;

  const handleOpenSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (openCart && openModalBlocker) {
      setOpenCart(false);
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
  };

  const handleOpenCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (openSearch && openModalBlocker) {
      setOpenSearch(false);
    } else {
      setOpenModalBlocker((prev) => !prev);
    }
    setOpenCart((prev) => !prev);
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ((openSearch || openCart) && openModalBlocker) {
      setOpenSearch(false);
      setOpenCart(false);
    } else {
      setOpenModalBlocker((prev) => !prev);
    }
    setOpenLoginModal((prev) => !prev);
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

  return (
    <nav>
      <div className="nav-wrapper" onClick={handleCloseAll}>
        <div className="nav-left">
          <NavLink to="/" className="logo-wrapper">
            <img src={Logo} alt="logo" />
          </NavLink>
          {!openSearch && (
            <div className="item-wrapper">
              <NavLink to="/games" className="nav-link" title="navlink">
                Spiele
              </NavLink>
              <NavLink to="/infos" className="nav-link" title="navlink">
                Infos
              </NavLink>
              <NavLink to="/forum" className="nav-link" title="navlink">
                Forum
              </NavLink>
              <NavLink to="/help" className="nav-link" title="navlink">
                Hilfe
              </NavLink>
              <p className="nav-link" onClick={handleOpenLogin}>
                Einloggen
                {openLoginModal && <Login />}
              </p>
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
            </small>{" "}
            {/* Cart Count */}
            {openCart && (
              <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <p>Cart Modal</p>
              </div>
            )}
          </div>
          <div className="screenmode-wrapper" onClick={handleScreenMode}>
            {screenMode === "light" ? (
              <i className="bi bi-moon"></i>
            ) : (
              <i className="bi bi-brightness-high"></i>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
