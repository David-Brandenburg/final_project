import { useEffect } from "react";
import HeroSection from "../../components/HomePage/HeroSection.jsx";
import GerneSwiperAngebote from "../../components/HomePage/middle-sub-section/GerneSwiperAngebote.jsx";
import DynamicList from "../../components/HomePage/middle-section/DynamicList.jsx";
import "./homepage.scss";

const HomePage = () => {
	
	useEffect(() => {
		document.title = 'Pixel Plaza'
	}, [])	

  return (
    <div className="main-wrapper">
      <HeroSection />
      <div className="middle-section">
        <div className="left">
					<DynamicList genre={"Beliebte-Titel"} />
        </div>
        <div className="right">
					<DynamicList genre={"Neu-Erschienen"} />
        </div>
      </div>
      <div className="middle-sub-section">
        <GerneSwiperAngebote />
      </div>
    </div>
  );
};

export default HomePage;
