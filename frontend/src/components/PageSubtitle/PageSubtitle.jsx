import React from 'react'
import './pagesubtitle.scss';

const PageSubtitle = ({ title, icon }) => {
	return (
		<div className='subtitle-wrapper'>
			<div className='subtitle-heading'>
				<i className={`bi bi-${icon}`}></i>
				<h3>{title}</h3>
			</div>
			<hr className='subtitle-hr' />
		</div>
	)
}

export default PageSubtitle;