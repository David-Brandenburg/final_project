import React from "react";
import HeroSection from "../../components/HomePage/HeroSection";
import BeliebteGamesListe from "../../components/HomePage/BeliebteGamesListe";
import "./homepage.scss";

const HomePage = () => {
  return (
    <div className="main-wrapper">
      <HeroSection />
      <div className="middle-section">
        <div className="left">
          <BeliebteGamesListe />
        </div>
        <div className="right">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem odit eum excepturi provident nisi cum iure doloribus
            voluptas fuga eaque?
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
