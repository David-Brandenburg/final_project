import React from "react";
import Logo from "../../assets/pixelPlaza.webp";
import "./footer.scss";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-top-row">
          <div className="text-left">
            <p>Code einlösen</p>
            <p>Kontakt</p>
            <p>Jobs</p>
            <p>Dein Spiel einreichen</p>
            <p>Blog</p>
          </div>
          <div className="icons-right">
            <i class="bi bi-facebook"></i>
            <i class="bi bi-twitter"></i>
            <i class="bi bi-twitch"></i>
          </div>
        </div>
        <div className="footer-mid-row">
          <NavLink to="/" className="logo-wrapper">
            <img src={Logo} alt="logo" />
          </NavLink>
          <div className="sprache-währung-wrapper">
            <div className="sprache-wrapper">
              <p>Sprache:</p>
              <p>Englisch</p>
              <p>Deutsch</p>
              <p>Französisch</p>
              <p>Polnisch</p>
              <p>Chinäsisch</p>
              <p>Japanisch</p>
            </div>
            <div className="währung-wrapper">
              <p>Währung: </p>
              <p>EUR</p>
              <p>USD</p>
            </div>
          </div>
          <div className="download-btn-wrapper">
            <button className="download-btn">
              <i class="bi bi-download"></i>
              <div className="btn-text-wrapper">
                <p className="upper-text">PIXEL Plaza herunterladen</p>
                <p>für windows</p>
              </div>
            </button>
          </div>
        </div>
        <div className="footer-bot-row">
          <div className="left-wrapper">
            <div className="links">
              <p>Rechtliches</p>
              <p>Datenschutzrichtlinie</p>
              <p>Wir sagen Danke!</p>
              <p>Erklärung zu cookies</p>
              <p>Impressum</p>
            </div>
            <div className="text-left-bottom">
              <p>
                © GOG sp. z o.o. Alle Rechte vorbehalten. Alle Markenzeichen und
                eingetragenen Markenzeichen sind Eigentum ihrer jeweiligen
                Besitzer.
              </p>
            </div>
          </div>
          <div className="text-right">Teil der KEKW Gruppe.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
