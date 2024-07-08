import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ScreenModeContext } from "./contexts/ScreenModeContext.js";
import { ModalContext } from "./contexts/ModalContext.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import GamesPage from "./pages/StorePage/StorePage.jsx";
import GamePage from "./pages/StorePage/GamePage.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.scss";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import { LogginContext } from "./contexts/LogginContext.js";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.jsx";
import AdminEditModal from "./components/AdminModals/AdminEditModal.jsx";
import AdminDeleteModal from "./components/AdminModals/AdminDeleteModal.jsx";
import GamePageImageModal from "./components/GamePageModals/GamePageImageModal.jsx";
import GamePageTrailerModal from "./components/GamePageModals/GamePageTrailerModal.jsx";
import EmailValidPage from "./pages/EmailValidPage/EmailValidPage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";

function App() {
  const [profilePicChange, setProfilePicChange] = useState(false);
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
    adminDeleteModal,
    setAdminDeleteModal,
    openImageModal,
    setOpenImageModal,
    openTrailerModal,
    setOpenTrailerModal,
  } = useContext(ModalContext);

  const { loggedInUser, isLoggedIn } = useContext(LogginContext);

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
    if (adminEditModal) {
      setAdminEditModal("");
    }
    if (adminDeleteModal) {
      setAdminDeleteModal("");
    }
    if (openImageModal) {
      setOpenImageModal("");
    }
    if (openTrailerModal) {
      setOpenTrailerModal("");
    }
  };

  return (
    <>
      <Navbar
        profilePicChange={profilePicChange}
        setProfilePicChange={setProfilePicChange}
      />
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
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <ProfilePage setProfilePicChange={setProfilePicChange} />
              ) : (
                <ErrorPage />
              )
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:title" element={<GamePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/checkout"
            element={isLoggedIn ? <CheckoutPage /> : <ErrorPage />}
          />
          <Route path="/email-verify" element={<EmailValidPage />} />
        </Routes>
      </main>
      <Footer />
      {openModalBlocker && (
        <div className="modal-blocker" onClick={handleModalClose}>
          {adminEditModal && <AdminEditModal />}
          {adminDeleteModal && <AdminDeleteModal />}
          {openImageModal && <GamePageImageModal />}
          {openTrailerModal && <GamePageTrailerModal />}
        </div>
      )}
    </>
  );
}

export default App;
