import Logo from "../../assets/pixelPlaza.webp";
import "./footer.scss";
import { NavLink } from "react-router-dom";

import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-top-row">
          <div className="text-left">
            <p>{language === "en" ? "Redeem code" : "Code einlösen"}</p>
            <p>{language === "en" ? "Contact us" : "Kontakt"}</p>
            <p>{language === "en" ? "Career opportunities" : "Jobs"}</p>
            <p>
              {language === "en" ? "Submit your game" : "Dein Spiel einreichen"}
            </p>
            <p>Blog</p>
          </div>
          <div className="icons-right">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-twitch"></i>
          </div>
        </div>
        <div className="footer-mid-row">
          <NavLink to="/" className="logo-wrapper">
            <img src={Logo} alt="logo" />
          </NavLink>
          <div className="sprache-währung-wrapper">
            <div className="sprache-wrapper">
              <p>{language === "en" ? "Language:" : "Sprache:"}</p>
              <p
                onClick={toggleLanguage}
                style={{
                  color: `${language === "en" ? "#f85525" : "var(--mainColor"}`,
                  fontWeight: `${language === "en" ? "bold" : "normal"}`,
                }}>
                English
              </p>
              <p
                onClick={toggleLanguage}
                style={{
                  color: `${language === "de" ? "#f85525" : "var(--mainColor"}`,
                  fontWeight: `${language === "de" ? "bold" : "normal"}`,
                }}>
                Deutsch
              </p>
              <p>Français</p>
              <p>Polski</p>
              <p>Pусский</p>
              <p style={{ width: "max-content" }}>中文简体</p>
            </div>
            <div className="währung-wrapper">
              <p>{language === "en" ? "Currency:" : "Währung:"} </p>
              <p
                onClick={toggleLanguage}
                style={{
                  color: "#f85525",
                  fontWeight: "bold",
                }}>
                EUR
              </p>
              <p>USD</p>
            </div>
          </div>
          <div className="download-btn-wrapper">
            <button className="download-btn">
              <i className="bi bi-download"></i>
              <div className="btn-text-wrapper">
                <p className="upper-text">
                  {language === "en"
                    ? "Download PIXEL Plaza"
                    : "PIXEL Plaza herunterladen"}
                </p>
                <p>{language === "en" ? "for windows" : "für windows"}</p>
              </div>
            </button>
          </div>
        </div>
        <div className="footer-bot-row">
          <div className="left-wrapper">
            <div className="links">
              <p>{language === "en" ? "legal" : "Rechtliches"}</p>
              <p>
                {language === "en" ? "Privacy policy" : "Datenschutzrichtlinie"}
              </p>
              <p>{language === "en" ? "Our thanks" : "Wir sagen Danke!"}</p>
              <p>
                {language === "en"
                  ? "Cookie Declaration"
                  : "Erklärung zu cookies"}
              </p>
              <p>{language === "en" ? "Imprint" : "Impressum"}</p>
            </div>
            <div className="text-left-bottom">
              <p>
                {language === "en"
                  ? "© PIXEL PLAZA sp. z o.o. All rights reserved. All trademarks and registered trademarks are the property of their respective owners."
                  : "© PIXEL PLAZA sp. z o.o. Alle Rechte vorbehalten. Alle Markenzeichen und eingetragenen Markenzeichen sind Eigentum ihrer jeweiligen Besitzer."}
              </p>
            </div>
          </div>
          <div className="text-right">
            {language === "en"
              ? "Part of KEKW Group."
              : "Teil der KEKW Gruppe."}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
