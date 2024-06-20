import HeroSection from "../../components/HomePage/HeroSection";
import GamesListe from "../../components/HomePage/middle-section/BeliebteGamesListe";
import "./homepage.scss";
import NeueErschinenGamesListe from "../../components/HomePage/middle-section/NeueErschinenGamesListe";
import GerneSwiperAngebote from "../../components/HomePage/middle-sub-section/GerneSwiperAngebote";
import { useEffect } from "react";

const HomePage = () => {


	useEffect(() => {
		document.title = 'Pixel Plaza'
	}, [])	

  return (
    <div className="main-wrapper">
      <HeroSection />
      <div className="middle-section">
        <div className="left">
          <GamesListe />
        </div>
        <div className="right">
          <NeueErschinenGamesListe />
        </div>
      </div>
      <div className="middle-sub-section">
        <GerneSwiperAngebote />
      </div>
    </div>
  );
};

export default HomePage;
