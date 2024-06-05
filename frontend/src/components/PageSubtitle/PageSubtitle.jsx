import React from "react";
import "./pagesubtitle.scss";
import { NavLink } from "react-router-dom";

const PageSubtitle = ({ title, icon, Nav }) => {
  return (
    <div className="subtitle-wrapper">
      <div className="subtitle-heading">
        <i className={`bi bi-${icon}`}></i>
        <h3>{title}</h3>
        {Nav && (
          <NavLink to={`/games/genres/beliebte-titel`} className="genre-link">
            Mehr Anzeigen
          </NavLink>
        )}
      </div>
      <hr className="subtitle-hr" />
    </div>
  );
};

export default PageSubtitle;
