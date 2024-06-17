import { useLanguage } from "../../contexts/LanguageContext";
import { LogginContext } from "../../contexts/LogginContext";
import { useEffect, useState, useContext } from "react";
import RangeSlider from "react-range-slider-input";
import GamesModal from "../../components/HomePage/GamesModal";
import "react-range-slider-input/dist/style.css";
import "./gamespage.scss";

const GamesPage = () => {
  const { language } = useLanguage();
  const { isLoggedIn } = useContext(LogginContext);
  const [games, setGames] = useState([]);
  const [showDLC, setShowDLC] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showReleaseState, setShowReleaseState] = useState(false);
  const [iconChange, setIconChange] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("120");
  const [inputValueMin, setInputValueMin] = useState(minPrice);
  const [inputValueMax, setInputValueMax] = useState(maxPrice);
  const [hoveredGame, setHoveredGame] = useState(null);
  const [filterCondition, setFilterCondition] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemsSort, setSelectedItemsSort] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const items = ["Price", "Release Date", "Title"];

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:3001/games");
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleReduzierteTitle = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "DISCOUNTED" ? "ALL" : "DISCOUNTED"
    );
  };

  const handleDLCFilter = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "DLC" ? "ALL" : "DLC"
    );
  };

  const filteredGames = games.filter((game) => {
    if (filterCondition === "DISCOUNTED") {
      return game.price < 10;
    } else if (filterCondition === "DLC") {
      return game.DLC;
    } else if (filterCondition === "PRICE_RANGE") {
      return game.price >= minPrice && game.price <= maxPrice;
    } else {
      return true;
    }
  });

  const handleModal = (method) => {
    if (method === "DLC") {
      setShowDLC((prevState) => !prevState);
      setIconChange((prevState) => (prevState === "DLC" ? "" : "DLC"));
    } else if (method === "PriceRange") {
      setShowPriceRange((prevState) => !prevState);
      setIconChange((prevState) =>
        prevState === "PriceRange" ? "" : "PriceRange"
      );
    } else if (method === "ReleaseState") {
      setShowReleaseState((prevState) => !prevState);
      setIconChange((prevState) =>
        prevState === "ReleaseState" ? "" : "ReleaseState"
      );
    } else {
      setShowDLC(false);
      setShowPriceRange(false);
      setShowReleaseState(false);
      setIconChange("");
    }
  };

  const handlePriceRangeChange = (value) => {
    const [min, max] = value;
    setMinPrice(adjustValue(min));
    setMaxPrice(adjustValue(max));
    setInputValueMin(minPrice);
    setInputValueMax(maxPrice);
    setFilterCondition("PRICE_RANGE");
  };

  const handleInputFocus = (e) => {
    const { id } = e.target;
    if (id === "minPriceInput") {
      setInputValueMin(""); // Set default value or initial value
    } else if (id === "maxPriceInput") {
      setInputValueMax(""); // Set default value or initial value
    }
  };

  const handlePriceInput = (event) => {
    const { id } = event.target;
    if (id === "minPriceInput") {
      setInputValueMin(event.target.value);
    } else if (id === "maxPriceInput") {
      setInputValueMax(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setMinPrice(inputValueMin);
      setMaxPrice(inputValueMax);
      setFilterCondition("PRICE_RANGE");
    }
  };

  const adjustValue = (value) => {
    if (value <= "25") {
      return Math.round(value);
    } else if (value <= "50") {
      return Math.round(value / 5) * 5;
    } else if (value <= "100") {
      return Math.round(value / 10) * 10;
    }
    return value === "" ? "" : parseFloat(value);
  };

  const handleMouseEnter = (game) => {
    setHoveredGame(game);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedItemsSort((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="main-wrapper gamespage-wrapper">
      <div className="gamespage-header-wrapper">
        <h1>
          {language === "en" ? "PC games / All Games" : " Alle Spiele"}
          <span> ({filteredGames.length})</span>
        </h1>
        <div className="gamespage-header-search">
          <i className="bi bi-search"></i>
          <input
            type="search"
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
                <input type="checkbox" onChange={handleReduzierteTitle} />
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
                onChange={() => handleModal("DLC")}
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
                    <input type="checkbox" onChange={handleDLCFilter} />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? "Hide DLCs and extras"
                      : " DLCs und Extras ausblenden"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" />
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
                      max={120}
                      defaultValue={[minPrice, maxPrice]}
                      step={1}
                      onInput={handlePriceRangeChange}
                    />
                  </div>
                  <div className="gamespage-main-filter-result-wrapper">
                    <input
                      type="text"
                      id="minPriceInput"
                      className="gamespage-main-filter-result-min"
                      value={inputValueMin}
                      onFocus={handleInputFocus}
                      onChange={handlePriceInput}
                      onKeyDown={handleKeyDown}
                    />
                    -
                    <input
                      type="text"
                      id="maxPriceInput"
                      className="gamespage-main-filter-result-min"
                      value={inputValueMax}
                      onFocus={handleInputFocus}
                      onChange={handlePriceInput}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
                <ul>
                  <li className="gamespage-main-filter-li">
                    <label className="square-checkbox">
                      <input type="checkbox" disabled />
                      <span className="checkmark"></span>
                      {language === "en"
                        ? "Show only free games"
                        : "Nur kostenlose Spiele anzeigen"}
                    </label>
                  </li>
                </ul>
              </>
            )}
            <li className="gamespage-main-filter-li">
              <input
                type="checkbox"
                id="checkbox3"
                onChange={() => handleModal("ReleaseState")}
              />
              <label htmlFor="checkbox3">
                {iconChange === "ReleaseState" ? (
                  <i className="bi bi-arrow-down-circle"></i>
                ) : (
                  <i className="bi bi-arrow-right-circle"></i>
                )}
              </label>
              <span className="checkmark"></span>
              {language === "en"
                ? " Release Status"
                : " Veröffentlichungsstatus"}{" "}
            </li>
            {showReleaseState && (
              <>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" disabled />
                    <span className="checkmark"></span>
                    {language === "en" ? " New arrivals" : " Neuankömmlinge"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" disabled />
                    <span className="checkmark"></span>
                    {language === "en" ? " Upcoming games" : " Bald"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" disabled />
                    <span className="checkmark"></span>
                    {language === "en" ? " Early access" : " Early Access"}
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
              </>
            )}
          </ul>
        </div>
        <div className="gamespage-main-games-wrapper">
          <div className="gamespage-main-games-header">
            <div className="gamespage-main-games-header-left-pagination">
              <i class="bi bi-caret-left"></i>
              <i class="bi bi-caret-right"></i>
            </div>
            <div className="gamespage-main-games-header-middle">
              <div className="gamespage-main-games-header-middle-sort-wrapper">
                {language === "en" ? "Sort by:" : "Sortieren nach:"}
                <div className="gamespage-main-games-header-middle-sort">
                  {selectedItemsSort}
                  <i class="bi bi-caret-down" onClick={toggleDropdown}></i>
                </div>
                {isOpen && (
                  <ul className="gamespage-main-games-header-dropdown-list">
                    {items.map((item) => (
                      <li key={item}>
                        <label>
                          <input
                            type="checkbox"
                            value={item}
                            checked={selectedItemsSort.includes(item)}
                            onChange={handleCheckboxChange}
                          />
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div></div>
          </div>
          <div className="gamespage-main-games-middle">
            {filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <div
                  className="gamespage-main-games-middle-gamescard-wrapper"
                  key={game.title + index}>
                  <div
                    className="game-card"
                    onMouseEnter={() => handleMouseEnter(game)}
                    onMouseLeave={handleMouseLeave}>
                    {hoveredGame === game && <GamesModal game={game} />}
                    <div className="game-card-thumbnail-wrapper">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="game-card-thumbnail"
                      />
                    </div>
                    <div className="game-card-content">
                      <h3 className="game-card-title">{game.title}</h3>
                      <p className="game-card-price">{game.price} €</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h3>{language === "en" ? "Error" : "Fehler"}</h3>
                    <p>
                      {language === "en"
                        ? "Something went wrong"
                        : "Etwas ist schief gelaufen"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
