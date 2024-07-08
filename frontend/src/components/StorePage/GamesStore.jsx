import { useState } from "react";
import GamesModal from "../../components/HomePage/GamesModal.jsx";
import { useLanguage } from "../../contexts/LanguageContext";

const GamesStore = ({
  sortedGames,
  setSelectedItemsSort,
  setSortCondition,
  isScrolled,
  selectedItemsSort,
}) => {
  const { language } = useLanguage();

  const [hoveredGame, setHoveredGame] = useState(null); // Stores the game that is currently hovered over
  const [showListGrid, setShowListGrid] = useState(true); // Toggle for showing list/grid view
  const [isOpen, setIsOpen] = useState(false); // Manages the dropdown state
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMouseEnter = (game) => {
    setHoveredGame(game);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  const totalPages = Math.ceil(sortedGames.length / gamesPerPage);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = sortedGames.slice(indexOfFirstGame, indexOfLastGame);

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

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedItemsSort(value);
    setSortCondition(value);
    setIsOpen(!isOpen);
  };

  return (
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
                        {game.price === 0
                          ? "Free"
                          : (
                              game.price -
                              (game.price * game.discount) / 100
                            ).toFixed(2) + " €"}
                      </p>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div>
              <div>
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
  );
};

export default GamesStore;
