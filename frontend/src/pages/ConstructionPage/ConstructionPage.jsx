import React from 'react';
import { Link } from 'react-router-dom';
import './constructionpage.scss'
import { useLanguage } from '../../contexts/LanguageContext.js';

const ConstructionPage = () => {
	const { language } = useLanguage();

	return (
		<div className='main-wrapper construction-wrapper'>
			<h2>404</h2>
			<p>{language === 'en' ? 'Page under construction!' : 'Seite befindet sich im Aufbau!'}</p>
			<Link className='redirect-link' to='/'>{language === 'en' ? 'Back to Home' : 'Zurück zur Startseite'}</Link>
		</div>
	)
}

export default ConstructionPage