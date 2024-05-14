import { useEffect, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import "./styles/App.scss";
import { ModalContext } from "./contexts/ModalContext.js";
import GamesPage from "./pages/GamesPage/GamesPage.jsx";

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
  } = useContext(ModalContext);

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
  };
  return (
    <>
      <Navbar />
      <ToastContainer
        autoClose={3000}
        theme="dark"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
      {openModalBlocker && (
        <div className="modal-blocker" onClick={handleModalClose}></div>
      )}
    </>
  );
}

export default App;
