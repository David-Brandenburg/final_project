import React, { useContext, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { LogginContext } from "../../contexts/LogginContext.js";
import RangeSlider from "react-range-slider-input";

const FilterStore = ({
  minPrice,
  setFilterCondition,
  filterCondition,
  setMaxPrice,
  setMinPrice,
  inputTags,
  setInputTags,
  maxPrice,
  minReleaseDate,
  maxReleaseDate,
  setMinReleaseDate,
  setMaxReleaseDate,
}) => {
  const { language } = useLanguage();
  const { isLoggedIn } = useContext(LogginContext);
  const [showDLC, setShowDLC] = useState(false); // Toggle for showing DLC
  const [showPriceRange, setShowPriceRange] = useState(false); // Toggle for showing price range filter
  const [showReleaseState, setShowReleaseState] = useState(false); // Toggle for showing release state filter
  const [showGenres, setShowGenres] = useState(false); // Toggle for showing genres filter
  const [showTags, setShowTags] = useState(false); // Toggle for showing tags filter
  const [showPlatform, setShowPlatform] = useState(false); // Toggle for showing platform filter
  const [showFunctions, setShowFunctions] = useState(false); // Toggle for showing functions filter
  const [showReleaseRange, setShowReleaseRange] = useState(false); // Toggle for showing release date range filter
  const [iconChange, setIconChange] = useState(""); // Manages the icon state for different filters
  const [inputValueMin, setInputValueMin] = useState(minPrice); // Minimum price input value
  const [inputValueMax, setInputValueMax] = useState(maxPrice); // Maximum price input value

  const [inputValueMinRelease, setInputValueMinRelease] =
    useState(minReleaseDate); // Minimum release date input value
  const [inputValueMaxRelease, setInputValueMaxRelease] =
    useState(maxReleaseDate); // Maximum release date input value
  const [showLanguages, setShowLanguages] = useState(false); // Toggle for showing languages filter

  // Handlers for various filter conditions
  const handleReduzierteTitle = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "DISCOUNTED_GENRE" ? "ALL" : "DISCOUNTED_GENRE"
    );
  };

  const handleMyGamesNotShown = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "MYGAMESNOTSHWON" ? "ALL" : "MYGAMESNOTSHWON"
    );
  };

  const handleDLCFilter = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "DLC" ? "ALL" : "DLC"
    );
  };

  const handleNewArrivals = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "NEW_ARRIVALS" ? "ALL" : "NEW_ARRIVALS"
    );
  };

  const handleSoon = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SOON" ? "ALL" : "SOON"
    );
  };

  const handleEarlyAccess = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "EARLY_ACCESS" ? "ALL" : "EARLY_ACCESS"
    );
  };

  const handleOnlyFree = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ONLY_FREE" ? "ALL" : "ONLY_FREE"
    );
  };

  const handleAdventure = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ADVENTURE" ? "ALL" : "ADVENTURE"
    );
  };

  const handleAction = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ACTION" ? "ALL" : "ACTION"
    );
  };

  const handleShooter = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SHOOTER" ? "ALL" : "SHOOTER"
    );
  };

  const handleRPG = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "RPG" ? "ALL" : "RPG"
    );
  };

  const handleSimulation = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SIMULATION" ? "ALL" : "SIMULATION"
    );
  };

  const handleStrategy = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "STRATEGY" ? "ALL" : "STRATEGY"
    );
  };

  const handleTagSearch = (e) => {
    setInputTags(e.target.value);
    setFilterCondition("TAG_SEARCH");
  };

  const handleAdventureTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ADVENTURE_TAG" ? "ALL" : "ADVENTURE_TAG"
    );
  };

  const handleActionTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ACTION_TAG" ? "ALL" : "ACTION_TAG"
    );
  };

  const handleIndieTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "INDIE_TAG" ? "ALL" : "INDIE_TAG"
    );
    console.log(filterCondition);
  };

  const handleFantasyTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "FANTASY_TAG" ? "ALL" : "FANTASY_TAG"
    );
  };

  const handleSpannGeschichteTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SPANN_GESCHICHTE_TAG" ? "ALL" : "SPANN_GESCHICHTE_TAG"
    );
  };

  const handleAtmosphärischTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ATMOSPHÄRISCH_TAG" ? "ALL" : "ATMOSPHÄRISCH_TAG"
    );
  };

  const handleStrategieTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "STRATEGIE_TAG" ? "ALL" : "STRATEGIE_TAG"
    );
  };

  const handleRollenspielTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ROLLENSPIEL_TAG" ? "ALL" : "ROLLENSPIEL_TAG"
    );
  };

  const handle2DTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "2D_TAG" ? "ALL" : "2D_TAG"
    );
  };

  const handleSciFiTag = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SCI_FI_TAG" ? "ALL" : "SCI_FI_TAG"
    );
  };

  const handleWindows = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "WINDOWS" ? "ALL" : "WINDOWS"
    );
  };

  const handleIos = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "MAC" ? "ALL" : "MAC"
    );
  };

  const handleLinux = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "LINUX" ? "ALL" : "LINUX"
    );
  };

  const handleEinzelspieler = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SINGLE_PLAYER" ? "ALL" : "SINGLE_PLAYER"
    );
  };

  const handleErfolge = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ACHIEVEMENTS" ? "ALL" : "ACHIEVEMENTS"
    );
  };

  const handleCloud = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "CLOUD_SAVES" ? "ALL" : "CLOUD_SAVES"
    );
  };

  const handleMultiplayer = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "MULTIPLAYER" ? "ALL" : "MULTIPLAYER"
    );
  };

  const handleController = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "CONTROLLER_SUPPORT" ? "ALL" : "CONTROLLER_SUPPORT"
    );
  };

  const handleEinblendung = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "EINBLENDUNGEN_FUNC" ? "ALL" : "EINBLENDUNGEN_FUNC"
    );
  };

  const handleRanglisten = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "RANGLISTEN" ? "ALL" : "RANGLISTEN"
    );
  };

  const handleKoop = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "COOP" ? "ALL" : "COOP"
    );
  };

  const handleDeutsch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "DEUTSCH" ? "ALL" : "DEUTSCH"
    );
  };

  const handleEnglisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ENGLISH" ? "ALL" : "ENGLISH"
    );
  };

  const handleFranzösisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "FRANÇAIS" ? "ALL" : "FRANÇAIS"
    );
  };

  const handleSpanisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ESPAÑOL" ? "ALL" : "ESPAÑOL"
    );
  };

  const handleItalienisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ITALIANO" ? "ALL" : "ITALIANO"
    );
  };

  const handlePortugiesisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "PORTUGUÊS" ? "ALL" : "PORTUGUÊS"
    );
  };

  const handleRussisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "РУССКИЙ" ? "ALL" : "РУССКИЙ"
    );
  };

  const handleChinesisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "中文简体" ? "ALL" : "中文简体"
    );
  };

  const handleJapanisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "日本語" ? "ALL" : "日本語"
    );
  };

  const handleKoreanisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "한국어" ? "ALL" : "한국어"
    );
  };

  const handleBrasilianisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "PORTUGUÊS_DO_BRASIL" ? "ALL" : "PORTUGUÊS_DO_BRASIL"
    );
  };

  const handleUngarisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "MAGYAR" ? "ALL" : "MAGYAR"
    );
  };

  const handlePolnisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "POLSKI" ? "ALL" : "POLSKI"
    );
  };

  const handleTürkisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "TÜRKÇE" ? "ALL" : "TÜRKÇE"
    );
  };

  const handleTschechisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ČESKÝ" ? "ALL" : "ČESKÝ"
    );
  };

  const handleNiederländisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "NEDERLANDS" ? "ALL" : "NEDERLANDS"
    );
  };

  const handleDänisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "DANSK" ? "ALL" : "DANSK"
    );
  };

  const handleModal = (method) => {
    // Toggles the state of the modal based on the provided method
    if (method === "DLC") {
      setShowDLC((prevState) => !prevState); // Toggle showDLC state
      setIconChange((prevState) => (prevState === "DLC" ? "" : "DLC")); // Toggle icon state for DLC
    } else if (method === "PriceRange") {
      setShowPriceRange((prevState) => !prevState); // Toggle showPriceRange state
      setIconChange(
        (prevState) => (prevState === "PriceRange" ? "" : "PriceRange") // Toggle icon state for PriceRange
      );
    } else if (method === "ReleaseState") {
      setShowReleaseState((prevState) => !prevState); // Toggle showReleaseState state
      setIconChange(
        (prevState) => (prevState === "ReleaseState" ? "" : "ReleaseState") // Toggle icon state for ReleaseState
      );
    } else if (method === "Genres") {
      setShowGenres((prevState) => !prevState); // Toggle showGenres state
      setIconChange((prevState) => (prevState === "Genres" ? "" : "Genres")); // Toggle icon state for Genres
    } else if (method === "Tags") {
      setShowTags((prevState) => !prevState); // Toggle showTags state
      setIconChange((prevState) => (prevState === "Tags" ? "" : "Tags")); // Toggle icon state for Tags
    } else if (method === "Platform") {
      setShowPlatform((prevState) => !prevState); // Toggle showPlatform state
      setIconChange((prevState) =>
        prevState === "Platform" ? "" : "Platform"
      ); // Toggle icon state for Platform
    } else if (method === "Function") {
      setShowFunctions((prevState) => !prevState); // Toggle showFunctions state
      setIconChange((prevState) =>
        prevState === "Function" ? "" : "Function"
      ); // Toggle icon state for Function
    } else if (method === "ReleaseRange") {
      setShowReleaseRange((prevState) => !prevState); // Toggle showReleaseRange state
      setIconChange((prevState) =>
        prevState === "ReleaseRange" ? "" : "ReleaseRange"
      ); // Toggle icon state for ReleaseRange
    } else if (method === "Languages") {
      setShowLanguages((prevState) => !prevState); // Toggle showLanguages state
      setIconChange((prevState) =>
        prevState === "Languages" ? "" : "Languages"
      ); // Toggle icon state for Languages
    } else {
      // Close all modals if method does not match any specific case
      setShowDLC(false);
      setShowPriceRange(false);
      setShowReleaseState(false);
      setShowGenres(false);
      setShowTags(false);
      setShowPlatform(false);
      setShowFunctions(false);
      setShowReleaseRange(false);
      setShowLanguages(false);
      setIconChange("");
    }
  };

  const handlePriceRangeChange = (value) => {
    // Handles changes in the price range slider
    const [min, max] = value; // Destructure the value into min and max
    setMinPrice(adjustValue(min)); // Adjust the min value
    setMaxPrice(adjustValue(max)); // Adjust the max value
    setInputValueMin(minPrice); // Set the input value for min price
    setInputValueMax(maxPrice); // Set the input value for max price
    setFilterCondition("PRICE_RANGE"); // Set the filter condition to PRICE_RANGE
  };

  const handleReleaseDateRangeChange = (value) => {
    // Handles changes in the release date range slider
    const [min, max] = value; // Destructure the value into min and max
    setMinReleaseDate(min); // Adjust the min value
    setMaxReleaseDate(max); // Adjust the max value
    setInputValueMinRelease(minReleaseDate); // Set the input value for min release date
    setInputValueMaxRelease(maxReleaseDate); // Set the input value for max release date
    setFilterCondition("RELEASE_RANGE"); // Set the filter condition to RELEASE_RANGE
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

  const handleInputReleaseFocus = (e) => {
    const { id } = e.target;
    if (id === "minReleaseInput") {
      setInputValueMinRelease(""); // Set default value or initial value
    } else if (id === "maxReleaseInput") {
      setInputValueMaxRelease(""); // Set default value or initial value
    }
  };

  const handleReleaseInput = (event) => {
    const { id } = event.target;
    if (id === "minReleaseInput") {
      setInputValueMinRelease(event.target.value);
    } else if (id === "maxReleaseInput") {
      setInputValueMaxRelease(event.target.value);
    }
  };

  const handleReleaseKeyDown = (event) => {
    if (event.key === "Enter") {
      setMinReleaseDate(inputValueMinRelease);
      setMaxReleaseDate(inputValueMaxRelease);
      setFilterCondition("RELEASE_RANGE");
    }
  };

  return (
    <div className="gamespage-main-filter-wrapper">
      {/* Show filter options */}
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
        {/* Show only if user is logged in */}
        {isLoggedIn && (
          <>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input type="checkbox" onChange={handleMyGamesNotShown} />
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
        {/* Show DLC */}
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
            {isLoggedIn && (
              <li className="gamespage-main-filter-li">
                <label className="square-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  {language === "en"
                    ? "Show only DLCs for my games"
                    : " Nur DLCs für meine Spiele anzeigen"}
                </label>
              </li>
            )}
          </ul>
        )}
        {/* Show price range */}
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
                  <input type="checkbox" onChange={handleOnlyFree} />
                  <span className="checkmark"></span>
                  {language === "en"
                    ? "Show only free games"
                    : "Nur kostenlose Spiele anzeigen"}
                </label>
              </li>
            </ul>
          </>
        )}
        {/* Show release state */}
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
                <input type="checkbox" onChange={handleNewArrivals} />
                <span className="checkmark"></span>
                {language === "en" ? " New arrivals" : " Neuankömmlinge"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input type="checkbox" onChange={handleSoon} />
                <span className="checkmark"></span>
                {language === "en" ? " Upcoming games" : " Bald"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input type="checkbox" onChange={handleEarlyAccess} />
                <span className="checkmark"></span>
                {language === "en" ? " Early access" : " Early Access"}
              </label>
            </li>
            {isLoggedIn && (
              <li className="gamespage-main-filter-li">
                <label className="square-checkbox">
                  <input type="checkbox" disabled />
                  <span className="checkmark"></span>
                  {language === "en"
                    ? "Show only DLCs for my games"
                    : " Nur DLCs für meine Spiele anzeigen"}
                </label>
              </li>
            )}
          </>
        )}
        {/* Show genres */}
        <li className="gamespage-main-filter-li">
          <input
            type="checkbox"
            id="checkbox4"
            onChange={() => handleModal("Genres")}
          />
          <label htmlFor="checkbox4">
            {iconChange === "Genres" ? (
              <i className="bi bi-arrow-down-circle"></i>
            ) : (
              <i className="bi bi-arrow-right-circle"></i>
            )}
          </label>
          <span className="checkmark"></span>
          {language === "en" ? " Genres" : " Genres"}{" "}
        </li>
        {showGenres && (
          <>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ADVENTURE"}
                  onChange={handleAdventure}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Adventure" : " Abenteuer"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ACTION"}
                  onChange={handleAction}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Action" : " Action"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "SHOOTER"}
                  onChange={handleShooter}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Shooter" : " Shooter"}
              </label>
            </li>

            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "RPG"}
                  onChange={handleRPG}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Role-playing" : " Rollenspiel"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "SIMULATION"}
                  onChange={handleSimulation}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Simulation" : " Simulation"}
              </label>
            </li>

            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "STRATEGY"}
                  onChange={handleStrategy}
                />
                <span className="checkmark"></span>
                {language === "en" ? "Strategy" : " Strategie"}
              </label>
            </li>
            {isLoggedIn && (
              <li className="gamespage-main-filter-li">
                <label className="square-checkbox">
                  <input type="checkbox" disabled />
                  <span className="checkmark"></span>
                  {language === "en"
                    ? "Show only DLCs for my games"
                    : " Nur DLCs für meine Spiele anzeigen"}
                </label>
              </li>
            )}
          </>
        )}
        {/* Show tags */}
        <li className="gamespage-main-filter-li">
          <input
            type="checkbox"
            id="checkbox5"
            onChange={() => handleModal("Tags")}
          />
          <label htmlFor="checkbox5">
            {iconChange === "Tags" ? (
              <i className="bi bi-arrow-down-circle"></i>
            ) : (
              <i className="bi bi-arrow-right-circle"></i>
            )}
          </label>
          <span className="checkmark"></span>
          {language === "en" ? " Tags" : " Tags"}{" "}
        </li>
        {showTags && (
          <>
            <li className="gamespage-main-filter-li">
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "Search for more tags..."
                    : "Suche nach weiteren Tags.."
                }
                value={inputTags}
                onChange={handleTagSearch}
              />
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ADVENTURE_TAG"}
                  onChange={handleAdventureTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Adventure" : " Abenteuer"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ACTION_TAG"}
                  onChange={handleActionTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Action" : " Action"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "INDIE_TAG"}
                  onChange={handleIndieTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Indie" : " Indie"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "FANTASY_TAG"}
                  onChange={handleFantasyTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Fantasy" : " Fantasie"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "SPANN_GESCHICHTE_TAG"}
                  onChange={handleSpannGeschichteTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Role-playing" : " Spannende Geschichte"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ATMOSPHÄRISCH_TAG"}
                  onChange={handleAtmosphärischTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Simulation" : " Atmosphärisch"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "STRATEGIE_TAG"}
                  onChange={handleStrategieTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Strategy" : " Strategie"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ROLLENSPIEL_TAG"}
                  onChange={handleRollenspielTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Role-playing" : " Rollenspiel"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "2D_TAG"}
                  onChange={handle2DTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " 2D" : " 2D"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "SCI_FI_TAG"}
                  onChange={handleSciFiTag}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Science Fiction" : " Science Fiction"}
              </label>
            </li>
          </>
        )}
        {/* Show platform */}
        <li className="gamespage-main-filter-li">
          <input
            type="checkbox"
            id="checkbox6"
            onChange={() => handleModal("Platform")}
          />
          <label htmlFor="checkbox6">
            {iconChange === "Platform" ? (
              <i className="bi bi-arrow-down-circle"></i>
            ) : (
              <i className="bi bi-arrow-right-circle"></i>
            )}
          </label>
          <span className="checkmark"></span>
          {language === "en" ? " Platform" : " Platform"}{" "}
        </li>
        {showPlatform && (
          <>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "WINDOWS"}
                  onChange={handleWindows}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Windows" : " Windows"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "MAC"}
                  onChange={handleIos}
                />
                <span className="checkmark"></span>
                {language === "en" ? " macOS" : " macOS"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "LINUX"}
                  onChange={handleLinux}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Linux" : " Linux"}
              </label>
            </li>
          </>
        )}
        {/* Show functions */}
        <li className="gamespage-main-filter-li">
          <input
            type="checkbox"
            id="checkbox7"
            onChange={() => handleModal("Function")}
          />
          <label htmlFor="checkbox7">
            {iconChange === "Function" ? (
              <i className="bi bi-arrow-down-circle"></i>
            ) : (
              <i className="bi bi-arrow-right-circle"></i>
            )}
          </label>
          <span className="checkmark"></span>
          {language === "en" ? " Functions" : " Funktionen"}{" "}
        </li>
        {showFunctions && (
          <>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "SINGLE_PLAYER"}
                  onChange={handleEinzelspieler}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Single-player" : " Einzelspieler"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "MULTIPLAYER"}
                  onChange={handleMultiplayer}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Multi-player" : " Mehrspieler"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "COOP"}
                  onChange={handleKoop}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Coop" : " Koop"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ACHIEVEMENTS"}
                  onChange={handleErfolge}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Achievements" : " Erfolge"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "RANGLISTEN"}
                  onChange={handleRanglisten}
                />
                <span className="checkmark"></span>
                {language === "en" ? "Leaderboards" : " Ranglisten"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "CONTROLLER_SUPPORT"}
                  onChange={handleController}
                />
                <span className="checkmark"></span>
                {language === "en"
                  ? " Controller support"
                  : " Controller-Unterstützung"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "CLOUD_SAVES"}
                  onChange={handleCloud}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Cloud saves" : " Cloud-Speicherstände"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "EINBLENDUNGEN_FUNC"}
                  onChange={handleEinblendung}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Overlay" : " Einblendungen"}
              </label>
            </li>
          </>
        )}
        {/* Show release range */}
        <li className="gamespage-main-filter-li">
          <input
            type="checkbox"
            id="checkbox8"
            onChange={() => handleModal("ReleaseRange")}
          />
          <label htmlFor="checkbox8">
            {iconChange === "ReleaseRange" ? (
              <i className="bi bi-arrow-down-circle"></i>
            ) : (
              <i className="bi bi-arrow-right-circle"></i>
            )}
          </label>
          <span className="checkmark"></span>
          {language === "en" ? " Release Date" : " Erscheinungsdatum"}{" "}
        </li>
        {showReleaseRange && (
          <>
            <div className="gamespage-main-filter-silder-result-wrapper">
              <div className="gamespage-main-filter-silder-wrapper">
                <RangeSlider
                  id="gamespage-main-filter-silder2"
                  min={"1980"}
                  max={"2024"}
                  defaultValue={[minReleaseDate, maxReleaseDate]}
                  step={1}
                  onInput={handleReleaseDateRangeChange}
                />
              </div>
              <div className="gamespage-main-filter-result-wrapper">
                <input
                  type="text"
                  id="minReleaseInput"
                  className="gamespage-main-filter-result-min"
                  value={inputValueMinRelease}
                  onFocus={handleInputReleaseFocus}
                  onChange={handleReleaseInput}
                  onKeyDown={handleReleaseKeyDown}
                />
                -
                <input
                  type="text"
                  id="maxReleaseInput"
                  className="gamespage-main-filter-result-min"
                  value={inputValueMaxRelease}
                  onFocus={handleInputReleaseFocus}
                  onChange={handleReleaseInput}
                  onKeyDown={handleReleaseKeyDown}
                />
              </div>
            </div>
          </>
        )}
        {/* Show Languages */}
        <li className="gamespage-main-filter-li">
          <input
            type="checkbox"
            id="checkbox9"
            onChange={() => handleModal("Languages")}
          />
          <label htmlFor="checkbox9">
            {iconChange === "Languages" ? (
              <i className="bi bi-arrow-down-circle"></i>
            ) : (
              <i className="bi bi-arrow-right-circle"></i>
            )}
          </label>
          <span className="checkmark"></span>
          {language === "en" ? " Languages" : " Sprachen"}{" "}
        </li>
        {showLanguages && (
          <>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "PORTUGUÊS_DO_BRASIL"}
                  onChange={handleBrasilianisch}
                />
                <span className="checkmark"></span>
                {language === "en"
                  ? " Português do Brasil"
                  : " Português do Brasil"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "DANSK"}
                  onChange={handleDänisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Dansk" : " Dansk"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "DEUTSCH"}
                  onChange={handleDeutsch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Deutsch" : " Deutsch"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ENGLISH"}
                  onChange={handleEnglisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " English" : " English"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "FRANÇAIS"}
                  onChange={handleFranzösisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Français" : " Français"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "POLSKI"}
                  onChange={handlePolnisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Polski" : " Polski"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "MAGYAR"}
                  onChange={handleUngarisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " magyar" : " magyar"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "TÜRKÇE"}
                  onChange={handleTürkisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Türkçe" : " Türkçe"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "PORTUGUÊS"}
                  onChange={handlePortugiesisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Português" : " Português"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "РУССКИЙ"}
                  onChange={handleRussisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Русский" : " Pусский"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ITALIANO"}
                  onChange={handleItalienisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Italiano" : " Italiano"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ESPAÑOL"}
                  onChange={handleSpanisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Español" : " Español"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "中文简体"}
                  onChange={handleChinesisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " 中文" : " 中文"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "日本語"}
                  onChange={handleJapanisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " 日本語" : " 日本語"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "한국어"}
                  onChange={handleKoreanisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " 한국어" : " 한국어"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "ČESKÝ"}
                  onChange={handleTschechisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " čeština" : " čeština"}
              </label>
            </li>
            <li className="gamespage-main-filter-li">
              <label className="square-checkbox">
                <input
                  type="checkbox"
                  checked={filterCondition === "NEDERLANDS"}
                  onChange={handleNiederländisch}
                />
                <span className="checkmark"></span>
                {language === "en" ? " Nederlands" : " Nederlands"}
              </label>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default FilterStore;
