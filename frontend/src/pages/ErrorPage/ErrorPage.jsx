import React from 'react';
import { Link } from 'react-router-dom';
import './errorpage.scss'
import { useLanguage } from '../../contexts/LanguageContext.js';

const ErrorPage = () => {
	const { language } = useLanguage();

	return (
		<div className='main-wrapper error-wrapper'>
			<h2>404</h2>
			<p>{language === 'en' ? 'Page not found!' : 'Seite nicht gefunden!'}</p>
			<Link className='redirect-link' to='/'>{language === 'en' ? 'Back to Home' : 'Zurück zur Startseite'}</Link>
		</div>
	)
}

export default ErrorPage