import { useLanguage } from "../../contexts/LanguageContext";
import HeaderStore from "../../components/StorePage/HeaderStore";
import { useEffect, useState, useContext } from "react";

import "react-range-slider-input/dist/style.css";
import "./storepage.scss";
import FilterStore from "../../components/StorePage/FilterStore";
import GamesStore from "../../components/StorePage/GamesStore";

const GamesPage = () => {
  // Get the current language from the LanguageContext
  const { language } = useLanguage();

  // State variables to manage various aspects of the games page
  const [games, setGames] = useState([]); // Stores the list of games

  const [inputTags, setInputTags] = useState(""); // Stores the input for tag search
  const [inputSearch, setInputSearch] = useState(""); // Stores the input for search
  const [minPrice, setMinPrice] = useState("0"); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState("120"); // Maximum price filter

  const [minReleaseDate, setMinReleaseDate] = useState("1980"); // Minimum release date filter
  const [maxReleaseDate, setMaxReleaseDate] = useState("2024"); // Maximum release date filter

  const [filterCondition, setFilterCondition] = useState("ALL"); // Stores the current filter condition

  const [selectedItemsSort, setSelectedItemsSort] = useState([,]); // Stores the selected items for sorting
  const [sortCondition, setSortCondition] = useState("ALL"); // Stores the current sort condition
  const [salesHistory] = useState([]); // Stores the sales history
  const [isScrolled, setIsScrolled] = useState(false); // Manages the scroll state
  // Toggles the dropdown menu

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
      path.includes("tags" && "Administration")
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
      path.includes("tags" && "Nur_auf_PixelPlaza") ||
      path.includes("tags" && "Only_On_PixelPlaza")
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
    } else if (
      path.includes("tags" && "Militärisch") ||
      path.includes("tags" && "Military")
    ) {
      setFilterCondition("MILITÄRISCH_TAG");
    } else if (
      path.includes("tags" && "Politik") ||
      path.includes("tags" && "Politics")
    ) {
      setFilterCondition("POLITIK_TAG");
    } else if (path.includes("tags" && "Hack and Slash")) {
      setFilterCondition("HACK_AND_SLASH_TAG");
    } else if (path.includes("genres" && "Action")) {
      setFilterCondition("ACTION");
    } else if (path.includes("genres" && "Abenteuer")) {
      setFilterCondition("ADVENTURE");
    } else if (path.includes("genres" && "Rollenspiel")) {
      setFilterCondition("RPG");
    } else if (path.includes("genres" && "Strategie")) {
      setFilterCondition("STRATEGY");
    } else if (path.includes("genres" && "Bauen")) {
      setFilterCondition("BUILD");
    } else if (path.includes("genres" && "Egoperspektive")) {
      setFilterCondition("EGO");
    } else if (path.includes("genres" && "Fantasy")) {
      setFilterCondition("FANTASY");
    } else if (path.includes("genres" && "Science-fiction")) {
      setFilterCondition("SCI_FI");
    } else if (path.includes("genres" && "Shooter")) {
      setFilterCondition("SHOOTER");
    } else if (path.includes("genres" && "Simulation")) {
      setFilterCondition("SIMULATION");
    } else if (path.includes("genres" && "Horror")) {
      setFilterCondition("HORROR");
    } else if (path.includes("genres" && "Erkundung")) {
      setFilterCondition("ERKUNDUNG");
    } else if (path.includes("genres" && "Open-World")) {
      setFilterCondition("OPEN_WORLD");
    } else if (path.includes("genres" && "Historisch")) {
      setFilterCondition("HISTORICAL");
    } else if (path.includes("genres" && "Rundenbasiert")) {
      setFilterCondition("TURN_BASED");
    } else if (path.includes("genres" && "Rätsel")) {
      setFilterCondition("RÄTSEL");
    } else if (path.includes("genres" && "Detektivgeschichten")) {
      setFilterCondition("DETECTIVE");
    } else if (path.includes("genres" && "Point-and-Click")) {
      setFilterCondition("POINT_CLICK");
    } else if (path.includes("genres" && "JRPG")) {
      setFilterCondition("JRPG");
    } else if (path.includes("genres" && "Echtzeit")) {
      setFilterCondition("REAL_TIME");
    } else if (
      path.includes("genres" && "Erzählung") ||
      path.includes("genres" && "Narrative")
    ) {
      setFilterCondition("STORY_RICH");
    } else if (
      path.includes("genres" && "Uberleben") ||
      path.includes("genres" && "Survival")
    ) {
      setFilterCondition("ÜBERLEBEN");
    } else if (
      path.includes("genres" && "Neu-Erschienen") ||
      path.includes("genres" && "New_Arrivals")
    ) {
      setFilterCondition("NEW_ARRIVALS");
    } else if (
      path.includes("genres" && "Beliebte-Titel") ||
      path.includes("genres" && "Popular-Titles")
    ) {
      setFilterCondition("POPULAR_TITLES");
    } else if (
      path.includes("genres" && "Angebote") ||
      path.includes("genres" && "Deals")
    ) {
      setFilterCondition("DISCOUNTED");
    } else if (path.includes("genres" && "Management")) {
      setFilterCondition("MANAGEMENT");
    }
  };

  // Defines the sort options based on the current language

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

  const handleSearch = (e) => {
    setInputSearch(e.target.value);
    setFilterCondition("SEARCH");
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
        return game.genres.includes("Abenteuer");
      } else if (filterCondition === "ACTION") {
        return game.genres.includes("Action");
      } else if (filterCondition === "SHOOTER") {
        return game.genres.includes("Shooter");
      } else if (filterCondition === "RPG") {
        return game.genres.includes("Rollenspiel");
      } else if (filterCondition === "SIMULATION") {
        return game.genres.includes("Simulation");
      } else if (filterCondition === "STRATEGY") {
        return game.genres.includes("Strategie");
      } else if (filterCondition === "BUILD") {
        return game.genres.includes("Bauen");
      } else if (filterCondition === "EGO") {
        return game.genres.includes("Egoperspektive");
      } else if (filterCondition === "FANTASY") {
        return game.genres.includes("Fantasy");
      } else if (filterCondition === "SCI_FI") {
        return game.genres.includes("Science-fiction");
      } else if (filterCondition === "HORROR") {
        return game.genres.includes("Horror");
      } else if (filterCondition === "ERKUNDUNG") {
        return game.genres.includes("Erkundung");
      } else if (filterCondition === "OPEN_WORLD") {
        return game.genres.includes("Open-World");
      } else if (filterCondition === "HISTORICAL") {
        return game.genres.includes("Historisch");
      } else if (filterCondition === "TURN_BASED") {
        return game.genres.includes("Rundenbasiert");
      } else if (filterCondition === "RÄTSEL") {
        return game.genres.includes("Rätsel");
      } else if (filterCondition === "DETECTIVE") {
        return game.genres.includes("Detektivgeschichten");
      } else if (filterCondition === "POINT_CLICK") {
        return game.genres.includes("Point-and-Click");
      } else if (filterCondition === "JRPG") {
        return game.genres.includes("JRPG");
      } else if (filterCondition === "REAL_TIME") {
        return game.genres.includes("Echtzeit");
      } else if (filterCondition === "STORY_RICH") {
        return game.genres.includes("Erzählung");
      } else if (filterCondition === "ÜBERLEBEN") {
        return game.genres.includes("Überleben");
      } else if (filterCondition === "NEW_ARRIVALS") {
        return game.genres.includes("Neu-Erschienen");
      } else if (filterCondition === "POPULAR_TITLES") {
        return game.genres.includes("Beliebte-Titel");
      } else if (filterCondition === "DISCOUNTED") {
        return game.genres.includes("Angebote");
      } else if (filterCondition === "MANAGEMENT") {
        return game.genres.includes("Management");
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
        return game.tags.includes("Nur auf PixelPlaza");
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
      } else if (filterCondition === "HACK_AND_SLASH_TAG") {
        return game.tags.includes("Hack and Slash");
      } else if (filterCondition === "MILITÄRISCH_TAG") {
        return game.tags.includes("Militärisch");
      } else if (filterCondition === "POLITIK_TAG") {
        return game.tags.includes("Politik");
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
        console.log(minReleaseDate);
        return (
          game.releaseDate.split("-")[0] >= minReleaseDate &&
          game.releaseDate.split("-")[0] <= maxReleaseDate
        );
      } else if (filterCondition === "DEUTSCH") {
        return game.languages.includes("Deutsch");
      } else if (filterCondition === "ENGLISCH") {
        return game.languages.includes("English");
      } else if (filterCondition === "FRANZÖSISCH") {
        return game.languages.includes("français");
      } else if (filterCondition === "SPANISCH") {
        return game.languages.includes("español");
      } else if (filterCondition === "ITALIENISCH") {
        return game.languages.includes("italiano");
      } else if (filterCondition === "PORTUGIESISCH") {
        return game.languages.includes("português");
      } else if (filterCondition === "RUSSISCH") {
        return game.languages.includes("русский");
      } else if (filterCondition === "CHINESISCH") {
        return game.languages.includes("中文(简体)");
      } else if (filterCondition === "JAPANISCH") {
        return game.languages.includes("日本語");
      } else if (filterCondition === "KOREANISCH") {
        return game.languages.includes("한국어");
      } else if (filterCondition === "BRASILIANISCH") {
        return game.languages.includes("Português do Brasil");
      } else if (filterCondition === "UNGARISCH") {
        return game.languages.includes("magyar");
      } else if (filterCondition === "POLNISCH") {
        return game.languages.includes("polski");
      } else if (filterCondition === "TÜRKISCH") {
        return game.languages.includes("Türkçe");
      } else if (filterCondition === "TSCHECHISCH") {
        return game.languages.includes("český");
      } else if (filterCondition === "NIEDERLÄNDISCH") {
        return game.languages.includes("nederlands");
      } else if (filterCondition === "DÄNISCH") {
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

  return (
    <div className="main-wrapper gamespage-wrapper">
      <HeaderStore
        sortedGames={sortedGames}
        inputSearch={inputSearch}
        handleSearch={handleSearch}
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
