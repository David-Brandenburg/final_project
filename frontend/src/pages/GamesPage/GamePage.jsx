import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useLanguage } from "../../contexts/LanguageContext.js";
import { ModalContext } from "../../contexts/ModalContext.js";
import { format } from 'date-fns'
import AddToCartBtn from "../../components/AddToCartBtn.jsx";
import slugify from "slugify";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./gamepage.scss";

const GamePage = () => {
  const [gameData, setGameData] = useState(null);
	const [gameDLCS, setGameDLCS] = useState([]);
	const [mainGame, setMainGame] = useState(null);
	const [openTags, setOpenTags] = useState(false);
	const [recommendations1, setRecommendations1] = useState(null);
	const [recommendations2, setRecommendations2] = useState(null);
  const { title } = useParams();
  const { language } = useLanguage();

  const { setOpenModalBlocker, setOpenImageModal, setOpenTrailerModal } = useContext(ModalContext);

  useEffect(() => {
    const fetchGame = async () => {
      const url = `http://localhost:3001/games/${title}`;
      try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          const data = await response.json();
          toast.error(data.message);
          throw new Error(data.message);
        } else {
          const data = await response.json();
          setGameData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGame();

    return () => {
      setGameData(null);
			setOpenTags(false)
    };
  }, [title]);

  useEffect(() => {
    document.title =
      (gameData && gameData.discount > 0 ? `-${gameData.discount}% ` : "") +
      title.split("_").join(" ") +
      (language === "en" ? " on " : " auf ") +
      "PixelPlaza";
		
		window.scrollTo(0, 0);
  }, [language, title, gameData]);

  const handleImageModal = (e, pic) => {
    e.preventDefault();
    setOpenModalBlocker(true);
    setOpenImageModal(pic);
  };

  const handleTrailerModal = (e, trailer) => {
    e.preventDefault();
    setOpenModalBlocker(true);
    setOpenTrailerModal(trailer);
  };

	useEffect(() => {
    const fetchDLCS = async (title, abortSignal) => {
      try {
        const url = `http://localhost:3001/games/${slugify(title, '_')}`;
        const response = await fetch(url, { method: 'GET', signal: abortSignal });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
        return null;
      }
    };

    if (gameData) {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchAllDLCS = async () => {
        const dlcsData = await Promise.all(gameData.dlcs.map(title => fetchDLCS(title, signal)));
        setGameDLCS(dlcsData.filter(dlc => dlc !== null));
      };

			if (gameData.dlcs.length > 0){
				fetchAllDLCS();
			}

      return () => {
        controller.abort();
      };
    }
  }, [gameData]);

	useEffect(() => {
    const fetchMainGame = async (title, abortSignal) => {
      try {
        const url = `http://localhost:3001/games/${slugify(title, '_')}`;
        const response = await fetch(url, { method: 'GET', signal: abortSignal });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
        return null;
      }
    };

		const fetchGames = async (signal) => {
			try {
				const url = `http://localhost:3001/games/`
				const response = await fetch(url, { method: 'GET' });
				if (!response.ok) {
					const dataFailed = await response.json()
					throw new Error(dataFailed.message)
				}
		
				const dataSuccess = await response.json();
				const foundRecommendations1 = dataSuccess.filter((game) => game.genres.includes(gameData.genres[0]) && (!game.dlc && game.title !== gameData.title));
				const slicedRecommendations1 = foundRecommendations1.slice(0, 4);
				setRecommendations1(slicedRecommendations1);
		
				const recommendation1Titles = new Set(slicedRecommendations1.map(game => game.title));
		
				const foundRecommendations2 = dataSuccess.filter((game) => 
					game.genres.includes(gameData.genres[1]) && 
					(!game.dlc && 
					game.title !== gameData.title &&
					!recommendation1Titles.has(game.title)
				));
				const slicedRecommendations2 = foundRecommendations2.slice(0, 4);
				setRecommendations2(slicedRecommendations2);
			} catch (error) {
				console.error(error);
			}
		};

		if (gameData){
			fetchGames()
		}

    if (gameData && gameData.mainGame) {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchMainGameData = async () => {
        const mainGameData = await fetchMainGame(gameData.mainGame, signal);
        if (mainGameData) {
          setMainGame(mainGameData);
        }
      };

      fetchMainGameData();

      return () => {
        controller.abort();
				setMainGame(null)
      };
    }
  }, [gameData, title]);

  return (
    <div className="main-wrapper gamepage-wrapper">
      {gameData && (
        <>
          <div className="gamepage-hero">
            <img
              src={gameData.pageThumbnail}
              className="hero-thumbnail"
              alt=""
							loading="eager"
            />
            <img src={gameData.logo} className="hero-logo" alt="" />
            {gameData.trailer.length > 0 && (
              <i
                className="bi bi-play-circle hero-play-button"
                onClick={(e) => handleTrailerModal(e, gameData.trailer[0])}></i>
            )}
            <div className="gamepage-info-container">
              <div className="gamepage-info-inner-wrapper">
                {gameData.discount > 0 && (
                  <div className="discount-tag-wrapper">
                    <p className="discount-tag">-{gameData.discount}%</p>
                  </div>
                )}
                <div className="price-tag-wrapper">
                  <p
                    className="price-tag"
                    style={{
                      color: gameData.discount > 0 ? "gray" : "unset",
                      fontSize: gameData.discount > 0 ? "16px" : "30px",
                      textDecoration:
                        gameData.discount > 0 ? "line-through" : "unset",
                    }}>
                    € {gameData.price}
                  </p>
                  {gameData.discount > 0 && (
                    <p className="price-tag-discount">€ {Math.floor((gameData.price - (gameData.price * gameData.discount) / 100) * 100) / 100}</p>
                  )}
                </div>
                <hr />
                <AddToCartBtn
                  className={"btn"}
                  game={gameData}
                  text={
                    <>
                      <i className="bi bi-cart-plus"></i>
                      <p>
                        {language === "en" ? "Add to Cart" : "In den Warenkorb"}
                      </p>
                    </>
                  }
                />
                <AddToCartBtn
                  className={"btn"}
                  game={gameData}
                  text={
                    <>
                      <i className="bi bi-cart-plus"></i>
                      <p>
                        {language === "en" ? "Add to Cart" : "In den Warenkorb"}
                      </p>
                    </>
                  }
                />
              </div>
            </div>
          </div>
          <div className="gamepage-hero-info">
            <h2 className="gamepage-title">{gameData.title}</h2>
            <div className="gamepage-sub-info">
              <p>
                <i className="bi bi-star-fill" style={{ fontSize: "12px" }}></i>{" "}
                {gameData.rating}/5
              </p>
              <hr />
              <div className="gamepage-platform-wrapper">
                {gameData.platforms.map((platform, index) => (
                  <i
                    key={index}
                    className={`bi bi-${
                      platform === "ios"
                        ? "apple"
                        : platform === "linux"
                        ? "ubuntu"
                        : platform
                    }`}
                    style={{ fontSize: "14px" }}></i>
                ))}
              </div>
              <hr />
              <div className="gamepage-language-wrapper">
                {gameData.languages.slice(0, 2).map((language, index) => (
                  <p className="language-tag" key={index}>
                    {language}
                  </p>
                ))}
                {gameData.languages.length > 2 && (
                  <p>
                    & {gameData.languages.length - 2}{" "}
                    {language === "en" ? "more" : "weitere"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Swiper
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={4}
            loop={false}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="gamepage-swiper">
            {gameData.trailer.length > 0 &&
              gameData.trailer.map((trailer, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="gamepage-swiper-trailer-wrapper"
                    onClick={(e) => handleTrailerModal(e, trailer)}>
                    <img
                      className="gamepage-swiper-img"
                      src={`https://img.youtube.com/vi/${trailer}/hqdefault.jpg`}
                      alt=""
                    />
                    <i className="bi bi-play-circle gamepage-play-button"></i>
                  </div>
                </SwiperSlide>
              ))}
            {gameData.pics.length > 0 &&
              gameData.pics.map((pic, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="gamepage-swiper-img-wrapper"
                    onClick={(e) => handleImageModal(e, pic)}>
                    <img className="gamepage-swiper-img" src={pic} alt="" />
                  </div>
                </SwiperSlide>
              ))}
            <div className="slider_controller">
              <div className="swiper-button-prev arrow-left">
                <i className="fas fa-chevron-left"></i>
              </div>
              <div className="swiper-button-next arrow-right">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </Swiper>
          <div className="gamepage-description-info-wrapper">
            <div className="gamepage-description-left">
              <div className="header-container">
                <p className="header-left">
                  {language === "en" ? "Description" : "Beschreibung"}
                </p>
                <hr className="header-hr"/>
              </div>
              <div className="description-content">
                {Array.isArray(gameData.description) &&
                  gameData.description.map((item, index) => {
                    const key = Object.keys(item)[0];
                    if (key === "bannerGif") {
                      return (
                        <video
                          key={"bannerGif" + index}
                          muted
                          preload="auto"
                          loop
                          autoPlay="autoplay">
                          <source
                            src={Object.values(item)[0]}
                            type="video/mp4"
                          />
                        </video>
                      );
                    }
                    if (key === "subHeaderDE" || key === "subHeaderEN") {
                      return (
                        <p className="subHeader" key={"subHeader" + index}>
                          {language === "en"
                            ? Object.values(item)[1]
                            : Object.values(item)[0]}
                        </p>
                      );
                    }
                    if (key === "paragraphDE" || key === "paragraphEN") {
                      return (
                        <p className="paragraph" key={"paragraph" + index}>
                          {language === "en"
                            ? Object.values(item)[1]
                            : Object.values(item)[0]}
                        </p>
                      );
                    }
                    if (key === "bannerDE" || key === "bannerEN") {
                      return (
                        <img
                          key={"banner" + index}
                          src={
                            language === "en"
                              ? Object.values(item)[1]
                              : Object.values(item)[0]
                          }
                          alt=""
													loading="lazy"
                        />
                      );
                    }
                    if (key === "listDE" || key === "listEN") {
                      const languageList =
                        language === "en" && item.listEN
                          ? item.listEN
                          : item.listDE;
                      return (
                        <ul key={"list" + index} className="gamepage-list">
                          {Array.isArray(languageList) &&
                            languageList.map((listItem, listIndex) => (
                              <li key={"listItem" + listIndex}>
                                {listItem.listItem}
                              </li>
                            ))}
                        </ul>
                      );
                    }
										if (key === "quoteDE" || key === "quoteEN") {
											return (
												<p key={'quote'+index} className="quote">{language === "en" ? Object.values(item)[1] : Object.values(item)[0]}</p>
											)
										}
                    if (key === "devQuoteDE" || key === "devQuoteEN") {
                      return (
                        <p key={'devQuote'+index}  className="devQuote" dangerouslySetInnerHTML={{ __html: language === "en" ? Object.values(item)[1] : Object.values(item)[0] }}/>
                      );
                    }
										if (key === "midQuoteDE" || key === "midQuoteEN") {
											return (
												<p key={'midQuote'+index}  className="midQuote" dangerouslySetInnerHTML={{__html: language === "en" ? Object.values(item)[1] : Object.values(item)[0]}} />
											)
										}
										if (key === 'footNote') {
											return (
												<small key={'footNote'+index} className="footNote">{Object.values(item)[0]}</small>
											)
										}
                    return null;
                  })}
              </div>
              {/* <div className="header-container">
                <p className="header-left">
                  {language === "en"
                    ? "Popular achievements"
                    : "Häufige Erfolge"}
                </p>
                <hr className="header-hr"/>
              </div> */}
            </div>
            <div className="gamepage-info-right">
							{mainGame &&
								<>
									<div className="header-container">
										<p className="header-left">
											{language === "en" ? "To play this game you also need" : "Zum Spielen benötigst du außerdem"}
										</p>
										<hr className="header-hr" />
									</div>
									<div className="game-maingame-container">
										<NavLink to={`/games/${slugify(mainGame.title, '_')}`} className="game-maingame">
											<div className="maingame-thumbnail-wrapper">
												<img src={mainGame.thumbnail} alt=""/>
											</div>
											<div className="maingame-info-wrapper">
												<small>{mainGame.title}</small>
												<div className="maingame-info-pricetags">
													{mainGame.discount > 0 && <p className="discount-tag" style={{color: 'var(--mainColor)', fontWeight: 'bold'}}>-{mainGame.discount}%</p>}
													<div className="maingame-pricetags">
														{mainGame.discount === 0 && <p>€ {mainGame.price}</p>}
														{mainGame.discount > 0 &&
															<>
																<small style={{color: 'gray', textDecoration: 'line-through'}}>€ {mainGame.price}</small>
																<p>€ {Math.floor((mainGame.price - (mainGame.price * mainGame.discount) / 100) * 100) / 100}
																</p>
															</>
														}
													</div>
														<AddToCartBtn
															className={"btn"}
															game={mainGame}
															text={<i className="bi bi-cart-plus"></i>}
														/>
												</div>
											</div>
										</NavLink>
									</div>
								</>
							}
							<div className="header-container">
                <p className="header-left">
                  {language === "en" ? "Game details" : "Spieldetails"}
                </p>
                <hr className="header-hr" />
              </div>
							<div className="game-details">
								<div className="game-details-row">
									<p className="game-details-tag">Genre:</p>
									<div className="game-details-content">
										{gameData.genres.slice(0,3).map((genre, index) => (
											<React.Fragment key={'genre' + index}>
												<NavLink className='game-details-link' to={`/games?=genres=${slugify(genre, "_")}`} style={{textUnderlineOffset: '4px'}}>{genre}</NavLink>
												{index < gameData.genres.slice(0,3).length - 1 && <span className="space-holder2">-</span>}
											</React.Fragment>
										))}
									</div>
								</div>
								<div className="game-details-row">
									<p className="game-details-tag">Tags:</p>
									<div className="game-details-content">
										{!openTags && gameData.tags.slice(0, 5).map((tag, index) => (
											<React.Fragment key={'tag' + index}>
												<NavLink className='game-details-link' to={`/games?=tags=${slugify(tag, "_")}`} style={{textUnderlineOffset: '4px'}}>{tag}</NavLink>
												{index < gameData.tags.slice(0, 5).length - 0 && <span className="space-holder">,</span>}
											</React.Fragment>
										))}
										{openTags && gameData.tags.map((tag, index) => (
											<React.Fragment key={'tag' + index}>
												<NavLink className='game-details-link' to={`/games?=tags=${slugify(tag, "_")}`} style={{textUnderlineOffset: '4px'}}>{tag}</NavLink>
												{index < gameData.tags.length - 1 && <span className="space-holder">,</span>}
											</React.Fragment>
										))}
										{!openTags && gameData.tags.length > 5 && (
											<span style={{textTransform: 'none', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '4px'}} onClick={(() => setOpenTags(prev => !prev))}>{language === 'en' ? ` show ${gameData.tags.length - 5} more..` : ` zeige ${gameData.tags.length - 5} weitere..`}</span>
										)}
									</div>
								</div>
								<div className="game-details-row">
									<p className="game-details-tag">{language === 'en' ? 'Works on' : 'Läuft auf'}:</p>
									<div className="game-details-content">
										{gameData.platforms.map((platform, index) => (
											<React.Fragment key={'platform' + index}>
												<p>{platform === 'ios' ? 'Mac OS' : platform === 'windows' ? 'Windows (10, 11)' : 'Linux'}</p>
												{index < gameData.platforms.length - 1 && <span className="space-holder">,</span>}
											</React.Fragment>
										))}
									</div>
								</div>
								<div className="game-details-row">
									<p className="game-details-tag">
										{language === 'en' ? 'Release date' : 'Veröffentlicht'}:
									</p>
									<div className="game-details-content">
										<p>{format(new Date(gameData.releaseDate), language === 'en' ? 'MMMM dd, yyyy' : 'dd. MMMM, yyyy')}</p>
									</div>
								</div>
								<div className="game-details-row">
									<p className="game-details-tag">
										{language === 'en' ? 'Company' : 'Entwickler'}:
									</p>
									<div className="game-details-content">
										{(gameData.publisher && !gameData.developer) && <NavLink className='game-details-link' style={{textUnderlineOffset: '4px'}} to={`/games?=publishers=${slugify(gameData.publisher, "-")}`}>{gameData.publisher}</NavLink>}
										{(gameData.developer && !gameData.publisher) && <NavLink className='game-details-link' style={{textUnderlineOffset: '4px'}} to={`/games?=developers=${slugify(gameData.developer, "-")}`}>{gameData.developer}</NavLink>}
										{(gameData.developer && gameData.publisher) &&
											<>
												<NavLink className='game-details-link' to={`/games?=developers=${slugify(gameData.developer, "-")}`} style={{textUnderlineOffset: '4px'}} >{gameData.developer}</NavLink>
												<span className="space-holder2">/</span>
												<NavLink className='game-details-link' to={`/games?=publishers=${slugify(gameData.publisher, "-")}`} style={{textUnderlineOffset: '4px'}} >{gameData.publisher}</NavLink>
											</>
										}
									</div>
								</div>
							</div>
							<div className="game-details-row">
								<p className="game-details-tag">Links:</p>
								<div className="game-details-content">
									<p style={{textTransform: 'none', textDecoration: 'underline', cursor: 'pointer', textUnderlineOffset: '4px'}} onClick={(() => toast.info(language === 'en' ? 'Under construction..' : 'Arbeiten im Gange..'))}>{language === 'en' ? 'Forum discussion' : 'Forum zum Spiel'}</p>
								</div> 
							</div>
							<hr />
							<div className="game-details-row">
								<p className="game-details-tag">{language === 'en' ? 'Game features' : 'Spielfunktionen'}:</p>
								<div className="game-details-content">
									<p className="game-functions-tag">{
										gameData.functions[0] === 'Cloud-Speicherstände'
											? (language === 'en' ? 'Cloud saves': 'Cloud-Speicherstände')
											:
										gameData.functions[0] === 'Einzelspieler'
											? (language === 'en' ? 'Single-player' : 'Einzelspieler')
											:
										gameData.functions[0] === 'Mehrspieler'
											? (language === 'en' ? 'Multi-player' : 'Mehrspieler')
											: 
										gameData.functions[0] === 'Controller-Unterstützung'
											? (language === 'en' ? 'Controller support' : 'Controller-Unterstützung')
											: 
										gameData.functions[0] === 'Erfolge'
											? (language === 'en' ? 'Achievments' : 'Erfolge')
											: 
										gameData.functions[0] === 'Einblendungen'
											? (language === 'en' ? 'Overlay' : 'Einblendungen')
											: ''
										}
									</p>
								</div>
							</div>
							<div className="game-functions-content">
								{gameData.functions.slice(1).map((functions, index) => (
									<div key={'row'+index} className="game-details-row">
										<p className="game-details-tag-link" />
										<p className="game-functions-tag" key={'function' + index}>{
											functions === 'Cloud-Speicherstände'
												? (language === 'en' ? 'Cloud saves': 'Cloud-Speicherstände')
												:
											functions === 'Einzelspieler'
												? (language === 'en' ? 'Single-player' : 'Einzelspieler')
												:
											functions === 'Mehrspieler'
												? (language === 'en' ? 'Multi-player' : 'Mehrspieler')
												: 
											functions === 'Controller-Unterstützung'
												? (language === 'en' ? 'Controller support' : 'Controller-Unterstützung')
												: 
											functions === 'Erfolge'
												? (language === 'en' ? 'Achievments' : 'Erfolge')
												: 
											functions === 'Einblendungen'
												? (language === 'en' ? 'Overlay' : 'Einblendungen')
												: ''
											}
										</p>
									</div>
								))}
							</div>
							<hr />
							<div className="game-details-row">
								<p className="game-details-tag">{language === 'en' ? 'Languages' : 'Sprachen'}:</p>
								<div className="game-details-content">
									<p className="game-functions-tag">{gameData.languages[0]}
									</p>
								</div>
							</div>
							<div className="game-functions-content">
								{gameData.languages.slice(1).map((language, index) => (
									<div key={'row2'+index} className="game-details-row">
										<p className="game-details-tag-link" />
										<p className="game-functions-tag" key={'function' + index}>{language}</p>
									</div>
								))}
							</div>
							{gameData.dlcs.length > 0 &&
								<>
									<div className="header-container">
										<p className="header-left">
											{language === "en" ? "DLCs" : "DLCs"}
										</p>
										<hr className="header-hr" />
									</div>
									<div className="game-dlc-container">
										{gameDLCS.map((dlc, index) => (
											<NavLink to={`/games/${slugify(dlc.title, '_')}`} key={'dlc'+index} className="game-dlc">
												<div className="dlc-thumbnail-wrapper">
													<img src={dlc.thumbnail} alt=""/>
												</div>
												<div className="dlc-info-wrapper">
													<small>{dlc.title}</small>
													<div className="dlc-info-pricetags">
														{dlc.discount > 0 && <p className="discount-tag" style={{color: 'var(--mainColor)', fontWeight: 'bold'}}>-{dlc.discount}%</p>}
														<div className="dlc-pricetags">
															{dlc.discount === 0 && <p>€ {dlc.price}</p>}
															{dlc.discount > 0 &&
																<>
																	<small style={{color: 'gray', textDecoration: 'line-through'}}>€ {dlc.price}</small>
																	<p>€ {Math.floor((dlc.price - (dlc.price * dlc.discount) / 100) * 100) / 100}
																	</p>
																</>
															}
														</div>
															<AddToCartBtn
																className={"btn"}
																game={dlc}
																text={<i className="bi bi-cart-plus"></i>}
															/>
													</div>
												</div>
											</NavLink>
										))}
									</div>
								</>
							}
						</div>
          </div>
					<div>
						<div className="header-container">
							<p className="header-left">
								{language === "en" ? "You may like these products" : "Das könnt dir auch gefallen"}
							</p>
							<hr className="header-hr" />
						</div>
						<div className="recommendations-wrapper">
							{(recommendations1 && recommendations2) &&
								<>
									<div className="recommendations1-container">
										{recommendations1.map((game) => (
											<NavLink to={`/games/${slugify(game.title, "_")}`} className="game-card">
												<div className="game-card-thumbnail-wrapper">
													<img src={game.thumbnail} alt="" />
												</div>
												<div className="game-card-info-wrapper">
													<div className="game-card-title-wrapper">
														<p>{game.title}</p>
													</div>
													<div className="game-card-pricetags-wrapper">
														{game.discount > 0 && <p className="discount-tag">-{game.discount}%</p>}
														<div className="price-discount-wrapper">
															{game.discount > 0 && <small style={{textDecoration: 'line-through', color: 'gray'}}>{game.price} €</small>}
															<p>{Math.floor((gameData.price - (gameData.price * gameData.discount) / 100) * 100) / 100} €</p>
														</div>
														<AddToCartBtn className={"btn"} game={game} text={<i className="bi bi-cart-plus"></i>} />
													</div>
												</div>
											</NavLink>
										))}
									</div>
									<div className="recommendations2-container">
										{recommendations2.map((game) => (
											<NavLink to={`/games/${slugify(game.title, "_")}`} className="game-card">
												<div className="game-card-thumbnail-wrapper">
													<img src={game.thumbnail} alt="" />
												</div>
												<div className="game-card-info-wrapper">
													<div className="game-card-title-wrapper">
														<p>{game.title}</p>
													</div>
													<div className="game-card-pricetags-wrapper">
														{game.discount > 0 && <p className="discount-tag">-{game.discount}%</p>}
														<div className="price-discount-wrapper">
															{game.discount > 0 && <small style={{textDecoration: 'line-through', color: 'gray'}}>{game.price} €</small>}
															<p>{Math.floor((gameData.price - (gameData.price * gameData.discount) / 100) * 100) / 100} €</p>
														</div>
														<AddToCartBtn className={"btn"} game={game} text={<i className="bi bi-cart-plus"></i>} />
													</div>
												</div>
											</NavLink>
										))}
									</div>
								</>
							}
						</div>
					</div>
        </>
      )}
    </div>
  );
};

export default GamePage;
