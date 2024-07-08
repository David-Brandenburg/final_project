import { useCallback, useContext, useEffect, useState } from "react";
import {
  LanguageContext,
  useLanguage,
} from "../../contexts/LanguageContext.js";
import HeaderStore from "../../components/StorePage/HeaderStore.jsx";
import FilterStore from "../../components/StorePage/FilterStore.jsx";
import GamesStore from "../../components/StorePage/GamesStore.jsx";
import tagToFilterCondition from "../../components/StorePage/tagFilterCondition.json";
import genreToFilterCondition from "../../components/StorePage/genreToFilterCondition.json";
import platformsFilterCondition from "../../components/StorePage/platformsFilterCondition.json";
import functionsFilterCondition from "../../components/StorePage/functionsFilterCondition.json";
import languagesFilterCondition from "../../components/StorePage/languagesFilterCondition.json";
import { useLocation, useNavigate } from "react-router-dom";
import "react-range-slider-input/dist/style.css";
import "./storepage.scss";
import { LogginContext } from "../../contexts/LogginContext.js";

const GamesPage = () => {
  // Get the current language from the LanguageContext
  const { language } = useLanguage();
  const { inputSearch, setInputSearch } = useContext(LanguageContext);

  // State variables to manage various aspects of the games page
  const [games, setGames] = useState([]); // Stores the list of games

  const [inputTags, setInputTags] = useState(""); // Stores the input for tag search
  // const [inputSearch, setInputSearch] = useState(""); // Stores the input for search
  const [minPrice, setMinPrice] = useState("0"); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState("120"); // Maximum price filter

  const [minReleaseDate, setMinReleaseDate] = useState("1980"); // Minimum release date filter
  const [maxReleaseDate, setMaxReleaseDate] = useState("2024"); // Maximum release date filter

  const [filterCondition, setFilterCondition] = useState("ALL"); // Stores the current filter condition

  const [selectedItemsSort, setSelectedItemsSort] = useState([]); // Stores the selected items for sorting
  const [sortCondition, setSortCondition] = useState("ALL"); // Stores the current sort condition
  const [salesHistory] = useState([]); // Stores the sales history
  const [isScrolled, setIsScrolled] = useState(false); // Manages the scroll state
  const { loggedInUser } = useContext(LogginContext);
  const [myGames, setMyGames] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL_BACKEND;

  const [path] = useState(window.location.href);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setFilterConditionFromPath(path);
  }, [path]);

  const setFilterConditionFromPath = (path) => {
    for (const tag in tagToFilterCondition) {
      if (path.includes("tags") && path.includes(tag)) {
        return setFilterCondition(tagToFilterCondition[tag]);
      }
    }

    for (const genre in genreToFilterCondition) {
      if (path.includes("genres") && path.includes(genre)) {
        return setFilterCondition(genreToFilterCondition[genre]);
      }
    }

    for (const platform in platformsFilterCondition) {
      if (path.includes("platforms") && path.includes(platform)) {
        return setFilterCondition(platformsFilterCondition[platform]);
      }
    }

    for (const func in functionsFilterCondition) {
      if (path.includes("functions") && path.includes(func)) {
        return setFilterCondition(functionsFilterCondition[func]);
      }
    }

    for (const lang in languagesFilterCondition) {
      if (path.includes("languages") && path.includes(lang)) {
        return setFilterCondition(languagesFilterCondition[lang]);
      }
    }
  };

  // Fetches the list of games from the server
  const fetchGames = async () => {
    try {
      const response = await fetch(`${URL}/games`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  const fetchAccountsGames = async (e) => {
    try {
      const response = await fetch(`${URL}/accounts/${loggedInUser.id}`, {
        method: "GET",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      } else {
        const data = await response.json();
        setMyGames(data.myGames);
        console.log(myGames);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch games when the component is mounted
  useEffect(() => {
    fetchGames();
    fetchAccountsGames();
    // handNavLink();
    window.scrollTo(0, 0);
    setSortCondition("Meistverkauft (kürzlich)");
    setSelectedItemsSort([
      language === "en"
        ? "Best selling (recently)"
        : "Meistverkauft (kürzlich)",
    ]);
    document.title = `${
      language === "en"
        ? "The best video games, without DRM"
        : "Die besten Videospiele, ohne DRM"
    } | PixelPlaza`;
  }, [language]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchValue = queryParams.get("search") || "";
    setInputSearch(searchValue);
    if (searchValue) {
      setFilterCondition("SEARCH");
    }
  }, [location.search]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setInputSearch(searchValue);
    setFilterCondition("SEARCH");

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("search", searchValue);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    navigate(newUrl);
  };

  const filterGames = (games, filterCondition) => {
    const filterFunctions = {
      DISCOUNTED: (game) =>
        game.price - (game.price * game.discount) / 100 < game.price,
      MYGAMESNOTSHWON: (game) => !myGames.includes(game.title),
      DLC: (game) => !game.dlc,
      PRICE_RANGE: (game) => game.price >= minPrice && game.price <= maxPrice,
      ONLY_FREE: (game) =>
        game.price === 0 &&
        game.releaseDate <= new Date().toISOString().split("T")[0],
      NEW_ARRIVALS: (game) => {
        const today = new Date();
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(today.getDate() - 31);
        return (
          game.releaseDate > fourWeeksAgo.toISOString().split("T")[0] &&
          game.releaseDate <= today.toISOString().split("T")[0]
        );
      },
      SOON: (game) => {
        const today = new Date();
        const startOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
        return (
          game.releaseDate > today.toISOString().split("T")[0] &&
          game.releaseDate < startOfNextYear.toISOString().split("T")[0]
        );
      },
      EARLY_ACCESS: (game) => game.earlyAccess,
      ADVENTURE: (game) => game.genres.includes("Abenteuer"),
      ACTION: (game) => game.genres.includes("Action"),
      SHOOTER: (game) => game.genres.includes("Shooter"),
      RPG: (game) => game.genres.includes("Rollenspiel"),
      SIMULATION: (game) => game.genres.includes("Simulation"),
      STRATEGY: (game) => game.genres.includes("Strategie"),
      BUILD: (game) => game.genres.includes("Bauen"),
      EGO: (game) => game.genres.includes("Egoperspektive"),
      FANTASY: (game) => game.genres.includes("Fantasy"),
      SCI_FI: (game) => game.genres.includes("Science-fiction"),
      HORROR: (game) => game.genres.includes("Horror"),
      ERKUNDUNG: (game) => game.genres.includes("Erkundung"),
      OPEN_WORLD: (game) => game.genres.includes("Open-World"),
      HISTORICAL: (game) => game.genres.includes("Historisch"),
      TURN_BASED: (game) => game.genres.includes("Rundenbasiert"),
      RÄTSEL: (game) => game.genres.includes("Rätsel"),
      DETECTIVE: (game) => game.genres.includes("Detektivgeschichten"),
      POINT_CLICK: (game) => game.genres.includes("Point-and-Click"),
      JRPG: (game) => game.genres.includes("JRPG"),
      REAL_TIME: (game) => game.genres.includes("Echtzeit"),
      STORY_RICH: (game) => game.genres.includes("Erzählung"),
      ÜBERLEBEN: (game) => game.genres.includes("Überleben"),
      NEW_ARRIVALS_GENRE: (game) => game.genres.includes("Neu-Erschienen"),
      POPULAR_TITLES: (game) => game.genres.includes("Beliebte-Titel"),
      DISCOUNTED_GENRE: (game) => game.genres.includes("Angebote"),
      MANAGEMENT: (game) => game.genres.includes("Management"),
      TAG_SEARCH: (game) => {
        if (!inputTags || inputTags.trim() === "") {
          return true;
        }

        const searchLower = inputTags.toLowerCase();

        return (
          game.tags &&
          game.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      },
      ADVENTURE_TAG: (game) => game.tags.includes("Abenteuer"),
      ACTION_TAG: (game) => game.tags.includes("Action"),
      INDIE_TAG: (game) => game.tags.includes("Indie"),
      FANTASY_TAG: (game) => game.tags.includes("Fantasy"),
      SPANN_GESCHICHTE_TAG: (game) =>
        game.tags.includes("Spannende Geschichte"),
      ATMOSPHÄRISCH_TAG: (game) => game.tags.includes("Atmosphärisch"),
      STRATEGIE_TAG: (game) => game.tags.includes("Strategie"),
      ROLLENSPIEL_TAG: (game) => game.tags.includes("Rollenspiel"),
      "2D_TAG": (game) => game.tags.includes("2D"),
      SCIENCE_FICTION_TAG: (game) => game.tags.includes("Science Fiction"),
      HISTORISCH_TAG: (game) => game.tags.includes("Historisch"),
      HORROR_TAG: (game) => game.tags.includes("Horror"),
      KOOP_TAG: (game) => game.tags.includes("Lokaler Coop"),
      SIMULATION_TAG: (game) => game.tags.includes("Simulation"),
      TAKTISCH_TAG: (game) => game.tags.includes("Taktisch"),
      SHOOTER_TAG: (game) => game.tags.includes("Shooter"),
      ÜBERLEBEN_TAG: (game) => game.tags.includes("Überleben"),
      ERKUNDUNG_TAG: (game) => game.tags.includes("Erkundung"),
      TOLLER_SOUNDTRACK_TAG: (game) => game.tags.includes("Toller Soundtrack"),
      FIRST_PERSON_TAG: (game) => game.tags.includes("First-Person"),
      THIRD_PERSON_TAG: (game) => game.tags.includes("Third Person"),
      OFFENE_SPIELWELT_TAG: (game) => game.tags.includes("Offene Spielwelt"),
      SANDBOX_TAG: (game) => game.tags.includes("Sandbox"),
      FPS_TAG: (game) => game.tags.includes("FPS"),
      POSTAPOKALYPTISCH_TAG: (game) => game.tags.includes("Postapokalyptisch"),
      RESSOURCENVERWALTUNG_TAG: (game) =>
        game.tags.includes("Ressourcenverwaltung"),
      MITTELALTERLICH_TAG: (game) => game.tags.includes("Mittelalterlich"),
      BAUEN_TAG: (game) => game.tags.includes("Bauen"),
      BASENBAU_TAG: (game) => game.tags.includes("Basenbau"),
      STÄDTEBAUER_TAG: (game) => game.tags.includes("Städtebauer"),
      KÄMPFEN_TAG: (game) => game.tags.includes("Kämpfen"),
      WISSENSCHAFT_TAG: (game) => game.tags.includes("Wissenschaft"),
      RUNDENBASIERT_TAG: (game) => game.tags.includes("Rundenbasiert"),
      KLASSISCH_TAG: (game) => game.tags.includes("Klassisch"),
      ISOMETRISCH_TAG: (game) => game.tags.includes("Isometrisch"),
      GOOD_OLD_GAMES_TAG: (game) => game.tags.includes("Good Old Games"),
      TAKTIK_RPG_TAG: (game) => game.tags.includes("Taktik-RPG"),
      CRPG_TAG: (game) => game.tags.includes("CRPG"),
      RÄTSEL_TAG: (game) => game.tags.includes("Rätsel"),
      DETEKTIVGESCHICHTEN_TAG: (game) =>
        game.tags.includes("Detektivgeschichten"),
      LEICHT_TAG: (game) => game.tags.includes("Leicht"),
      LUSTIG_TAG: (game) => game.tags.includes("Lustig"),
      POINT_AND_CLICK_TAG: (game) => game.tags.includes("Point&Click"),
      MYSTERY_TAG: (game) => game.tags.includes("Mystery"),
      ERMITTUNG_TAG: (game) => game.tags.includes("Ermittlung"),
      KURZ_TAG: (game) => game.tags.includes("Kurz"),
      ERZÄHLUNG_TAG: (game) => game.tags.includes("Erzählung"),
      NOIR_TAG: (game) => game.tags.includes("Noir"),
      GEMÜTLICH_TAG: (game) => game.tags.includes("Gemütlich"),
      KEINE_GEWALT_TAG: (game) => game.tags.includes("Keine Gewalt"),
      WELTRAUM_TAG: (game) => game.tags.includes("Weltraum"),
      VON_OBEN_ANSICHT_TAG: (game) => game.tags.includes("Von-Oben-Ansicht"),
      PROZEDURAL_GENERIERT_TAG: (game) =>
        game.tags.includes("Prozedural Generiert"),
      BULLET_HELL_TAG: (game) => game.tags.includes("Bullet Hell"),
      FLIEGEN_TAG: (game) => game.tags.includes("Fliegen"),
      LOOTER_SHOOTER_TAG: (game) => game.tags.includes("Looter Shooter"),
      VERWALTUNG_TAG: (game) => game.tags.includes("Verwaltung"),
      SCHWARZER_HUMOR_TAG: (game) => game.tags.includes("Schwarzer Humor"),
      PSYCHOLOGISCHER_HORROR_TAG: (game) =>
        game.tags.includes("Psychologischer Horror"),
      ÜBERLEBENSHORROR_TAG: (game) => game.tags.includes("Überlebenshorror"),
      LOVECRAFT_TAG: (game) => game.tags.includes("Lovecraft"),
      FISCHEN_TAG: (game) => game.tags.includes("Fischen"),
      MEHRERE_ENDEN_TAG: (game) => game.tags.includes("Mehrere Enden"),
      WEIBLICHE_PROTAGONISTIN_TAG: (game) =>
        game.tags.includes("Weibliche Protagonistin"),
      ENTSCHEIDUNGEN_ZÄHLEN_TAG: (game) =>
        game.tags.includes("Entscheidungen Zählen"),
      NICHT_JUGENDFREI_TAG: (game) => game.tags.includes("Nicht jugendfrei"),
      LGBTQ_TAG: (game) => game.tags.includes("LGBTQ+"),
      HUNDE_STREICHELN_TAG: (game) => game.tags.includes("Hunde Streicheln"),
      ECHTZEIT_TAG: (game) => game.tags.includes("Echtzeit"),
      MAGIE_TAG: (game) => game.tags.includes("Magie"),
      BRETTSPIEL_TAG: (game) => game.tags.includes("Brettspiel"),
      GEWALTÄTIG_TAG: (game) => game.tags.includes("Gewaltätig"),
      NACKTHEIT_TAG: (game) => game.tags.includes("Nacktheit"),
      NUR_AUF_GOG_TAG: (game) => game.tags.includes("Nur auf PixelPlaza"),
      LOKALER_MULTIPLAYER_TAG: (game) =>
        game.tags.includes("Lokaler Multiplayer"),
      DÜSTER_TAG: (game) => game.tags.includes("Düster"),
      UNTERGRUND_TAG: (game) => game.tags.includes("Untergrund"),
      SCHWIERIG_TAG: (game) => game.tags.includes("Schwierig"),
      PIXELGRAFIK_TAG: (game) => game.tags.includes("Pixelgrafik"),
      SEXUELLE_INHALTE_TAG: (game) => game.tags.includes("Sexuelle Inhalte"),
      WÄHLE_DEIN_EIGENES_ABENTEUER_TAG: (game) =>
        game.tags.includes("Wähle Dein Eigenes Abenteuer"),
      VERBRECHEN_TAG: (game) => game.tags.includes("Verbrechen"),
      KAMPFKUNST_TAG: (game) => game.tags.includes("Kampfkunst"),
      SCHLEICHEN_TAG: (game) => game.tags.includes("Schleichen"),
      GETEILTER_BILDSCHIRM_TAG: (game) =>
        game.tags.includes("Geteilter Bildschrim"),
      WERWÖLFE_TAG: (game) => game.tags.includes("Werwölfe"),
      VAMPIRE_TAG: (game) => game.tags.includes("Vampire"),
      ENTSPANNEND_TAG: (game) => game.tags.includes("Entspannend"),
      FIRST_WELTKRIEG_TAG: (game) => game.tags.includes("1.Weltkrieg"),
      TEXTBASIERT_TAG: (game) => game.tags.includes("textbasiert"),
      GREAT_SOUNDTRACK_TAG: (game) => game.tags.includes("Toller Soundtrack"),
      CRAFTING_TAG: (game) => game.tags.includes("Crafting"),
      MEHRSPIELER_TAG: (game) => game.tags.includes("Mehrspieler"),
      CROSSPLAY_TAG: (game) => game.tags.includes("Crossplay"),
      STEAMPUNK_TAG: (game) => game.tags.includes("Steampunk"),
      GORE_TAG: (game) => game.tags.includes("Gore"),
      MODERN_TAG: (game) => game.tags.includes("Modern"),
      WESTERN_TAG: (game) => game.tags.includes("Western"),
      JRPG_TAG: (game) => game.tags.includes("JRPG"),
      NSFW_TAG: (game) => game.tags.includes("NSFW"),
      HENTAI_TAG: (game) => game.tags.includes("Hentai"),
      EMOTIONAL_TAG: (game) => game.tags.includes("Emotional"),
      DATING_SIMULATION_TAG: (game) => game.tags.includes("Datingsimulation"),
      BEAT_EM_UP_TAG: (game) => game.tags.includes("Beat 'em up"),
      ROGUELIKE_TAG: (game) => game.tags.includes("Roguelike"),
      ROGUELITE_TAG: (game) => game.tags.includes("Roguelite"),
      DUNGEON_CRAWLER_TAG: (game) => game.tags.includes("Dungeon Crawler"),
      TWIN_STICK_SHOOTER_TAG: (game) =>
        game.tags.includes("Twin Stick Shooter"),
      KRIEG_TAG: (game) => game.tags.includes("Krieg"),
      ECHTZEITSTRATEGIE_TAG: (game) => game.tags.includes("Echtzeitstrategie"),
      CYBERPUNK_TAG: (game) => game.tags.includes("Cyberpunk"),
      REALISTISCH_TAG: (game) => game.tags.includes("Realistisch"),
      GESAMTSTRATEGIE_TAG: (game) => game.tags.includes("Gesamtstrategie"),
      LEBENSSIMULATION_TAG: (game) => game.tags.includes("Lebenssimulation"),
      NATUR_TAG: (game) => game.tags.includes("Natur"),
      AMAZON_LUNA_TAG: (game) => game.tags.includes("Amazon Luna"),
      REMAKE_TAG: (game) => game.tags.includes("Remake"),
      CARTOONGRAFIK_TAG: (game) => game.tags.includes("Cartoongrafik"),
      DEMO: (game) => game.tags.includes("Demo"),
      RETRO: (game) => game.tags.includes("Retro"),
      DYSTOPISCH: (game) => game.tags.includes("Dystopisch"),
      MYTHOLOGIE: (game) => game.tags.includes("Mythologie"),
      OST: (game) => game.tags.includes("OST"),
      HACK_AND_SLASH_TAG: (game) => game.tags.includes("Hack and Slash"),
      MILITÄRISCH_TAG: (game) => game.tags.includes("Militärisch"),
      POLITIK_TAG: (game) => game.tags.includes("Politik"),
      WINDOWS: (game) => game.platforms.includes("windows"),
      MAC: (game) => game.platforms.includes("ios"),
      LINUX: (game) => game.platforms.includes("linux"),
      ACHIEVEMENTS: (game) => game.functions.includes("Erfolge"),
      CLOUD_SAVES: (game) => game.functions.includes("Cloud-Speicherstände"),
      CONTROLLER_SUPPORT: (game) =>
        game.functions.includes("Controller-Unterstützung"),
      SINGLE_PLAYER: (game) => game.functions.includes("Einzelspieler"),
      MULTIPLAYER: (game) => game.functions.includes("Mehrspieler"),
      COOP: (game) => game.functions.includes("Koop"),
      EINBLENDUNGEN_FUNC: (game) => game.functions.includes("Einblendungen"),
      RANGLISTEN: (game) => game.functions.includes("Ranglisten"),
      RELEASE_RANGE: (game) => {
        return (
          game.releaseDate.split("-")[0] >= minReleaseDate &&
          game.releaseDate.split("-")[0] <= maxReleaseDate
        );
      },
      DEUTSCH: (game) => game.languages.includes("Deutsch"),
      ENGLISH: (game) => game.languages.includes("English"),
      DANSK: (game) => game.languages.includes("Dansk"),
      ESPAÑOL: (game) => game.languages.includes("español"),
      ESPAÑOL_AL: (game) => game.languages.includes("Español (AL)"),
      FRANÇAIS: (game) => game.languages.includes("français"),
      ITALIANO: (game) => game.languages.includes("italiano"),
      MAGYAR: (game) => game.languages.includes("magyar"),
      NEDERLANDS: (game) => game.languages.includes("nederlands"),
      POLSKI: (game) => game.languages.includes("polski"),
      PORTUGUÊS_DO_BRASIL: (game) =>
        game.languages.includes("Português do Brasil"),
      SVENSKA: (game) => game.languages.includes("svenska"),
      TÜRKÇE: (game) => game.languages.includes("Türkçe"),
      ČESKÝ: (game) => game.languages.includes("český"),
      УКРАЇНСЬКА: (game) => game.languages.includes("Українська"),
      РУССКИЙ: (game) => game.languages.includes("русский"),
      中文简体: (game) => game.languages.includes("中文(简体)"),
      中文繁體: (game) => game.languages.includes("中文(繁體)"),
      日本語: (game) => game.languages.includes("日本語"),
      한국어: (game) => game.languages.includes("한국어"),
      العربية: (game) => game.languages.includes("العربية"),
      ไทย: (game) => game.languages.includes("ไทย"),
      SLOVENSKÝ: (game) => game.languages.includes("slovenský"),
      SUOMI: (game) => game.languages.includes("Suomi"),
      ΕΛΛΗΝΙΚΆ: (game) => game.languages.includes("Ελληνικά"),
      NORSK: (game) => game.languages.includes("norsk"),
      PORTUGUÊS: (game) => game.languages.includes("português"),
      TIẾNG_VIỆT: (game) => game.languages.includes("Tiếng Việt"),
      SEARCH: (game) => {
        const searchLower = inputSearch.toLowerCase();
        const searchCapizalize =
          inputSearch.charAt(0).toUpperCase() + inputSearch.slice(1);
        return (
          game.title.toLowerCase().includes(searchLower) ||
          game.publisher.toLowerCase().includes(searchLower) ||
          game.tags.some((tag) => tag.includes(searchCapizalize))
        );
      },
    };

    return games.filter((game) => {
      const filterFunction = filterFunctions[filterCondition];
      if (filterFunction) {
        return filterFunction(game);
      }
      return true; // Default to true if no matching filter function found
    });
  };

  const checkSalesHistoryDate = useCallback(() => {
    games.forEach((game) => {
      game.salesHistory.forEach((sale) => {
        salesHistory.push({
          saleDate: sale.date,
          gameTitle: game.title,
        });
      });
    });
  }, [games, salesHistory]);

  // Check sales history date whenever the games state changes
  useEffect(() => {
    checkSalesHistoryDate();
  }, [games, checkSalesHistoryDate]);

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
      } else if (sortCondition === "Best selling (recently)") {
        const aPurchasedInJune = wasPurchasedInJune(a.salesHistory);
        const bPurchasedInJune = wasPurchasedInJune(b.salesHistory);
        if (aPurchasedInJune && !bPurchasedInJune) return -1;
        if (!aPurchasedInJune && bPurchasedInJune) return 1;
        return b.sold - a.sold;
      } else if (sortCondition === "Best selling (all time)") {
        return b.sold - a.sold;
      } else if (sortCondition === "Price (ascending)") {
        return a.price - b.price;
      } else if (sortCondition === "Price (descending)") {
        return b.price - a.price;
      } else if (sortCondition === "Discounted (descending)") {
        return b.discount - a.discount;
      } else if (sortCondition === "Title A-Z") {
        return a.title.localeCompare(b.title);
      } else if (sortCondition === "Title Z-A") {
        return b.title.localeCompare(a.title);
      } else if (sortCondition === "Release date (newest)") {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      } else if (sortCondition === "Release date (oldest)") {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      } else if (sortCondition === "Ratings (descending)") {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    });
  };

  const filteredGames = filterGames(games, filterCondition);
  const sortedGames = sortGames(filteredGames);

  return (
    <div className="main-wrapper gamespage-wrapper">
      <HeaderStore
        sortedGames={sortedGames}
        inputSearch={inputSearch}
        handleSearch={handleSearch}
        path={path}
      />
      <div className="gamespage-main-wrapper">
        <FilterStore
          minPrice={minPrice}
          setFilterCondition={setFilterCondition}
          filterCondition={filterCondition}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          inputTags={inputTags}
          setInputTags={setInputTags}
          setMinReleaseDate={setMinReleaseDate}
          setMaxReleaseDate={setMaxReleaseDate}
          minReleaseDate={minReleaseDate}
          maxReleaseDate={maxReleaseDate}
        />
        <GamesStore
          sortedGames={sortedGames}
          setSelectedItemsSort={setSelectedItemsSort}
          setSortCondition={setSortCondition}
          isScrolled={isScrolled}
          selectedItemsSort={selectedItemsSort}
        />
      </div>
    </div>
  );
};

export default GamesPage;
