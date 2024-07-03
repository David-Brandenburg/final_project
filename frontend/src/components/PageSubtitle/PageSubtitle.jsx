import React, { useEffect, useState } from "react";
import "./pagesubtitle.scss";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const PageSubtitle = ({ title, icon, Nav }) => {
  const { language } = useLanguage();

  return (
    <div className="subtitle-wrapper">
      <div className="subtitle-heading">
        <div className="subtitle">
          <i className={`bi bi-${icon}`}></i>
          <h3>{title}</h3>
        </div>
        {Nav && (
          <NavLink to={`/games?=genres=${title}`} className="genre-link">
            {language === "en" ? "See more" : "Mehr anzeigen"}
          </NavLink>
        )}
      </div>
      <hr className="subtitle-hr" />
    </div>
  );
};

export default PageSubtitle;
