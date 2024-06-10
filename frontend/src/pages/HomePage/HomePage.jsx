import React, { useContext } from "react";
import HeroSection from "../../components/HomePage/HeroSection";
import BeliebteGamesListe from "../../components/HomePage/BeliebteGamesListe";
import "./homepage.scss";
import NeueErschinenGamesListe from "../../components/HomePage/NeueErschinenGamesListe";

const HomePage = () => {
  return (
    <div className="main-wrapper">
      <HeroSection />
      <div className="middle-section">
        <div className="left">
          <BeliebteGamesListe />
        </div>
        <div className="right">
          <NeueErschinenGamesListe />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
