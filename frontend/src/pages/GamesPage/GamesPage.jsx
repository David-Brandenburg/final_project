import { useLanguage } from "../../contexts/LanguageContext";
import { LogginContext } from "../../contexts/LogginContext";
import { useEffect, useState, useContext } from "react";
import RangeSlider from "react-range-slider-input";
import GamesModal from "../../components/HomePage/GamesModal";
import "react-range-slider-input/dist/style.css";
import "./gamespage.scss";

const GamesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);
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
  const [inputSearch, setInputSearch] = useState(""); // Stores the input for search
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
  const [selectedItemsSort, setSelectedItemsSort] = useState([,]); // Stores the selected items for sorting
  const [sortCondition, setSortCondition] = useState("ALL"); // Stores the current sort condition
  const [salesHistory] = useState([]); // Stores the sales history
  const [showListGrid, setShowListGrid] = useState(true); // Toggle for showing list/grid view
  const [isScrolled, setIsScrolled] = useState(false); // Manages the scroll state
  // Toggles the dropdown menu
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [path, setPath] = useState(window.location.href);

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

  const handNavLink = () => {
    if (path.includes("tags" && "Fantasy")) {
      setFilterCondition("FANTASY_TAG");
    } else if (path.includes("tags" && "Action")) {
      setFilterCondition("ACTION_TAG");
    } else if (
      path.includes("tags" && "Adventure") ||
      path.includes("tags" && "Abenteuer")
    ) {
      setFilterCondition("ADVENTURE_TAG");
    } else if (path.includes("tags" && "Indie")) {
      setFilterCondition("INDIE_TAG");
    } else if (
      path.includes("tags" && "Spannende_Geschichte") ||
      path.includes("tags" && "Exciting_Story")
    ) {
      setFilterCondition("SPANN_GESCHICHTE_TAG");
    } else if (
      path.includes("tags" && "Atmospharisch") ||
      path.includes("tags" && "Atmospheric")
    ) {
      setFilterCondition("ATMOSPHÄRISCH_TAG");
    } else if (
      path.includes("tags" && "Strategie") ||
      path.includes("tags" && "Strategy")
    ) {
      setFilterCondition("STRATEGIE_TAG");
    } else if (
      path.includes("tags" && "Rollenspiel") ||
      path.includes("tags" && "RPG")
    ) {
      setFilterCondition("ROLLENSPIEL_TAG");
    } else if (path.includes("tags" && "2D")) {
      setFilterCondition("2D_TAG");
    } else if (
      path.includes("tags" && "Historisch") ||
      path.includes("tags" && "Historical")
    ) {
      setFilterCondition("HISTORISCH_TAG");
    } else if (path.includes("tags" && "Horror")) {
      setFilterCondition("HORROR_TAG");
    } else if (
      path.includes("tags" && "Lokaler_Koop") ||
      path.includes("tags" && "lokaler_Koop") ||
      path.includes("tags" && "Local_Coop")
    ) {
      setFilterCondition("KOOP_TAG");
    } else if (
      path.includes("tags" && "Rollenspiel") ||
      path.includes("tags" && "RPG")
    ) {
      setFilterCondition("ROLLENSPIEL_TAG");
    } else if (path.includes("tags" && "Simulation")) {
      setFilterCondition("SIMULATION_TAG");
    } else if (path.includes("tags" && "Sport")) {
      setFilterCondition("SPORT_TAG");
    } else if (
      path.includes("tags" && "Taktisch") ||
      path.includes("tags" && "Tactical")
    ) {
      setFilterCondition("TAKTISCH_TAG");
    } else if (path.includes("tags" && "Science-Fiction")) {
      setFilterCondition("SCI_FI_TAG");
    } else if (path.includes("tags" && "Shooter")) {
      setFilterCondition("SHOOTER_TAG");
    } else if (
      path.includes("tags" && "Uberleben") ||
      path.includes("tags" && "Survival")
    ) {
      setFilterCondition("ÜBERLEBEN_TAG");
    } else if (
      path.includes("tags" && "Erkundung") ||
      path.includes("tags" && "Exploration")
    ) {
      setFilterCondition("ERKUNDUNG_TAG");
    } else if (path.includes("tags" && "First-Person")) {
      setFilterCondition("FIRST_PERSON_TAG");
    } else if (path.includes("tags" && "Third Person")) {
      setFilterCondition("THIRD_PERSON_TAG");
    } else if (
      path.includes("tags" && "Offene_Spielwelt") ||
      path.includes("tags" && "Open_World")
    ) {
      setFilterCondition("OFFENE_SPIELWELT_TAG");
    } else if (path.includes("tags" && "Sandbox")) {
      setFilterCondition("SANDBOX_TAG");
    } else if (path.includes("tags" && "FPS")) {
      setFilterCondition("FPS_TAG");
    } else if (
      path.includes("tags" && "Postapokalytisch") ||
      path.includes("tags" && "Postapocalyptic")
    ) {
      setFilterCondition("POSTAPOKALYPTISCH_TAG");
    } else if (
      path.includes("tags" && "Ressourcenverwaltung") ||
      path.includes("tags" && "Resource_Management")
    ) {
      setFilterCondition("RESSOURCENVERWALTUNG_TAG");
    } else if (path.includes("tags" && "Crafting")) {
      setFilterCondition("CRAFTING_TAG");
    } else if (
      path.includes("tags" && "Mittelalterlich") ||
      path.includes("tags" && "Medieval")
    ) {
      setFilterCondition("MITTELALTERLICH_TAG");
    } else if (
      path.includes("tags" && "Bauen") ||
      path.includes("tags" && "Building")
    ) {
      setFilterCondition("BAUEN_TAG");
    } else if (
      path.includes("tags" && "Basenbau") ||
      path.includes("tags" && "Base_Building")
    ) {
      setFilterCondition("BASENBAU_TAG");
    } else if (
      path.includes("tags" && "Städtebauer") ||
      path.includes("tags" && "City_Builder")
    ) {
      setFilterCondition("STÄDTEBAUER_TAG");
    } else if (
      path.includes("tags" && "Kämpfen") ||
      path.includes("tags" && "Fighting")
    ) {
      setFilterCondition("KÄMPFEN_TAG");
    } else if (
      path.includes("tags" && "Wissenschaft") ||
      path.includes("tags" && "Science")
    ) {
      setFilterCondition("WISSENSCHAFT_TAG");
    } else if (
      path.includes("tags" && "Rundenbasiert") ||
      path.includes("tags" && "Turn_Based")
    ) {
      setFilterCondition("RUNDENBASIERT_TAG");
    } else if (
      path.includes("tags" && "Klassisch") ||
      path.includes("tags" && "Classic")
    ) {
      setFilterCondition("KLASSISCH_TAG");
    } else if (
      path.includes("tags" && "Taktisch") ||
      path.includes("tags" && "Tactical")
    ) {
      setFilterCondition("TAKTISCH_TAG");
    } else if (
      path.includes("tags" && "Isometrisch") ||
      path.includes("tags" && "Isometric")
    ) {
      setFilterCondition("ISOMETRISCH_TAG");
    } else if (
      path.includes("tags" && "Good Old Games") ||
      path.includes("tags" && "Good_Old_Games")
    ) {
      setFilterCondition("GOOD_OLD_GAMES_TAG");
    } else if (
      path.includes("tags" && "Taktik-RPG") ||
      path.includes("tags" && "Taktik_RPG")
    ) {
      setFilterCondition("TAKTIK_RPG_TAG");
    } else if (
      path.includes("tags" && "cRPG") ||
      path.includes("tags" && "cRPG")
    ) {
      setFilterCondition("CRPG_TAG");
    } else if (
      path.includes("tags" && "Rätsel") ||
      path.includes("tags" && "Puzzle")
    ) {
      setFilterCondition("RÄTSEL_TAG");
    } else if (
      path.includes("tags" && "Detektivgeschichten") ||
      path.includes("tags" && "Detective_Stories")
    ) {
      setFilterCondition("DETEKTIVGESCHICHTEN_TAG");
    } else if (
      path.includes("tags" && "Leicht") ||
      path.includes("tags" && "Easy")
    ) {
      setFilterCondition("LEICHT_TAG");
    } else if (
      path.includes("tags" && "Lustig") ||
      path.includes("tags" && "Funny")
    ) {
      setFilterCondition("LUSTIG_TAG");
    } else if (
      path.includes("tags" && "Point&Click") ||
      path.includes("tags" && "Point_Click")
    ) {
      setFilterCondition("POINT_CLICK_TAG");
    } else if (
      path.includes("tags" && "Mystery") ||
      path.includes("tags" && "Mystery")
    ) {
      setFilterCondition("MYSTERY_TAG");
    } else if (
      path.includes("tags" && "Ermittlung") ||
      path.includes("tags" && "Investigation")
    ) {
      setFilterCondition("ERMITTUNG_TAG");
    } else if (
      path.includes("tags" && "Kurz") ||
      path.includes("tags" && "Short")
    ) {
      setFilterCondition("KURZ_TAG");
    } else if (
      path.includes("tags" && "Erzählung") ||
      path.includes("tags" && "Narrative")
    ) {
      setFilterCondition("ERZÄHLUNG_TAG");
    } else if (
      path.includes("tags" && "Noir") ||
      path.includes("tags" && "Noir")
    ) {
      setFilterCondition("NOIR_TAG");
    } else if (
      path.includes("tags" && "Gemütlich") ||
      path.includes("tags" && "Cozy")
    ) {
      setFilterCondition("GEMÜTLICH_TAG");
    } else if (
      path.includes("tags" && "Keine Gewalt") ||
      path.includes("tags" && "No Violence")
    ) {
      setFilterCondition("KEINE_GEWALT_TAG");
    } else if (path.includes("tags" && "2D") || path.includes("tags" && "2D")) {
      setFilterCondition("2D_TAG");
    } else if (
      path.includes("tags" && "Weltraum") ||
      path.includes("tags" && "Space")
    ) {
      setFilterCondition("WELTRAUM_TAG");
    } else if (
      path.includes("tags" && "Von-Oben-Ansicht") ||
      path.includes("tags" && "Top_Down")
    ) {
      setFilterCondition("VON_OBEN_ANSICHT_TAG");
    } else if (
      path.includes("tags" && "Prozedural_Generiert") ||
      path.includes("tags" && "Procedural_Generation")
    ) {
      setFilterCondition("PROZEDURAL_GENERIERT_TAG");
    } else if (
      path.includes("tags" && "Bullet_Hell") ||
      path.includes("tags" && "Bullet_Hell")
    ) {
      setFilterCondition("BULLET_HELL_TAG");
    } else if (
      path.includes("tags" && "Fliegen") ||
      path.includes("tags" && "Flying")
    ) {
      setFilterCondition("FLIEGEN_TAG");
    } else if (
      path.includes("tags" && "Looter_Shooter") ||
      path.includes("tags" && "Looter_Shooter")
    ) {
      setFilterCondition("LOOTER_SHOOTER_TAG");
    } else if (
      path.includes("tags" && "Verwaltung") ||
      path.includes("tags" && "Management")
    ) {
      setFilterCondition("VERWALTUNG_TAG");
    } else if (
      path.includes("tags" && "Schwarzer_Humor") ||
      path.includes("tags" && "Dark_Humor")
    ) {
      setFilterCondition("SCHWARZER_HUMOR_TAG");
    } else if (
      path.includes("tags" && "Psychologischer_Horror") ||
      path.includes("tags" && "Psychological_Horror")
    ) {
      setFilterCondition("PSYCHOLOGISCHER_HORROR_TAG");
    } else if (
      path.includes("tags" && "Uberlebenshorror") ||
      path.includes("tags" && "Survival_Horror")
    ) {
      setFilterCondition("ÜBERLEBENSHORROR_TAG");
    } else if (
      path.includes("tags" && "Lovecraft") ||
      path.includes("tags" && "Lovecraft")
    ) {
      setFilterCondition("LOVECRAFT_TAG");
    } else if (
      path.includes("tags" && "Fischen") ||
      path.includes("tags" && "Fishing")
    ) {
      setFilterCondition("FISCHEN_TAG");
    } else if (
      path.includes("tags" && "Mehrere_Enden") ||
      path.includes("tags" && "Multiple_Endings")
    ) {
      setFilterCondition("MEHRERE_ENDEN_TAG");
    } else if (
      path.includes("tags" && "Weibliche_Protagonistin") ||
      path.includes("tags" && "Female_Protagonist")
    ) {
      setFilterCondition("WEIBLICHE_PROTAGONISTIN_TAG");
    } else if (
      path.includes("tags" && "Entscheidungen_Zählen") ||
      path.includes("tags" && "Choices_Matter")
    ) {
      setFilterCondition("ENTSCHEIDUNGEN_ZÄHLEN_TAG");
    } else if (
      path.includes("tags" && "Nicht_jugendfrei") ||
      path.includes("tags" && "Adult")
    ) {
      setFilterCondition("NICHT_JUGENDFREI_TAG");
    } else if (
      path.includes("tags" && "LGBTQ+") ||
      path.includes("tags" && "LGBTQ+")
    ) {
      setFilterCondition("LGBTQ+_TAG");
    } else if (
      path.includes("tags" && "Hunde_Streicheln") ||
      path.includes("tags" && "Petting_Dogs")
    ) {
      setFilterCondition("HUNDE_STREICHELN_TAG");
    } else if (
      path.includes("tags" && "Echtzeit") ||
      path.includes("tags" && "Real_Time")
    ) {
      setFilterCondition("ECHTZEIT_TAG");
    } else if (
      path.includes("tags" && "Magie") ||
      path.includes("tags" && "Magic")
    ) {
      setFilterCondition("MAGIE_TAG");
    } else if (
      path.includes("tags" && "Brettspiel") ||
      path.includes("tags" && "Board_Game")
    ) {
      setFilterCondition("BRETTSPIEL_TAG");
    } else if (
      path.includes("tags" && "Lokaler_Coop") ||
      path.includes("tags" && "Local_Coop")
    ) {
      setFilterCondition("LOKALER_COOP_TAG");
    } else if (
      path.includes("tags" && "Gewaltätig") ||
      path.includes("tags" && "Violent")
    ) {
      setFilterCondition("GEWALTÄTIG_TAG");
    } else if (
      path.includes("tags" && "Nacktheit") ||
      path.includes("tags" && "Nudity")
    ) {
      setFilterCondition("NACKTHEIT_TAG");
    } else if (
      path.includes("tags" && "Nur_Auf_GOG") ||
      path.includes("tags" && "GOG_Only")
    ) {
      setFilterCondition("NUR_AUF_GOG_TAG");
    } else if (
      path.includes("tags" && "Lokaler_Multiplayer") ||
      path.includes("tags" && "Local_Multiplayer")
    ) {
      setFilterCondition("LOKALER_MULTIPLAYER_TAG");
    } else if (
      path.includes("tags" && "Düster") ||
      path.includes("tags" && "Dark")
    ) {
      setFilterCondition("DÜSTER_TAG");
    } else if (
      path.includes("tags" && "Untergrund") ||
      path.includes("tags" && "Underground")
    ) {
      setFilterCondition("UNTERGRUND_TAG");
    } else if (
      path.includes("tags" && "Schwierig") ||
      path.includes("tags" && "Difficult")
    ) {
      setFilterCondition("SCHWIERIG_TAG");
    } else if (
      path.includes("tags" && "Pixelgrafik") ||
      path.includes("tags" && "Pixel_Graphics")
    ) {
      setFilterCondition("PIXELGRAFIK_TAG");
    } else if (
      path.includes("tags" && "Sexuelle_Inhalte") ||
      path.includes("tags" && "Sexual_Content")
    ) {
      setFilterCondition("SEXUELLE_INHALTE_TAG");
    } else if (
      path.includes("tags" && "Wähle_Dein_Eigenes_Abenteuer") ||
      path.includes("tags" && "Choose_Your_Own_Adventure")
    ) {
      setFilterCondition("WÄHLE_DEIN_EIGENES_ABENTEUER_TAG");
    } else if (
      path.includes("tags" && "Verbrechen") ||
      path.includes("tags" && "Crime")
    ) {
      setFilterCondition("VERBRECHEN_TAG");
    } else if (
      path.includes("tags" && "Kampfkunst") ||
      path.includes("tags" && "Martial_Arts")
    ) {
      setFilterCondition("KAMPFKUNST_TAG");
    } else if (
      path.includes("tags" && "Schleichen") ||
      path.includes("tags" && "Stealth")
    ) {
      setFilterCondition("SCHLEICHEN_TAG");
    } else if (
      path.includes("tags" && "Geteilter Bildschrim") ||
      path.includes("tags" && "Split_Screen")
    ) {
      setFilterCondition("GETEILTER_BILDSCHIRM_TAG");
    } else if (
      path.includes("tags" && "Werwölfe") ||
      path.includes("tags" && "Werewolves")
    ) {
      setFilterCondition("WERWÖLFE_TAG");
    } else if (
      path.includes("tags" && "Vampire") ||
      path.includes("tags" && "Vampires")
    ) {
      setFilterCondition("VAMPIRE_TAG");
    } else if (
      path.includes("tags" && "Entspannend") ||
      path.includes("tags" && "Relaxing")
    ) {
      setFilterCondition("ENTSPANNEND_TAG");
    } else if (
      path.includes("tags" && "1.Weltkrieg") ||
      path.includes("tags" && "WW1")
    ) {
      setFilterCondition("1_WELTKRIEG_TAG");
    } else if (
      path.includes("tags" && "textbasiert") ||
      path.includes("tags" && "Text_Based")
    ) {
      setFilterCondition("TEXTBASIERT_TAG");
    } else if (
      path.includes("tags" && "Toller_Soundtrack") ||
      path.includes("tags" && "Great_Soundtrack")
    ) {
      setFilterCondition("GREAT_SOUNDTRACK_TAG");
    } else if (path.includes("tags" && "Crafting")) {
      setFilterCondition("CRAFTING_TAG");
    } else if (
      path.includes("tags" && "Mehrspieler") ||
      path.includes("tags" && "Multiplayer")
    ) {
      setFilterCondition("MEHRSPIELER_TAG");
    } else if (
      path.includes("tags" && "Crossplay") ||
      path.includes("tags" && "Crossplay")
    ) {
      setFilterCondition("CROSSPLAY_TAG");
    } else if (path.includes("tags" && "Steampunk")) {
      setFilterCondition("STEAMPUNK_TAG");
    } else if (path.includes("tags" && "Gore")) {
      setFilterCondition("GORE_TAG");
    } else if (path.includes("tags" && "Modern")) {
      setFilterCondition("MODERN_TAG");
    } else if (path.includes("tags" && "Western")) {
      setFilterCondition("WESTERN_TAG");
    } else if (path.includes("tags" && "Cyberpunk")) {
      setFilterCondition("CYBERPUNK_TAG");
    } else if (path.includes("tags" && "JRPG")) {
      setFilterCondition("JRPG_TAG");
    } else if (path.includes("tags" && "NSFW")) {
      setFilterCondition("NSFW_TAG");
    } else if (path.includes("tags" && "Hentai")) {
      setFilterCondition("HENTAI_TAG");
    } else if (path.includes("tags" && "Emotional")) {
      setFilterCondition("EMOTIONAL_TAG");
    } else if (path.includes("tags" && "Datingsimulation")) {
      setFilterCondition("DATING_SIMULATION_TAG");
    } else if (path.includes("tags" && "Beat 'em up")) {
      setFilterCondition("BEAT_EM_UP_TAG");
    } else if (path.includes("tags" && "Roguelike")) {
      setFilterCondition("ROGUELIKE_TAG");
    } else if (path.includes("tags" && "Roguelite")) {
      setFilterCondition("ROGUELITE_TAG");
    } else if (path.includes("tags" && "Dungeon_Crawler")) {
      setFilterCondition("DUNGEON_CRAWLER_TAG");
    } else if (path.includes("tags" && "Twin_Stick_Shooter")) {
      setFilterCondition("TWIN_STICK_SHOOTER_TAG");
    } else if (
      path.includes("tags" && "Krieg") ||
      path.includes("tags" && "War")
    ) {
      setFilterCondition("KRIEG_TAG");
    } else if (
      path.includes("tags" && "Echtzeitstrategie") ||
      path.includes("tags" && "RTS")
    ) {
      setFilterCondition("ECHTZEITSTRATEGIE_TAG");
    } else if (
      path.includes("tags" && "Realistisch") ||
      path.includes("tags" && "Realistic")
    ) {
      setFilterCondition("REALISTISCH_TAG");
    } else if (
      path.includes("tags" && "Gesamtstrategie") ||
      path.includes("tags" && "Grand_Strategy")
    ) {
      setFilterCondition("GESAMTSTRATEGIE_TAG");
    } else if (
      path.includes("tags" && "Lebenssimulation") ||
      path.includes("tags" && "Life_Simulation")
    ) {
      setFilterCondition("LEBENSSIMULATION_TAG");
    } else if (
      path.includes("tags" && "Natur") ||
      path.includes("tags" && "Nature")
    ) {
      setFilterCondition("NATUR_TAG");
    } else if (path.includes("tags" && "Amazon_Luna")) {
      setFilterCondition("AMAZON_LUNA_TAG");
    } else if (path.includes("tags" && "Remake")) {
      setFilterCondition("REMAKE_TAG");
    } else if (
      path.includes("tags" && "Cartoongrafik") ||
      path.includes("tags" && "Cartoon_Graphics")
    ) {
      setFilterCondition("CARTOONGRAFIK_TAG");
    } else if (path.includes("tags" && "Demo")) {
      setFilterCondition("DEMO_TAG");
    } else if (path.includes("tags" && "Retro")) {
      setFilterCondition("RETRO_TAG");
    } else if (
      path.includes("tags" && "Dystopisch") ||
      path.includes("tags" && "Dystopian")
    ) {
      setFilterCondition("DYSTOPISCH_TAG");
    } else if (
      path.includes("tags" && "Mythologie") ||
      path.includes("tags" && "Mythology")
    ) {
      setFilterCondition("MYTHOLOGIE_TAG");
    } else if (path.includes("tags" && "OST")) {
      setFilterCondition("OST_TAG");
    } else if (path.includes("genres" && "Indie")) {
      setFilterCondition("INDIE");
    } else if (path.includes("genres" && "action")) {
      setFilterCondition("ACTION");
    } else if (path.includes("genres" && "abenteuer")) {
      setFilterCondition("ADVENTURE");
    } else if (path.includes("genres" && "rollenspiel")) {
      setFilterCondition("RPG");
    } else if (path.includes("genres" && "Racing")) {
      setFilterCondition("RACING");
    } else if (path.includes("genres" && "strategie")) {
      setFilterCondition("STRATEGY");
    } else if (path.includes("genres" && "Sport")) {
      setFilterCondition("SPORT");
    } else if (path.includes("genres" && "Bauen")) {
      setFilterCondition("BUILD");
    } else if (path.includes("genres" && "Egoperspektive")) {
      setFilterCondition("EGO");
    } else if (path.includes("genres" && "fantasy")) {
      setFilterCondition("FANTASY");
    } else if (path.includes("genres" && "science-fiction")) {
      setFilterCondition("SCI_FI");
    } else if (path.includes("genres" && "shooter")) {
      setFilterCondition("SHOOTER");
    } else if (path.includes("genres" && "Simulation")) {
      setFilterCondition("SIMULATION");
    } else if (path.includes("genres" && "Atmospärisch")) {
      setFilterCondition("ATMOSPHERIC");
    } else if (path.includes("genres" && "Horror")) {
      setFilterCondition("HORROR");
    } else if (path.includes("genres" && "Spannende Geschichte")) {
      setFilterCondition("THRILLER");
    } else if (path.includes("genres" && "Erkundung")) {
      setFilterCondition("ERKUNDUNG");
    } else if (path.includes("genres" && "Toller Soundtrack")) {
      setFilterCondition("GREAT_SOUNDTRACK");
    } else if (path.includes("genres" && "First-Person")) {
      setFilterCondition("FIRST_PERSON");
    } else if (path.includes("genres" && "Third Person")) {
      setFilterCondition("THIRD_PERSON");
    } else if (path.includes("genres" && "open-world")) {
      setFilterCondition("OPEN_WORLD");
    } else if (path.includes("genres" && "Sandbox")) {
      setFilterCondition("SANDBOX");
    } else if (path.includes("genres" && "FPS")) {
      setFilterCondition("FPS");
    } else if (path.includes("genres" && "Postapokalyptisch")) {
      setFilterCondition("POSTAPOCALYPTIC");
    } else if (path.includes("genres" && "historisch")) {
      setFilterCondition("HISTORICAL");
    } else if (path.includes("genres" && "Ressourcenverwaltung")) {
      setFilterCondition("RESOURCE_MANAGEMENT");
    } else if (path.includes("genres" && "Crafting")) {
      setFilterCondition("CRAFTING");
    } else if (path.includes("genres" && "Mittelalterlich")) {
      setFilterCondition("MEDIEVAL");
    } else if (path.includes("genres" && "Basenbau")) {
      setFilterCondition("BASE_BUILDING");
    } else if (path.includes("genres" && "Städtebauer")) {
      setFilterCondition("CITY_BUILDER");
    } else if (path.includes("genres" && "Bauen")) {
      setFilterCondition("BUILDING");
    } else if (path.includes("genres" && "Kämpfen")) {
      setFilterCondition("FIGHTING");
    } else if (path.includes("genres" && "Wissenschaft")) {
      setFilterCondition("SCIENCE");
    } else if (path.includes("genres" && "Rundenbasiert")) {
      setFilterCondition("TURN_BASED");
    } else if (path.includes("genres" && "Klassisch")) {
      setFilterCondition("CLASSIC");
    } else if (path.includes("genres" && "Taktisch")) {
      setFilterCondition("TACTICAL");
    } else if (path.includes("genres" && "Isometrisch")) {
      setFilterCondition("ISOMETRIC");
    } else if (path.includes("genres" && "Good Old Games")) {
      setFilterCondition("GOOD_OLD_GAMES");
    } else if (path.includes("genres" && "Taktik-RPG")) {
      setFilterCondition("TACTICAL_RPG");
    } else if (path.includes("genres" && "cRPG")) {
      setFilterCondition("CRPG");
    } else if (path.includes("genres" && "Rätsel")) {
      setFilterCondition("RÄTSEL");
    } else if (path.includes("genres" && "puzzle")) {
      setFilterCondition("PUZZLE");
    } else if (path.includes("genres" && "Detektivgeschichten")) {
      setFilterCondition("DETECTIVE");
    } else if (path.includes("genres" && "Leicht")) {
      setFilterCondition("EASY");
    } else if (path.includes("genres" && "Lustig")) {
      setFilterCondition("FUNNY");
    } else if (path.includes("genres" && "Point&Click")) {
      setFilterCondition("POINT_CLICK");
    } else if (path.includes("genres" && "Mystery")) {
      setFilterCondition("MYSTERY");
    } else if (path.includes("genres" && "Ermittlung")) {
      setFilterCondition("INVESTIGATION");
    } else if (path.includes("genres" && "Kurz")) {
      setFilterCondition("SHORT");
    } else if (path.includes("genres" && "Erzählung")) {
      setFilterCondition("STORY_RICH");
    } else if (path.includes("genres" && "Noir")) {
      setFilterCondition("NOIR");
    } else if (path.includes("genres" && "Gemütlich")) {
      setFilterCondition("RELAXING");
    } else if (path.includes("genres" && "Keine Gewalt")) {
      setFilterCondition("NO_VIOLENCE");
    } else if (path.includes("genres" && "2D")) {
      setFilterCondition("2D");
    } else if (path.includes("genres" && "Weltraum")) {
      setFilterCondition("SPACE");
    } else if (path.includes("genres" && "Von-Oben-Ansicht")) {
      setFilterCondition("TOP_DOWN");
    } else if (path.includes("genres" && "Prozedural Generiert")) {
      setFilterCondition("PROCEDURAL_GENERATION");
    } else if (path.includes("genres" && "Bullet Hell")) {
      setFilterCondition("BULLET_HELL");
    } else if (path.includes("genres" && "Fliegen")) {
      setFilterCondition("FLYING");
    } else if (path.includes("genres" && "Looter Shooter")) {
      setFilterCondition("LOOTER_SHOOTER");
    } else if (path.includes("genres" && "Verwaltung")) {
      setFilterCondition("MANAGEMENT");
    } else if (path.includes("genres" && "Schwarzer Humor")) {
      setFilterCondition("DARK_HUMOR");
    } else if (path.includes("genres" && "Psychologischer Horror")) {
      setFilterCondition("PSYCHOLOGICAL_HORROR");
    } else if (path.includes("genres" && "Uberlebenshorror")) {
      setFilterCondition("SURVIVAL_HORROR");
    } else if (path.includes("genres" && "Lovecraft")) {
      setFilterCondition("LOVECRAFTIAN");
    } else if (path.includes("genres" && "Fischen")) {
      setFilterCondition("FISHING");
    } else if (path.includes("genres" && "Mehrere Enden")) {
      setFilterCondition("MULTIPLE_ENDINGS");
    } else if (path.includes("genres" && "Weibliche Protagonistin")) {
      setFilterCondition("FEMALE_PROTAGONIST");
    } else if (path.includes("genres" && "Entscheidungen Zählen")) {
      setFilterCondition("CHOICES_MATTER");
    } else if (path.includes("genres" && "Nicht jugendfrei")) {
      setFilterCondition("ADULT");
    } else if (path.includes("genres" && "JRPG")) {
      setFilterCondition("JRPG");
    } else if (path.includes("genres" && "LGBTQ+")) {
      setFilterCondition("LGBTQ+");
    } else if (path.includes("genres" && "Hunde Streicheln")) {
      setFilterCondition("DOG");
    } else if (path.includes("genres" && "Echtzeit")) {
      setFilterCondition("REAL_TIME");
    } else if (path.includes("genres" && "Magie")) {
      setFilterCondition("MAGIC");
    } else if (path.includes("genres" && "Brettspiel")) {
      setFilterCondition("BOARD_GAME");
    } else if (path.includes("genres" && "Lokaler Coop")) {
      setFilterCondition("LOCAL_COOP");
    } else if (path.includes("genres" && "Entscheidungen zählen")) {
      setFilterCondition("CHOICES_MATTER2");
    } else if (path.includes("genres" && "Gewalttätig")) {
      setFilterCondition("VIOLENT");
    } else if (path.includes("genres" && "Nacktheit")) {
      setFilterCondition("NUDITY");
    } else if (path.includes("genres" && "Nur Auf GOG")) {
      setFilterCondition("GOG_ONLY");
    } else if (path.includes("genres" && "Lokaler Multiplayer")) {
      setFilterCondition("LOCAL_MULTIPLAYER");
    } else if (path.includes("genres" && "Düster")) {
      setFilterCondition("DARK");
    } else if (path.includes("genres" && "Untergrund")) {
      setFilterCondition("UNDERGROUND");
    } else if (path.includes("genres" && "Schwierig")) {
      setFilterCondition("DIFFICULT");
    } else if (path.includes("genres" && "Pixelgrafik")) {
      setFilterCondition("PIXEL_GRAPHICS");
    } else if (path.includes("genres" && "Sexuelle Inhalte")) {
      setFilterCondition("SEXUAL_CONTENT");
    } else if (path.includes("genres" && "Wähle Dein Eigenes Abenteuer")) {
      setFilterCondition("CHOOSE_YOUR_OWN_ADVENTURE");
    } else if (path.includes("genres" && "Verbrechen")) {
      setFilterCondition("CRIME");
    } else if (path.includes("genres" && "Kampfkunst")) {
      setFilterCondition("MARTIAL_ARTS");
    } else if (path.includes("genres" && "Schleichen")) {
      setFilterCondition("STEALTH");
    } else if (path.includes("genres" && "Geteilter Bildschrim")) {
      setFilterCondition("SPLIT_SCREEN");
    } else if (path.includes("genres" && "Werwölfe")) {
      setFilterCondition("WEREWOLVES");
    } else if (path.includes("genres" && "Vampire")) {
      setFilterCondition("VAMPIRES");
    } else if (path.includes("genres" && "Entspannend")) {
      setFilterCondition("RELAXING");
    } else if (path.includes("genres" && "1.Weltkrieg")) {
      setFilterCondition("WW1");
    } else if (path.includes("genres" && "textbasiert")) {
      setFilterCondition("TEXT_BASED");
    }
  };

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
    handNavLink();
    setSortCondition("Meistverkauft (kürzlich)");
    setSelectedItemsSort([
      language === "en"
        ? "Best selling (recently)"
        : "Meistverkauft (kürzlich)",
    ]);
  }, [language]);

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

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
    setFilterCondition("SEARCH");
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
        return game.genres.includes("Simulation");
      } else if (filterCondition === "SPORT") {
        return game.genres.includes("sport");
      } else if (filterCondition === "STRATEGY") {
        return game.genres.includes("strategie");
      } else if (filterCondition === "BUILD") {
        return game.genres.includes("Bauen");
      } else if (filterCondition === "EGO") {
        return game.genres.includes("Egoperspektive");
      } else if (filterCondition === "FANTASY") {
        return game.genres.includes("fantasy");
      } else if (filterCondition === "SCI_FI") {
        return game.genres.includes("science-fiction");
      } else if (filterCondition === "SHOOTER") {
        return game.genres.includes("Shooter");
      } else if (filterCondition === "ATMOSPHERIC") {
        return game.genres.includes("Atmosphärisch");
      } else if (filterCondition === "HORROR") {
        return game.genres.includes("Horror");
      } else if (filterCondition === "THRILLER") {
        return game.genres.includes("Spannende Geschichte");
      } else if (filterCondition === "ERKUNDUNG") {
        return game.genres.includes("Erkundung");
      } else if (filterCondition === "GREAT_SOUNDTRACK") {
        return game.genres.includes("Toller Soundtrack");
      } else if (filterCondition === "FIRST_PERSON") {
        return game.genres.includes("First-Person");
      } else if (filterCondition === "THIRD_PERSON") {
        return game.genres.includes("Third Person");
      } else if (filterCondition === "OPEN_WORLD") {
        return game.genres.includes("open-world");
      } else if (filterCondition === "SANDBOX") {
        return game.genres.includes("Sandbox");
      } else if (filterCondition === "FPS") {
        return game.genres.includes("FPS");
      } else if (filterCondition === "POSTAPOCALYPTIC") {
        return game.genres.includes("Postapokalyptisch");
      } else if (filterCondition === "HISTORICAL") {
        return game.genres.includes("historisch");
      } else if (filterCondition === "RESOURCE_MANAGEMENT") {
        return game.genres.includes("Ressourcenverwaltung");
      } else if (filterCondition === "CRAFTING") {
        return game.genres.includes("Crafting");
      } else if (filterCondition === "MEDIEVAL") {
        return game.genres.includes("Mittelalterlich");
      } else if (filterCondition === "BASE_BUILDING") {
        return game.genres.includes("Basenbau");
      } else if (filterCondition === "CITY_BUILDER") {
        return game.genres.includes("Städtebauer");
      } else if (filterCondition === "BUILDING") {
        return game.genres.includes("bauen");
      } else if (filterCondition === "FIGHTING") {
        return game.genres.includes("Kämpfen");
      } else if (filterCondition === "SCIENCE") {
        return game.genres.includes("Wissenschaft");
      } else if (filterCondition === "TURN_BASED") {
        return game.genres.includes("Rundenbasiert");
      } else if (filterCondition === "CLASSIC") {
        return game.genres.includes("Klassisch");
      } else if (filterCondition === "ISOMETRIC") {
        return game.genres.includes("Isometrisch");
      } else if (filterCondition === "GOOD_OLD_GAMES") {
        return game.genres.includes("Good Old Games");
      } else if (filterCondition === "TACTICAL_RPG") {
        return game.genres.includes("Taktik-RPG");
      } else if (filterCondition === "CRPG") {
        return game.genres.includes("CRPG");
      } else if (filterCondition === "RÄTSEL") {
        return game.genres.includes("Rätsel");
      } else if (filterCondition === "PUZZLE") {
        return game.genres.includes("Puzzle");
      } else if (filterCondition === "DETECTIVE") {
        return game.genres.includes("Detektivgeschichten");
      } else if (filterCondition === "EASY") {
        return game.genres.includes("Einfach");
      } else if (filterCondition === "FUNNY") {
        return game.genres.includes("Lustig");
      } else if (filterCondition === "POINT_CLICK") {
        return game.genres.includes("Point&Click");
      } else if (filterCondition === "MYSTERY") {
        return game.genres.includes("Mystery");
      } else if (filterCondition === "INVETIGATION") {
        return game.genres.includes("Ermittlung");
      } else if (filterCondition === "SHORT") {
        return game.genres.includes("Kurz");
      } else if (filterCondition === "STORY_RICH") {
        return game.genres.includes("Erzählung");
      } else if (filterCondition === "NOIR") {
        return game.genres.includes("Noir");
      } else if (filterCondition === "RELAXING") {
        return game.genres.includes("Gemütlich");
      } else if (filterCondition === "NO_VIOLENCE") {
        return game.genres.includes("Keine Gewalt");
      } else if (filterCondition === "2D") {
        return game.genres.includes("2D");
      } else if (filterCondition === "SPACE") {
        return game.genres.includes("Weltraum");
      } else if (filterCondition === "TOP_DOWN") {
        return game.genres.includes("Von-Oben-Ansicht");
      } else if (filterCondition === "PROCEDURAL_GENERATION") {
        return game.genres.includes("Prozedural Generiert");
      } else if (filterCondition === "BULLET_HELL") {
        return game.genres.includes("Bullet Hell");
      } else if (filterCondition === "FLYING") {
        return game.genres.includes("Fliegen");
      } else if (filterCondition === "LOOTER_SHOOTER") {
        return game.genres.includes("Looter Shooter");
      } else if (filterCondition === "MANAGEMENT") {
        return game.genres.includes("Verwaltung");
      } else if (filterCondition === "DARK_HUMOR") {
        return game.genres.includes("Schwarzer Humor");
      } else if (filterCondition === "PSYCHOLOGICAL_HORROR") {
        return game.genres.includes("Psychologischer Horror");
      } else if (filterCondition === "SURVAIVAL_HORROR") {
        return game.genres.includes("Überlebenshorror");
      } else if (filterCondition === "LOVECRAFTIAN") {
        return game.genres.includes("Lovecraft");
      } else if (filterCondition === "FISHING") {
        return game.genres.includes("Fischen");
      } else if (filterCondition === "MULTIPLE_ENDINGS") {
        return game.genres.includes("Mehrere Enden");
      } else if (filterCondition === "FEMALE_PROTAGONIST") {
        return game.genres.includes("Weibliche Protagonistin");
      } else if (filterCondition === "CHOICES_MATTER") {
        return game.genres.includes("Entscheidungen Zählen");
      } else if (filterCondition === "ADULT") {
        return game.genres.includes("Nicht jugendfrei");
      } else if (filterCondition === "JRPG") {
        return game.genres.includes("JRPG");
      } else if (filterCondition === "LGBTQ+") {
        return game.genres.includes("LGBTQ+");
      } else if (filterCondition === "DOG") {
        return game.genres.includes("Hunde streicheln");
      } else if (filterCondition === "REAL_TIME") {
        return game.genres.includes("Echtzeit");
      } else if (filterCondition === "MAGIC") {
        return game.genres.includes("Magie");
      } else if (filterCondition === "BOARD_GAME") {
        return game.genres.includes("Brettspiel");
      } else if (filterCondition === "LOCAL_COOP") {
        return game.genres.includes("Lokaler Coop");
      } else if (filterCondition === "CHOICES_MATTER2") {
        return game.genres.includes("Entscheidungen zählen");
      } else if (filterCondition === "VIOLENT") {
        return game.genres.includes("Gewalttätig");
      } else if (filterCondition === "NUDITY") {
        return game.genres.includes("Nacktheit");
      } else if (filterCondition === "SEXUAL_CONTENT") {
        return game.genres.includes("Sexuelle Inhalte");
      } else if (filterCondition === "GOG_ONLY") {
        return game.genres.includes("Nur Auf GOG");
      } else if (filterCondition === "LOCAL_MULTIPLAYER") {
        return game.genres.includes("Lokaler Multiplayer");
      } else if (filterCondition === "DARK") {
        return game.genres.includes("Düster");
      } else if (filterCondition === "UNDERGROUND") {
        return game.genres.includes("Untergrund");
      } else if (filterCondition === "DIFFICULT") {
        return game.genres.includes("Schwierig");
      } else if (filterCondition === "PIXEL_GRAPHICS") {
        return game.genres.includes("Pixelgrafik");
      } else if (filterCondition === "CHOOSE_YOUR_OWN_ADVENTURE") {
        return game.genres.includes("Wähle dein eigenes Abenteuer");
      } else if (filterCondition === "CRIME") {
        return game.genres.includes("Verbrechen");
      } else if (filterCondition === "MARTIAL_ARTS") {
        return game.genres.includes("Kampfkunst");
      } else if (filterCondition === "STEALTH") {
        return game.genres.includes("Schleichen");
      } else if (filterCondition === "SPLIT_SCREEN") {
        return game.genres.includes("Geteilter Bildschirm");
      } else if (filterCondition === "WEREWOLVES") {
        return game.genres.includes("Werwölfe");
      } else if (filterCondition === "VAMPIRES") {
        return game.genres.includes("Vampire");
      } else if (filterCondition === "RELAXING") {
        return game.genres.includes("Entspannend");
      } else if (filterCondition === "WW1") {
        return game.genres.includes("1. Weltkrieg");
      } else if (filterCondition === "TEXT_BASED") {
        return game.genres.includes("Textbasiert");
      } else if (filterCondition === "TAG_SEARCH") {
        if (!inputTags || inputTags.trim() === "") {
          return true;
        }

        const searchLower = inputTags.toLowerCase();

        return (
          game.tags &&
          game.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
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
        return game.tags.includes("Science Fiction");
      } else if (filterCondition === "HISTORISCH_TAG") {
        return game.tags.includes("Historisch");
      } else if (filterCondition === "HORROR_TAG") {
        return game.tags.includes("Horror");
      } else if (filterCondition === "KOOP_TAG") {
        return game.tags.includes("Lokaler Coop");
      } else if (filterCondition === "SIMULATION_TAG") {
        return game.tags.includes("Simulation");
      } else if (filterCondition === "TAKTISCH_TAG") {
        return game.tags.includes("Taktisch");
      } else if (filterCondition === "SHOOTER_TAG") {
        return game.tags.includes("Shooter");
      } else if (filterCondition === "ÜBERLEBEN_TAG") {
        return game.tags.includes("Überleben");
      } else if (filterCondition === "ERKUNDUNG_TAG") {
        return game.tags.includes("Erkundung");
      } else if (filterCondition === "TOLLER_SOUNDTRACK_TAG") {
        return game.tags.includes("Toller Soundtrack");
      } else if (filterCondition === "FIRST_PERSON_TAG") {
        return game.tags.includes("First-Person");
      } else if (filterCondition === "THIRD_PERSON_TAG") {
        return game.tags.includes("Third Person");
      } else if (filterCondition === "OFFENE_SPIELWELT_TAG") {
        return game.tags.includes("Offene Spielwelt");
      } else if (filterCondition === "SANDBOX_TAG") {
        return game.tags.includes("Sandbox");
      } else if (filterCondition === "FPS_TAG") {
        return game.tags.includes("FPS");
      } else if (filterCondition === "POSTAPOKALYPTISCH_TAG") {
        return game.tags.includes("Postapokalyptisch");
      } else if (filterCondition === "RESSOURCENVERWALTUNG_TAG") {
        return game.tags.includes("Ressourcenverwaltung");
      } else if (filterCondition === "CRAFTING_TAG") {
        return game.tags.includes("Crafting");
      } else if (filterCondition === "MITTELALTERLICH_TAG") {
        return game.tags.includes("Mittelalterlich");
      } else if (filterCondition === "BAUEN_TAG") {
        return game.tags.includes("Bauen");
      } else if (filterCondition === "BASENBAU_TAG") {
        return game.tags.includes("Basenbau");
      } else if (filterCondition === "STÄDTEBAUER_TAG") {
        return game.tags.includes("Städtebauer");
      } else if (filterCondition === "KÄMPFEN_TAG") {
        return game.tags.includes("Kämpfen");
      } else if (filterCondition === "WISSENSCHAFT_TAG") {
        return game.tags.includes("Wissenschaft");
      } else if (filterCondition === "RUNDENBASIERT_TAG") {
        return game.tags.includes("Rundenbasiert");
      } else if (filterCondition === "KLASSISCH_TAG") {
        return game.tags.includes("Klassisch");
      } else if (filterCondition === "ISOMETRISCH_TAG") {
        return game.tags.includes("Isometrisch");
      } else if (filterCondition === "GOOD_OLD_GAMES_TAG") {
        return game.tags.includes("Good Old Games");
      } else if (filterCondition === "TAKTIK_RPG_TAG") {
        return game.tags.includes("Taktik-RPG");
      } else if (filterCondition === "CRPG_TAG") {
        return game.tags.includes("CRPG");
      } else if (filterCondition === "RÄTSEL_TAG") {
        return game.tags.includes("Rätsel");
      } else if (filterCondition === "DETEKTIVGESCHICHTEN_TAG") {
        return game.tags.includes("Detektivgeschichten");
      } else if (filterCondition === "LEICHT_TAG") {
        return game.tags.includes("Leicht");
      } else if (filterCondition === "LUSTIG_TAG") {
        return game.tags.includes("Lustig");
      } else if (filterCondition === "POINT_CLICK_TAG") {
        return game.tags.includes("Point&Click");
      } else if (filterCondition === "MYSTERY_TAG") {
        return game.tags.includes("Mystery");
      } else if (filterCondition === "ERMITTLUNG_TAG") {
        return game.tags.includes("Ermittlung");
      } else if (filterCondition === "KURZ_TAG") {
        return game.tags.includes("Kurz");
      } else if (filterCondition === "ERZÄHLUNG_TAG") {
        return game.tags.includes("Erzählung");
      } else if (filterCondition === "NOIR_TAG") {
        return game.tags.includes("Noir");
      } else if (filterCondition === "GEMÜTLICH_TAG") {
        return game.tags.includes("Gemütlich");
      } else if (filterCondition === "KEINE_GEWALT_TAG") {
        return game.tags.includes("Keine Gewalt");
      } else if (filterCondition === "WELTRAUM_TAG") {
        return game.tags.includes("Weltraum");
      } else if (filterCondition === "VON_OBEN_ANSICHT_TAG") {
        return game.tags.includes("Von-Oben-Ansicht");
      } else if (filterCondition === "PROZEDURAL_GENERIERT_TAG") {
        return game.tags.includes("Prozedural Generiert");
      } else if (filterCondition === "BULLET_HELL_TAG") {
        return game.tags.includes("Bullet Hell");
      } else if (filterCondition === "FLIEGEN_TAG") {
        return game.tags.includes("Fliegen");
      } else if (filterCondition === "LOOTER_SHOOTER_TAG") {
        return game.tags.includes("Looter Shooter");
      } else if (filterCondition === "VERWALTUNG_TAG") {
        return game.tags.includes("Verwaltung");
      } else if (filterCondition === "SCHWARZER_HUMOR_TAG") {
        return game.tags.includes("Schwarzer Humor");
      } else if (filterCondition === "PSYCHOLOGISCHER_HORROR_TAG") {
        return game.tags.includes("Psychologischer Horror");
      } else if (filterCondition === "ÜBERLEBENSHORROR_TAG") {
        return game.tags.includes("Überlebenshorror");
      } else if (filterCondition === "LOVECRAFT_TAG") {
        return game.tags.includes("Lovecraft");
      } else if (filterCondition === "FISCHEN_TAG") {
        return game.tags.includes("Fischen");
      } else if (filterCondition === "MEHRERE_ENDEN_TAG") {
        return game.tags.includes("Mehrere Enden");
      } else if (filterCondition === "WEIBLICHE_PROTAGONISTIN_TAG") {
        return game.tags.includes("Weibliche Protagonistin");
      } else if (filterCondition === "ENTSCHEIDUNGEN_ZÄHLEN_TAG") {
        return game.tags.includes("Entscheidungen Zählen");
      } else if (filterCondition === "NICHT_JUGENDFREI_TAG") {
        return game.tags.includes("Nicht jugendfrei");
      } else if (filterCondition === "LGBTQ+_TAG") {
        return game.tags.includes("LGBTQ+");
      } else if (filterCondition === "HUNDE_STREICHELN_TAG") {
        return game.tags.includes("Hunde streicheln");
      } else if (filterCondition === "ECHTZEIT_TAG") {
        return game.tags.includes("Echtzeit");
      } else if (filterCondition === "MAGIE_TAG") {
        return game.tags.includes("Magie");
      } else if (filterCondition === "BRETTSPIEL_TAG") {
        return game.tags.includes("Brettspiel");
      } else if (filterCondition === "GEWALTÄTIG_TAG") {
        return game.tags.includes("Gewaltätig");
      } else if (filterCondition === "NACKTHEIT_TAG") {
        return game.tags.includes("Nacktheit");
      } else if (filterCondition === "NUR_AUF_GOG_TAG") {
        return game.tags.includes("Nur auf GOG");
      } else if (filterCondition === "LOKALER_MULTIPLAYER_TAG") {
        return game.tags.includes("Lokaler Multiplayer");
      } else if (filterCondition === "DÜSTER_TAG") {
        return game.tags.includes("Düster");
      } else if (filterCondition === "UNTERGRUND_TAG") {
        return game.tags.includes("Untergrund");
      } else if (filterCondition === "SCHWIERIG_TAG") {
        return game.tags.includes("Schwierig");
      } else if (filterCondition === "PIXELGRAFIK_TAG") {
        return game.tags.includes("Pixelgrafik");
      } else if (filterCondition === "SEXUELLE_INHALTE_TAG") {
        return game.tags.includes("Sexuelle Inhalte");
      } else if (filterCondition === "WÄHLE_DEIN_EIGENES_ABENTEUER_TAG") {
        return game.tags.includes("Wähle Dein Eigenes Abenteuer");
      } else if (filterCondition === "VERBRECHEN_TAG") {
        return game.tags.includes("Verbrechen");
      } else if (filterCondition === "KAMPFKUNST_TAG") {
        return game.tags.includes("Kampfkunst");
      } else if (filterCondition === "SCHLEICHEN_TAG") {
        return game.tags.includes("Schleichen");
      } else if (filterCondition === "GETEILTER_BILDSCHIRM_TAG") {
        return game.tags.includes("Geteilter Bildschirm");
      } else if (filterCondition === "WERWÖLFE_TAG") {
        return game.tags.includes("Werwölfe");
      } else if (filterCondition === "VAMPIRE_TAG") {
        return game.tags.includes("Vampire");
      } else if (filterCondition === "ENTSPANNEND_TAG") {
        return game.tags.includes("Entspannend");
      } else if (filterCondition === "1_WELTKRIEG_TAG") {
        return game.tags.includes("1. Weltkrieg");
      } else if (filterCondition === "TEXTBASIERT_TAG") {
        return game.tags.includes("Textbasiert");
      } else if (filterCondition === "CRAFTING_TAG") {
        return game.tags.includes("Crafting");
      } else if (filterCondition === "MEHRSPIELER_TAG") {
        return game.tags.includes("Mehrspieler");
      } else if (filterCondition === "CROSS_PLATFORM_TAG") {
        return game.tags.includes("Crossplay");
      } else if (filterCondition === "STEAMPUNK_TAG") {
        return game.tags.includes("Steampunk");
      } else if (filterCondition === "GORE_TAG") {
        return game.tags.includes("Gore");
      } else if (filterCondition === "MODERN_TAG") {
        return game.tags.includes("Modern");
      } else if (filterCondition === "WESTERN_TAG") {
        return game.tags.includes("Western");
      } else if (filterCondition === "JRPG_TAG") {
        return game.tags.includes("JRPG");
      } else if (filterCondition === "NSFW_TAG") {
        return game.tags.includes("NSFW");
      } else if (filterCondition === "HENTAI_TAG") {
        return game.tags.includes("Hentai");
      } else if (filterCondition === "EMOTIONAL_TAG") {
        return game.tags.includes("Emotional");
      } else if (filterCondition === "DATING_SIMULATION_TAG") {
        return game.tags.includes("Datingsimulation");
      } else if (filterCondition === "BEAT_EM_UP_TAG") {
        return game.tags.includes("Beat'em up");
      } else if (filterCondition === "ROGUE_LIKE_TAG") {
        return game.tags.includes("Roguelike");
      } else if (filterCondition === "ROGUE_LITE_TAG") {
        return game.tags.includes("Roguelite");
      } else if (filterCondition === "DUNGEON_CRAWLER_TAG") {
        return game.tags.includes("Dungeon Crawler");
      } else if (filterCondition === "TWIN_STICK_SHOOTER_TAG") {
        return game.tags.includes("Twin Stick Shooter");
      } else if (filterCondition === "CYBERPUNK_TAG") {
        return game.tags.includes("Cyberpunk");
      } else if (filterCondition === "KRIEG_TAG") {
        return game.tags.includes("Krieg");
      } else if (filterCondition === "ECHTZEIT_STRATEGIE_TAG") {
        return game.tags.includes("Echtzeitstrategie");
      } else if (filterCondition === "REALISTISCH_TAG") {
        return game.tags.includes("Realistisch");
      } else if (filterCondition === "GESAMTSTRATEGIE_TAG") {
        return game.tags.includes("Gesamtstrategie");
      } else if (filterCondition === "LEBENSSIMULATION_TAG") {
        return game.tags.includes("Lebenssimulation");
      } else if (filterCondition === "NATUR_TAG") {
        return game.tags.includes("Natur");
      } else if (filterCondition === "AMAZON_LUNA_TAG") {
        return game.tags.includes("Amazon Luna");
      } else if (filterCondition === "REMAKE_TAG") {
        return game.tags.includes("Remake");
      } else if (filterCondition === "CARTOONGRAFIK_TAG") {
        return game.tags.includes("Cartoongrafik");
      } else if (filterCondition === "DEMO_TAG") {
        return game.tags.includes("Demo");
      } else if (filterCondition === "RETRO_TAG") {
        return game.tags.includes("Retro");
      } else if (filterCondition === "DYSTOPISCH_TAG") {
        return game.tags.includes("Dystopisch");
      } else if (filterCondition === "MYTHOLOGIE_TAG") {
        return game.tags.includes("Mythologie");
      } else if (filterCondition === "OST_TAG") {
        return game.tags.includes("OST");
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
      } else if (filterCondition === "SEARCH") {
        if (!inputSearch || inputSearch.trim() === "") {
          return true;
        }

        const searchLower = inputSearch.toLowerCase();

        return (
          (game.title && game.title.toLowerCase().includes(searchLower)) ||
          (game.publisher &&
            game.publisher.toLowerCase().includes(searchLower)) ||
          (game.tags &&
            game.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
        );
      } else if (filterCondition === "SANDBOX") {
        return game.tags.includes("Sandbox");
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

  const filteredGames = filterGames(games);
  const sortedGames = sortGames(filteredGames);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = sortedGames.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(sortedGames.length / gamesPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDirectPageChange = (page) => {
    setCurrentPage(page);
  };

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
            value={inputSearch}
            onChange={handleSearch}
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
                      checked={filterCondition === "RACING"}
                      onChange={handleRacing}
                    />
                    <span className="checkmark"></span>
                    {language === "en" ? " Racing" : " Rennen"}
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
                      checked={filterCondition === "SPORT"}
                      onChange={handleSport}
                    />
                    <span className="checkmark"></span>
                    {language === "en" ? " Sport" : " Sport"}
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
                    {language === "en"
                      ? " Role-playing"
                      : " Spannende Geschichte"}
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
          <div
            className={`gamespage-main-games-header ${
              isScrolled ? "scrolled" : ""
            }`}>
            <div className="gamespage-main-games-header-left-pagination">
              <i
                className="bi bi-caret-left"
                onClick={() => handlePageChange("prev")}></i>
              <span
                className={`pagination-page-number ${
                  currentPage ? "active" : ""
                }`}>{`${currentPage}`}</span>{" "}
              von <span>{`${totalPages}`}</span>
              <i
                className="bi bi-caret-right"
                onClick={() => handlePageChange("next")}></i>
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
            {currentGames.length > 0 ? (
              currentGames.map((game, index) => (
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
          <div className="gamespage-main-pagination-pages">
            <i
              className="bi bi-caret-left"
              onClick={() => handlePageChange("prev")}></i>
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index + 1}
                className={`pagination-page-number ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handleDirectPageChange(index + 1)}>
                {index + 1}
              </span>
            ))}
            <i
              className="bi bi-caret-right"
              onClick={() => handlePageChange("next")}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
