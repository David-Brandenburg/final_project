// src/components/LanguagesList.jsx

import { NavLink } from "react-router-dom";
import slugify from "slugify";
import { GetMessagesGenre } from "./translationUtilsGenre";
import React from "react";

const LanguagesListGenres = ({ genres }) => {
  const translatedGenres = GetMessagesGenre(genres);

  return (
    <>
      {translatedGenres.slice(0, 3).map((genre, index) => (
        <React.Fragment key={"genre" + index}>
          <NavLink
            className="game-details-link"
            to={`/games?=genres=${slugify(genre, "_")}`}
            style={{ textUnderlineOffset: "4px" }}>
            {genre}
          </NavLink>
          {index < translatedGenres.slice(0, 3).length - 1 && (
            <span className="space-holder2">-</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default LanguagesListGenres;
