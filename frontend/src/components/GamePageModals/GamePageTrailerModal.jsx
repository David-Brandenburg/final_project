import React, { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext.js';
import '../../styles/modals.scss';

const GamePageTrailerModal = () => {
	const { openTrailerModal } = useContext(ModalContext)

	return (
		<div className='gamepage-trailer-wrapper'>
			<div className='gamepage-trailer-modal'>
				<iframe src={`https://www.youtube.com/embed/${openTrailerModal}?autoplay=1`} title={"GameTrailer"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen></iframe>
				<div className='exit-btn'><i className="bi bi-x-square"></i></div>
			</div>
		</div>
	)
}

export default GamePageTrailerModal