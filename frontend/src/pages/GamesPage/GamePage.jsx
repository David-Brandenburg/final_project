import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import AddToCartBtn from '../../components/AddToCartBtn.jsx';
import { useLanguage } from "../../contexts/LanguageContext.js";
import './gamepage.scss'
import { ModalContext } from '../../contexts/ModalContext.js';

const GamePage = () => {
	const [gameData, setGameData] = useState(null);
	const { title } = useParams();
	const { language } = useLanguage();

	const { setOpenModalBlocker, setOpenImageModal, setOpenTrailerModal } = useContext(ModalContext)

	useEffect(() => {
		const fetchGame = async () => {
			const url = `http://localhost:3001/games/${title}`
			try {
				const response = await fetch(url, { method: 'GET' })
				if (!response.ok) {
					const data = await response.json()
					toast.error(data.message)
					throw new Error(data.message)
				} else {
					const data = await response.json()
					setGameData(data)
				}
			} catch (error) {
				console.error(error);
			}
		}
		fetchGame()

		return () => {
			setGameData(null)
		}
	}, [title])

	useEffect(() => {
		document.title = (title.split('_').join(' ')) + (language === 'en' ? ' on ' : ' auf ') + 'PixelPlaza'
	}, [language])

	const handleImageModal = (e, pic) => {
		e.preventDefault();
		setOpenModalBlocker(true)
		setOpenImageModal(pic)
	}

	const handleTrailerModal = (e, trailer) => {
		e.preventDefault();
		setOpenModalBlocker(true)
		setOpenTrailerModal(trailer)
	}

	return (
		<div className='main-wrapper gamepage-wrapper'>
			{gameData &&
				<>
					<div className='gamepage-hero'>
						<img src={gameData.pageThumbnail} className='hero-thumbnail' alt="" />
						<img src={gameData.logo} className='hero-logo' alt="" />
					</div>
					<div className='gamepage-hero-info'>
						<h2 className='gamepage-title'>{gameData.title}</h2>
						<div className='gamepage-sub-info'>
							<p><i className="bi bi-star-fill" style={{fontSize: '12px'}}></i> {gameData.rating}/5</p>
							<hr />
							<div className='gamepage-platform-wrapper'>{gameData.platforms.map((platform, index) => (<i key={index} className={`bi bi-${platform === 'ios' ? 'apple' : platform === 'linux' ? 'ubuntu' : platform}`} style={{fontSize: '14px'}}></i>))}</div>
							<hr />
							<div className='gamepage-language-wrapper'>
								{gameData.languages.slice(0, 2).map((language, index) => (<p className='language-tag' key={index}>{language}</p>))}
								{gameData.languages.length > 2 && <p>& {gameData.languages.length - 2} {language === 'en' ? 'more' : 'weitere'}</p>}
							</div>
						</div>
					</div>
					<Swiper
						grabCursor={true}
						centeredSlides={false}
						slidesPerView={4}
						// spaceBetween={100}
						loop={false}
						pagination={{ el: ".swiper-pagination", clickable: true }}
						navigation={{
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
							clickable: true,
						}}
						modules={[Pagination, Navigation]}
						className="gamepage-swiper">
						{gameData.trailer.length > 0 && gameData.trailer.slice(0, 2).map((trailer, index) => (
							<SwiperSlide key={index}>
								<div className='gamepage-swiper-trailer-wrapper' onClick={((e) => handleTrailerModal(e, trailer))}>
									<img className='gamepage-swiper-img' src={`https://img.youtube.com/vi/${trailer}/hqdefault.jpg`} alt="" />
									<i className="bi bi-play-circle gamepage-play-button"></i>
								</div>
							</SwiperSlide>
						))}
						{gameData.pics.length > 0 && gameData.pics.map((pic, index) => (
							<SwiperSlide key={index}>
								<div className='gamepage-swiper-img-wrapper' onClick={((e) => handleImageModal(e, pic))}>
									<img className='gamepage-swiper-img' src={pic} alt="" />
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
					<div className='gamepage-description-info-wrapper'>
						<div className='gamepage-description-left'>
							<div className='header-container'>
								<p className='header-left'>{language === 'en' ? 'Description' : 'Beschreibung'}</p>
								<hr />
							</div>
							<div className='description-content'>
								{Array.isArray(gameData.description) && gameData.description.map((item, index) => {
									if (Object.keys(item)[0] === 'bannerGif') {
										return (
											<video key={'bannerGif'+index} muted preload='auto' loop autoPlay='autoplay'>
												<source src={Object.values(item)[0]} type='video/mp4' />
											</video>
										);
									}
									if (Object.keys(item)[0] === 'paragraphDE' || Object.keys(item)[0] === 'paragraphEN') {
										return (
											<p key={'paragraph'+index}>{language === 'en' ? Object.values(item)[1] : Object.values(item)[0]}</p>
										);
									}
									if (Object.keys(item)[0] === 'bannerDE' || Object.keys(item)[0] === 'bannerEN') {
										return (
											<img key={'banner'+index} src={language === 'en' ? Object.values(item)[1] : Object.values(item)[0]} alt=''/>
										)
									}
									return null;
								})}
							</div>
						</div>
						<div className='gamepage-info-right'></div>
					</div>
				</>
			}
			<div className='gamepage-info-container'>Info Container, Price, ...</div>
		</div>
	)
}

export default GamePage;