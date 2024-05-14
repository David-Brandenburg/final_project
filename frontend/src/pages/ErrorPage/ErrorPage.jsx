import React from 'react';
import { Link } from 'react-router-dom';
import './errorpage.scss'

const ErrorPage = () => {

	return (
		<div className='main-wrapper error-wrapper'>
			<h2>404</h2>
			<p>Page not found!</p>
			<Link className='redirect-link' to='/'>Back to Home</Link>
		</div>
	)
}

export default ErrorPage