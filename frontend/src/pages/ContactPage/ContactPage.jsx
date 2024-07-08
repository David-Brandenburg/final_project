import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.js';
import { Link } from 'react-router-dom';
import reactLogo from '../../assets/brands/react.png';
import scssLogo from '../../assets/brands/scss.png';
import nodejsLogo from '../../assets/brands/node-js.png';
import mongodbLogo from '../../assets/brands/mongodb.png';
import javascriptLogo from '../../assets/brands/javascript.png';
import expressjsLogo from '../../assets/brands/express-js.png';
import cloudinaryLogo from '../../assets/brands/cloudinary.png';
import bcryptLogo from '../../assets/brands/bcrypt.png';
import jwtLogo from '../../assets/brands/jwt.png';
import bootstrapLogo from '../../assets/brands/bootstrap.png';
import './contactpage.scss';

const ContactPage = () => {

	const { language } = useLanguage();

	const owners = [
		{
			Vorname: "David", 
			Nachname: "Brandenburg",
			Rolle: "Tank (Lead)",
			Dev: "Fullstack Developer",
			Github: "https://github.com/David-Brandenburg",
			Picture: "https://avatars.githubusercontent.com/u/117653004?v=4",
			Tasks: ["Backend", "Frontend", "Database", "Homepage", "Storepage", "Registration", "Google Login", "CartContext", "Checkout"]
		},
		{
			Vorname: "Dánny", 
			Nachname: "Böhm",
			Rolle: "DamageDealer (Design)",
			Dev: "Fullstack Developer",
			Github: "https://github.com/RealMahu",
			Picture: "https://avatars.githubusercontent.com/u/129070281?v=4",
			Tasks: ["Backend", "Frontend", "Database", "LoginContext", "ModalContext", "Gamepage", "Profilepage", "Admin Dashboard", "Contactpage"]
		},
		{
			Vorname: "Michelle", 
			Nachname: "Sträßer",
			Rolle: "Healer (Database)",
			Dev: "Fullstack Developer",
			Github: "https://github.com/MichelleStraesser",
			Picture: "https://avatars.githubusercontent.com/u/139325457?v=4",
			Tasks: ["Backend", "Frontend", "Database", "Navbar", "Navbar Search", "Navbar Dropdown", "Dark & Light Mode", "Footer"]
		}
	];

	const technologies = [
		{
			logo: reactLogo,
			title: "React"
		},
		{
			logo: javascriptLogo,
			title: "JavaScript"
		},
		{
			logo: mongodbLogo,
			title: "MongoDB"
		},
		{
			logo: nodejsLogo,
			title: "NodeJS"
		},
		{
			logo: expressjsLogo,
			title: "ExpressJS"
		},
		{
			logo: jwtLogo,
			title: "JWT"
		},
		{
			logo: bcryptLogo,
			title: "BCRYPT"
		},
		{
			logo: cloudinaryLogo,
			title: "Cloudinary"
		},
		{
			logo: scssLogo,
			title: "SCSS"
		},
		{
			logo: bootstrapLogo,
			title: "Bootstrap & Icons"
		}
	];

	return (
		<div className='main-wrapper contactpage-wrapper'>
			<div className='contact-upper-wrapper'>
				<div className="heading">
					<div className='heading-text-wrapper'>
						<h2>{language === 'en' ? 'What did we use?' : 'Was haben wir benutzt?'}</h2>
						<h2>{language === 'en' ? 'Who are we?' : 'Wer sind wir?'}</h2>
					</div>
					<hr />
				</div>
			</div>
			<div className='contact-lower-wrapper'>
				<div className='contact-lower-left'>
					<div className='technologies-container-l'>
						{technologies.slice(0,5).map((technologie, index) => (
							<div key={'tech-card'+index} className='technologie-card'>
								<div className='logo-wrapper'>
									<img src={technologie.logo} alt="" />
								</div>
								<div className='title-wrapper'>
									<p>{technologie.title}</p>
								</div>
							</div>
						))}
					</div>
					<div className='technologies-container-r'>
						{technologies.slice(5,10).map((technologie, index) => (
							<div key={'tech-card'+index} className='technologie-card'>
								<div className='logo-wrapper'>
									<img src={technologie.logo} alt="" />
								</div>
								<div className='title-wrapper'>
									<p>{technologie.title}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='contact-lower-right'>
					{owners.map((owner, index) => (
						<Link key={owner.Vorname + index} className='owner-card' to={owner.Github} rel='noopener noreferrer' target='_blank'>
							<div className='owner-image-wrapper'>
								<img src={owner.Picture} alt="" />
							</div>
							<div className='owner-info-wrapper'>
								<div className='owner-info-top'>
									<div className='name-wrapper'>
										<p className='name'>{owner.Vorname} <span>{owner.Rolle}</span> {owner.Nachname}</p>
										<p className='dev'>{owner.Dev}</p>
									</div>
									<div className='github-wrapper'>
										<i className="bi bi-github"></i>
									</div>
								</div>
								<div className='owner-info-bot'>
									<div className='owner-info-bot-container'>
										<div className='task-wrapper'>
											{owner.Tasks.map((task, index) => (
												<small key={'task' + index} className='task-tag'>{task}</small>
											))}
										</div>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default ContactPage