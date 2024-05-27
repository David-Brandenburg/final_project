import { useEffect, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ScreenModeContext } from "./contexts/ScreenModeContext.js";
import { ModalContext } from "./contexts/ModalContext.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import GamesPage from "./pages/GamesPage/GamesPage.jsx";
import GamePage from "./pages/GamesPage/GamePage.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.scss";

function App() {
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

	const { screenMode } = useContext(ScreenModeContext);

  const handleModalClose = (e) => {
    e.preventDefault();
    if (openModalBlocker) {
      setOpenModalBlocker(false);
    }
    if (openSearch) {
      setOpenSearch(false);
    }
    if (openCart) {
      setOpenCart(false);
    }
    if (openLoginModal) {
      setOpenLoginModal(false);
    }
		if (openGameModal) {
			setOpenGameModal(false);
		}
  };
  return (
    <>
      <Navbar />
      <ToastContainer
        autoClose={3000}
        theme={screenMode}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:title" element={<GamePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      {openModalBlocker && (
        <div className="modal-blocker" onClick={handleModalClose} />
      )}
    </>
  );
}

export default App;
