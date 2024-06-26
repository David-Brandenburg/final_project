// src/components/LanguagesList.js

import React from "react";
import { GetMessages } from "./translationUtils";
import { NavLink } from "react-router-dom";
import slugify from "slugify";
import { useLanguage } from "../contexts/LanguageContext";

const LanguagesListTag = ({ tags, openTags, setOpenTags }) => {
  const { language } = useLanguage();
  const translatedTags = GetMessages(tags);

  return (
    <>
      {!openTags &&
        translatedTags.slice(0, 5).map((tag, index) => (
          <React.Fragment key={"tag" + index}>
            <NavLink
              className="game-details-link"
              to={`/games?=tags=${slugify(tag, "_")}`}
              style={{ textUnderlineOffset: "4px" }}>
              {tag}
            </NavLink>
            {index < translatedTags.slice(0, 5).length - 0 && (
              <span className="space-holder">,</span>
            )}
          </React.Fragment>
        ))}
      {openTags &&
        translatedTags.map((tag, index) => (
          <React.Fragment key={"tag" + index}>
            <NavLink
              className="game-details-link"
              to={`/games?=tags=${slugify(tag, "_")}`}
              style={{ textUnderlineOffset: "4px" }}>
              {tag}
            </NavLink>
            {index < tags.length - 1 && <span className="space-holder">,</span>}
          </React.Fragment>
        ))}
      {!openTags && translatedTags.length > 5 && (
        <span
          style={{
            textTransform: "none",
            textDecoration: "underline",
            cursor: "pointer",
            textUnderlineOffset: "4px",
          }}
          onClick={() => setOpenTags((prev) => !prev)}>
          {language === "en"
            ? ` show ${tags.length - 5} more..`
            : ` zeige ${tags.length - 5} weitere..`}
        </span>
      )}
    </>
  );
};

export default LanguagesListTag;
