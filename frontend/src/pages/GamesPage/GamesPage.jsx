import { useLanguage } from "../../contexts/LanguageContext";
import { LogginContext } from "../../contexts/LogginContext";
import { useEffect, useState, useContext } from "react";
import RangeSlider from "react-range-slider-input";
import GamesModal from "../../components/HomePage/GamesModal";
import "react-range-slider-input/dist/style.css";
import "./gamespage.scss";

const GamesPage = () => {
  // Get the current language from the LanguageContext
  const { language } = useLanguage();
  // Get the logged-in status from the LogginContext
  const { isLoggedIn } = useContext(LogginContext);
  // State variables to manage various aspects of the games page
  const [games, setGames] = useState([]); // Stores the list of games
  const [showDLC, setShowDLC] = useState(false); // Toggle for showing DLC
  const [showPriceRange, setShowPriceRange] = useState(false); // Toggle for showing price range filter
  const [showReleaseState, setShowReleaseState] = useState(false); // Toggle for showing release state filter
  const [showGenres, setShowGenres] = useState(false); // Toggle for showing genres filter
  const [showTags, setShowTags] = useState(false); // Toggle for showing tags filter
  const [inputTags, setInputTags] = useState(""); // Stores the input for tag search
  const [showPlatform, setShowPlatform] = useState(false); // Toggle for showing platform filter
  const [showFunctions, setShowFunctions] = useState(false); // Toggle for showing functions filter
  const [showReleaseRange, setShowReleaseRange] = useState(false); // Toggle for showing release date range filter
  const [iconChange, setIconChange] = useState(""); // Manages the icon state for different filters
  const [minPrice, setMinPrice] = useState("0"); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState("120"); // Maximum price filter
  const [inputValueMin, setInputValueMin] = useState(minPrice); // Minimum price input value
  const [inputValueMax, setInputValueMax] = useState(maxPrice); // Maximum price input value
  const [minReleaseDate, setMinReleaseDate] = useState("1980"); // Minimum release date filter
  const [maxReleaseDate, setMaxReleaseDate] = useState("2024"); // Maximum release date filter
  const [inputValueMinRelease, setInputValueMinRelease] =
    useState(minReleaseDate); // Minimum release date input value
  const [inputValueMaxRelease, setInputValueMaxRelease] =
    useState(maxReleaseDate); // Maximum release date input value
  const [showLanguages, setShowLanguages] = useState(false); // Toggle for showing languages filter
  const [hoveredGame, setHoveredGame] = useState(null); // Stores the game that is currently hovered over
  const [filterCondition, setFilterCondition] = useState("ALL"); // Stores the current filter condition
  const [isOpen, setIsOpen] = useState(false); // Manages the dropdown state
  const [selectedItemsSort, setSelectedItemsSort] = useState([]); // Stores the selected items for sorting
  const [sortCondition, setSortCondition] = useState("ALL"); // Stores the current sort condition
  const [salesHistory] = useState([]); // Stores the sales history
  const [showListGrid, setShowListGrid] = useState(true); // Toggle for showing list/grid view
  // Toggles the dropdown menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Defines the sort options based on the current language
  const items =
    language === "en"
      ? [
          "Best selling (recently)",
          "Best selling (all time)",
          "Price (ascending)",
          "Price (descending)",
          "Discounted (descending)",
          "Title A-Z",
          "Title Z-A",
          "Release date (newest)",
          "Release date (oldest)",
          "Ratings (descending)",
        ]
      : [
          "Meistverkauft (kürzlich)",
          "Meistverkauft (aller Zeiten)",
          "Preis (aufsteigend)",
          "Preis (absteigend)",
          "Reduziert (absteigend)",
          "Title A-Z",
          "Title Z-A",
          "Erscheinungsdatum (vom neusten)",
          "Erscheinungsdatum (zum ältesten)",
          "Bewertungen (absteigend)",
        ];

  // Fetches the list of games from the server
  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:3001/games");
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };
  // Fetch games when the component is mounted
  useEffect(() => {
    fetchGames();
  }, []);
  // Check sales history date whenever the games state changes
  useEffect(() => {
    checkSalesHistoryDate();
  }, [games]);

  // Handlers for various filter conditions
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

  const handleRacing = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "RACING" ? "ALL" : "RACING"
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

  const handleSport = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SPORT" ? "ALL" : "SPORT"
    );
  };

  const handleStrategy = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "STRATEGY" ? "ALL" : "STRATEGY"
    );
  };

  const handleTagSearch = (e) => {
    setInputTags(e.target.value);
    setFilterCondition((prevCondition) =>
      prevCondition === "TAG_SEARCH" ? "ALL" : "TAG_SEARCH"
    );
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
      prevCondition === "EINZELSPIELER" ? "ALL" : "EINZELSPIELER"
    );
  };

  const handleErfolge = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ERFOLGE" ? "ALL" : "ERFOLGE"
    );
  };

  const handleCloud = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "CLOUD" ? "ALL" : "CLOUD"
    );
  };

  const handleMultiplayer = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "MULTIPLAYER" ? "ALL" : "MULTIPLAYER"
    );
  };

  const handleController = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "CONTROLLER" ? "ALL" : "CONTROLLER"
    );
  };

  const handleEinblendung = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "EINBINDUNG" ? "ALL" : "EINBINDUNG"
    );
  };

  const handleRanglisten = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "RANGLISTEN" ? "ALL" : "RANGLISTEN"
    );
  };

  const handleKoop = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "KOOP" ? "ALL" : "KOOP"
    );
  };

  const handleDeutsch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "DEUTSCH" ? "ALL" : "DEUTSCH"
    );
  };

  const handleEnglisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ENGLISCH" ? "ALL" : "ENGLISCH"
    );
  };

  const handleFranzösisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "FRANZÖSISCH" ? "ALL" : "FRANZÖSISCH"
    );
  };

  const handleSpanisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "SPANISCH" ? "ALL" : "SPANISCH"
    );
  };

  const handleItalienisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ITALIENISCH" ? "ALL" : "ITALIENISCH"
    );
  };

  const handlePortugiesisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "PORTUGIESISCH" ? "ALL" : "PORTUGIESISCH"
    );
  };

  const handleRussisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "RUSSISCH" ? "ALL" : "RUSSISCH"
    );
  };

  const handleChinesisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "CHINESISCH" ? "ALL" : "CHINESISCH"
    );
  };

  const handleJapanisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "JAPANISCH" ? "ALL" : "JAPANISCH"
    );
  };

  const handleKoreanisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "KOREANISCH" ? "ALL" : "KOREANISCH"
    );
  };

  const handleBrasilianisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "Brasilianisch" ? "ALL" : "Brasilianisch"
    );
  };

  const handleUngarisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "ungarisch" ? "ALL" : "ungarisch"
    );
  };

  const handlePolnisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "polnisch" ? "ALL" : "polnisch"
    );
  };

  const handleTürkisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "türkisch" ? "ALL" : "türkisch"
    );
  };

  const handleTschechisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "tschechisch" ? "ALL" : "tschechisch"
    );
  };

  const handleNiederländisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "niederländisch" ? "ALL" : "niederländisch"
    );
  };

  const handleDänisch = () => {
    setFilterCondition((prevCondition) =>
      prevCondition === "dänisch" ? "ALL" : "dänisch"
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

  const handleMouseEnter = (game) => {
    setHoveredGame(game);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedItemsSort(value);
    setSortCondition(value);
    setIsOpen(!isOpen);
  };

  const filterGames = (games) => {
    return games.filter((game) => {
      if (filterCondition === "DISCOUNTED") {
        return game.price - (game.price * game.discount) / 100 < game.price;
      } else if (filterCondition === "DLC") {
        return game.dlc === false;
      } else if (filterCondition === "PRICE_RANGE") {
        return game.price >= minPrice && game.price <= maxPrice;
      } else if (filterCondition === "ONLY_FREE") {
        return (
          game.price === 0 &&
          game.releaseDate <= new Date().toISOString().split("T")[0]
        );
      } else if (filterCondition === "NEW_ARRIVALS") {
        const today = new Date();
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(today.getDate() - 31);
        return (
          game.releaseDate > fourWeeksAgo.toISOString().split("T")[0] &&
          game.releaseDate <= today.toISOString().split("T")[0]
        );
      } else if (filterCondition === "SOON") {
        const today = new Date();
        const startOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
        return (
          game.releaseDate > today.toISOString().split("T")[0] &&
          game.releaseDate < startOfNextYear.toISOString().split("T")[0]
        );
      } else if (filterCondition === "EARLY_ACCESS") {
        return game.earlyAccess;
      } else if (filterCondition === "ADVENTURE") {
        return game.genres.includes("abenteuer");
      } else if (filterCondition === "ACTION") {
        return game.genres.includes("action");
      } else if (filterCondition === "SHOOTER") {
        return game.genres.includes("shooter");
      } else if (filterCondition === "RACING") {
        return game.genres.includes("racing");
      } else if (filterCondition === "RPG") {
        return game.genres.includes("rollenspiel");
      } else if (filterCondition === "SIMULATION") {
        return game.genres.includes("simulation");
      } else if (filterCondition === "SPORT") {
        return game.genres.includes("sport");
      } else if (filterCondition === "STRATEGY") {
        return game.genres.includes("strategie");
      } else if (filterCondition === "TAG_SEARCH") {
        return game.tags.includes(inputTags);
      } else if (filterCondition === "ADVENTURE_TAG") {
        return game.tags.includes("Abenteuer");
      } else if (filterCondition === "ACTION_TAG") {
        return game.tags.includes("Action");
      } else if (filterCondition === "INDIE_TAG") {
        return game.tags.includes("Indie");
      } else if (filterCondition === "FANTASY_TAG") {
        return game.tags.includes("Fantasy");
      } else if (filterCondition === "SPANN_GESCHICHTE_TAG") {
        return game.tags.includes("Spannende Geschichte");
      } else if (filterCondition === "ATMOSPHÄRISCH_TAG") {
        return game.tags.includes("Atmosphärisch");
      } else if (filterCondition === "STRATEGIE_TAG") {
        return game.tags.includes("Strategie");
      } else if (filterCondition === "ROLLENSPIEL_TAG") {
        return game.tags.includes("Rollenspiel");
      } else if (filterCondition === "2D_TAG") {
        return game.tags.includes("2D");
      } else if (filterCondition === "SCI_FI_TAG") {
        return game.tags.includes("Sciene Fiction");
      } else if (filterCondition === "WINDOWS") {
        return game.platforms.includes("windows");
      } else if (filterCondition === "MAC") {
        return game.platforms.includes("ios");
      } else if (filterCondition === "LINUX") {
        return game.platforms.includes("linux");
      } else if (filterCondition === "EINZELSPIELER") {
        return game.functions.includes("Einzelspieler");
      } else if (filterCondition === "ERFOLGE") {
        return game.functions.includes("Erfolge");
      } else if (filterCondition === "CLOUD") {
        return game.functions.includes("Cloud-Speicherstände");
      } else if (filterCondition === "MULTIPLAYER") {
        return game.functions.includes("Mehrspieler");
      } else if (filterCondition === "CONTROLLER") {
        return game.functions.includes("Controller-Unterstützung");
      } else if (filterCondition === "EINBINDUNG") {
        return game.functions.includes("Einblendungen");
      } else if (filterCondition === "RANGLISTEN") {
        return game.functions.includes("Ranglisten");
      } else if (filterCondition === "KOOP") {
        return game.functions.includes("Koop");
      } else if (filterCondition === "RELEASE_RANGE") {
        return (
          game.releaseDate.split("-")[0] >= minReleaseDate &&
          game.releaseDate.split("-")[0] <= maxReleaseDate
        );
      } else if (filterCondition === "DEUTSCH") {
        return game.languages.includes("Deutsch");
      } else if (filterCondition === "ENGLISCH") {
        return game.languages.includes("English");
      } else if (filterCondition === "FRANZÖSISCH") {
        return game.languages.includes("Français");
      } else if (filterCondition === "SPANISCH") {
        return game.languages.includes("Español");
      } else if (filterCondition === "ITALIENISCH") {
        return game.languages.includes("Italiano");
      } else if (filterCondition === "PORTUGIESISCH") {
        return game.languages.includes("Português");
      } else if (filterCondition === "RUSSISCH") {
        return game.languages.includes("Русский");
      } else if (filterCondition === "CHINESISCH") {
        return game.languages.includes("中文");
      } else if (filterCondition === "JAPANISCH") {
        return game.languages.includes("日本語");
      } else if (filterCondition === "KOREANISCH") {
        return game.languages.includes("한국어");
      } else if (filterCondition === "Brasilianisch") {
        return game.languages.includes("Português do Brasil");
      } else if (filterCondition === "ungarisch") {
        return game.languages.includes("magyar");
      } else if (filterCondition === "polnisch") {
        return game.languages.includes("polski");
      } else if (filterCondition === "türkisch") {
        return game.languages.includes("Türkçe");
      } else if (filterCondition === "tschechisch") {
        return game.languages.includes("čeština");
      } else if (filterCondition === "niederländisch") {
        return game.languages.includes("Nederlands");
      } else if (filterCondition === "dänisch") {
        return game.languages.includes("dansk");
      } else {
        return true;
      }
    });
  };

  const checkSalesHistoryDate = () => {
    games.forEach((game) => {
      game.salesHistory.map((sale) => {
        return salesHistory.push({
          saleDate: sale.date,
          gameTitle: game.title,
        });
      });
    });
  };

  function wasPurchasedInJune(salesHistory) {
    return salesHistory.some((sale) => {
      const dateParts = sale.date.split("-");
      const month = dateParts[1];
      return month === "06";
    });
  }

  const sortGames = (games) => {
    return games.sort((a, b) => {
      if (sortCondition === "Meistverkauft (kürzlich)") {
        const aPurchasedInJune = wasPurchasedInJune(a.salesHistory);
        const bPurchasedInJune = wasPurchasedInJune(b.salesHistory);
        if (aPurchasedInJune && !bPurchasedInJune) return -1;
        if (!aPurchasedInJune && bPurchasedInJune) return 1;
        return b.sold - a.sold;
      } else if (sortCondition === "Meistverkauft (aller Zeiten)") {
        return b.sold - a.sold;
      } else if (sortCondition === "Preis (aufsteigend)") {
        return a.price - b.price;
      } else if (sortCondition === "Preis (absteigend)") {
        return b.price - a.price;
      } else if (sortCondition === "Reduziert (absteigend)") {
        return b.discount - a.discount;
      } else if (sortCondition === "Title A-Z") {
        return a.title.localeCompare(b.title);
      } else if (sortCondition === "Title Z-A") {
        return b.title.localeCompare(a.title);
      } else if (sortCondition === "Erscheinungsdatum (vom neusten)") {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      } else if (sortCondition === "Erscheinungsdatum (zum ältesten)") {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      } else if (sortCondition === "Bewertungen (absteigend)") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
  };

  const filteredGames = filterGames(games);
  const sortedGames = sortGames(filteredGames);

  return (
    <div className="main-wrapper gamespage-wrapper">
      <div className="gamespage-header-wrapper">
        <h1>
          {language === "en" ? "PC games / All Games" : " Alle Spiele"}
          <span> ({sortedGames.length})</span>
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
                    <input type="checkbox" onChange={handleAdventure} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Adventure" : " Abenteuer"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleAction} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Action" : " Action"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleShooter} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Shooter" : " Kugelhagel"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleRacing} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Racing" : " Rennen"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleRPG} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Role-playing" : " Rollenspiel"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleSimulation} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Simulation" : " Simulation"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleSport} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Sport" : " Sport"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleStrategy} />
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
                    <input type="checkbox" onChange={handleAdventureTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Adventure" : " Abenteuer"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleActionTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Action" : " Action"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleIndieTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Indie" : " Indie"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleFantasyTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Fantasy" : " Fantasie"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input
                      type="checkbox"
                      onChange={handleSpannGeschichteTag}
                    />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? " Role-playing"
                      : " Spannende Geschichte"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleAtmosphärischTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Simulation" : " Atmosphärisch"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleStrategieTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Strategy" : " Strategie"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleRollenspielTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Role-playing" : " Rollenspiel"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handle2DTag} />
                    <span className="checkmark"></span>
                    {language === "en" ? " 2D" : " 2D"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleSciFiTag} />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? " Science Fiction"
                      : " Science Fiction"}
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
                    <input type="checkbox" onChange={handleWindows} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Windows" : " Windows"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleIos} />
                    <span className="checkmark"></span>
                    {language === "en" ? " macOS" : " macOS"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleLinux} />
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
                    <input type="checkbox" onChange={handleEinzelspieler} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Single-player" : " Einzelspieler"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleMultiplayer} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Multi-player" : " Mehrspieler"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleKoop} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Coop" : " Koop"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleErfolge} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Achievements" : " Erfolge"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleRanglisten} />
                    <span className="checkmark"></span>
                    {language === "en" ? "Leaderboards" : " Ranglisten"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleController} />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? " Controller support"
                      : " Controller-Unterstützung"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleCloud} />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? " Cloud saves"
                      : " Cloud-Speicherstände"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleEinblendung} />
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
                    <input type="checkbox" onChange={handleBrasilianisch} />
                    <span className="checkmark"></span>
                    {language === "en"
                      ? " Português do Brasil"
                      : " Português do Brasil"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleDänisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Dansk" : " Dansk"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleDeutsch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Deutsch" : " Deutsch"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleEnglisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " English" : " English"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleFranzösisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Français" : " Français"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handlePolnisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Polski" : " Polski"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleUngarisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " magyar" : " magyar"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleTürkisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Türkçe" : " Türkçe"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handlePortugiesisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Português" : " Português"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleRussisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Русский" : " Pусский"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleItalienisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Italiano" : " Italiano"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleSpanisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Español" : " Español"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleChinesisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " 中文" : " 中文"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleJapanisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " 日本語" : " 日本語"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleKoreanisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " 한국어" : " 한국어"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleTschechisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " čeština" : " čeština"}
                  </label>
                </li>
                <li className="gamespage-main-filter-li">
                  <label className="square-checkbox">
                    <input type="checkbox" onChange={handleNiederländisch} />
                    <span className="checkmark"></span>
                    {language === "en" ? " Nederlands" : " Nederlands"}
                  </label>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="gamespage-main-games-wrapper">
          <div className="gamespage-main-games-header">
            <div className="gamespage-main-games-header-left-pagination">
              <i className="bi bi-caret-left"></i>
              <i className="bi bi-caret-right"></i>
            </div>
            <div className="gamespage-main-games-header-middle">
              <div
                className="gamespage-main-games-header-middle-sort-wrapper"
                onClick={toggleDropdown}>
                {language === "en" ? "Sort by:" : "Sortieren nach:"}
                <div className="gamespage-main-games-header-middle-sort">
                  {selectedItemsSort}
                  <i className="bi bi-caret-down"></i>
                </div>
              </div>
              <div className="gamespage-main-games-header-middle-grid-list-wrapper">
                <i
                  className="bi bi-grid-3x3-gap-fill"
                  onClick={() => setShowListGrid(true)}></i>
                <i
                  className="list bi bi-list-task"
                  onClick={() => setShowListGrid(false)}></i>
              </div>
              {isOpen && (
                <div className="gamespage-main-games-header-dropdown-list">
                  <ul>
                    {items.map((item) => (
                      <li
                        className="gamespage-main-games-header-dropdown-list-item"
                        key={item}>
                        <label className="square-checkbox">
                          <input
                            type="checkbox"
                            value={item}
                            checked={selectedItemsSort.includes(item)}
                            onChange={handleCheckboxChange}
                          />
                          <span className="checkmark"></span>
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            className={`${
              showListGrid
                ? "gamespage-main-games-middle-grid"
                : "gamespage-main-games-middle-list"
            }`}>
            {sortedGames.length > 0 ? (
              sortedGames.map((game, index) => (
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
                      <div className="game-card-header">
												{game.dlc && <span className="dlc-tag">DLC</span>}
												<h4>{game.title}</h4>
											</div>
                      <div className="game-card-price">
                        {game.discount >= 1 && (
                          <div className="game-card-rabatt">
                            <p>-{game.discount}%</p>
                          </div>
                        )}
                        <div className="game-card-price-text">
                          <p>
                            {(
                              game.price -
                              (game.price * game.discount) / 100
                            ).toFixed(2)}
                            €
                          </p>{" "}
                        </div>
                      </div>
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
