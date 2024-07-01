import { useLanguage } from "../../contexts/LanguageContext.js";

const HeaderStore = ({ sortedGames, inputSearch, handleSearch }) => {
  const { language } = useLanguage();

  return (
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
  );
};

export default HeaderStore;
