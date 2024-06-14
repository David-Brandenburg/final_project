import { useLanguage } from "../../contexts/LanguageContext";
import { LogginContext } from "../../contexts/LogginContext";
import { useEffect, useState, useContext } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./gamespage.scss";

const GamesPage = () => {
  const { language } = useLanguage();
  const { isLoggedIn } = useContext(LogginContext);
  const [games, setGames] = useState([]);
  const [showDLC, setShowDLC] = useState("");
  const [showPriceRange, setShowPriceRange] = useState("");
  const [iconChange, setIconChange] = useState("");
  const [minPrice, setMinPrice] = useState(25);
  const [maxPrice, setMaxPrice] = useState(75);

  const handleModal = (method) => {
    if (method === "DLC") {
      setShowDLC((prevState) => !prevState);
      if (showDLC === true) {
        setIconChange("");
      } else {
        setIconChange("DLC");
      }
    } else if (method === "PriceRange") {
      setShowPriceRange((prevState) => !prevState);
      if (showPriceRange === true) {
        setIconChange("");
      } else {
        setIconChange("PriceRange");
      }
    } else {
      setShowDLC("");
      setIconChange("");
    }
  };

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:3001/games");
      const data = await response.json();
      setGames(data);
      if (response.ok) {
        // console.log("Games fetched successfully");
      }
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handlePriceRangeChange = (value) => {
    const [min, max] = value;
    setMinPrice(adjustValue(min));
    setMaxPrice(adjustValue(max));
    console.log("Min price:", adjustValue(min), "Max price:", adjustValue(max));
  };

  const adjustValue = (value) => {
    if (value <= 25) {
      return Math.round(value); // 1er Schritte
    } else if (value <= 50) {
      return Math.round(value / 5) * 5; // 5er Schritte
    } else {
      return Math.round(value / 10) * 10; // 10er Schritte
    }
  };

  return (
    <div className="gamespage-wrapper">
      <div className="gamespage-header-wrapper">
        <h1>
          {language === "en" ? "PC games / All Games" : " Alle Spiele"}
          <span> ({games.length})</span>
        </h1>
        <div className="gamespage-header-search">
          <i className="bi bi-search"></i>
          <input
            type="search"
            name=""
            id=""
            placeholder={
              language === "en"
                ? "Search store by title, publisher or tag"
                : "Suche im Store nach Titeln, Publishern oder Tags"
            }
          />
        </div>
      </div>
      <div className="gamespage-main-wrapper">
        <div className="gamespage-main-filter-wrapper">
          <ul>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input type="checkbox" disabled />
                <span className="checkmark"></span>
                {language === "en"
                  ? " Show only discounted games"
                  : " Nur reduzierte Title anzeigen"}
              </label>
            </li>
            {isLoggedIn && (
              <>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" disabled />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? " Hide owned games"
                      : " Alle Produkte im Besitz ausblenden"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" disabled />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? " Show only games on my wishlist"
                      : " Nur Spiele von meiner Wunschliste anzeigen"}
                  </label>
                </li>
              </>
            )}
            <li className="gamespage-main-filter-li">
              <input
                type="checkbox"
                id="checkbox1"
                onChange={() => {
                  handleModal("DLC");
                }}
              />
              <label htmlFor="checkbox1">
                {iconChange === "DLC" ? (
                  <i className="bi bi-arrow-down-circle"></i>
                ) : (
                  <i className="bi bi-arrow-right-circle"></i>
                )}
              </label>
              <span className="checkmark"></span>
              {language === "en" ? " DLCs" : " DLCs"}{" "}
            </li>
            {showDLC && (
              <ul>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" disabled />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? "Hide DLCs and extras"
                      : " DLCs und Extras ausblenden"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" disabled />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? "Show only DLCs for my games"
                      : " Nur DLCs für meine Spiele anzeigen"}
                  </label>
                </li>
              </ul>
            )}
            <li className="gamespage-main-filter-li">
              <input
                type="checkbox"
                id="checkbox2"
                onChange={() => handleModal("PriceRange")}
              />
              <label htmlFor="checkbox2">
                {iconChange === "PriceRange" ? (
                  <i className="bi bi-arrow-down-circle"></i>
                ) : (
                  <i className="bi bi-arrow-right-circle"></i>
                )}
              </label>
              <span className="checkmark"></span>
              {language === "en" ? " Price range" : " Preisspanne"}{" "}
            </li>
            {showPriceRange && (
              <>
                <div className="gamespage-main-filter-silder-result-wrapper">
                  <div className="gamespage-main-filter-silder-wrapper">
                    <RangeSlider
                      id="gamespage-main-filter-silder"
                      min={0}
                      max={100}
                      defaultValue={[25, 75]}
                      step={1}
                      onInput={handlePriceRangeChange}
                    />
                  </div>
                  <div className="gamespage-main-filter-result-wrapper">
                    <input
                      type="text"
                      className="gamespage-main-filter-result-min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    -
                    <input
                      type="text"
                      className="gamespage-main-filter-result-min"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>

                <ul>
                  <li className="gamespage-main-filter-li">
                    <label className="square-checkbox">
                      <input type="checkbox" disabled />
                      <span className="checkmark"></span>
                      {language === "en"
                        ? "Show only DLCs for my games"
                        : " Nur DLCs für meine Spiele anzeigen"}
                    </label>
                  </li>
                </ul>
              </>
            )}
          </ul>
        </div>
        <div className="gamespage-main-games-wrapper"></div>
      </div>
    </div>
  );
};

export default GamesPage;
