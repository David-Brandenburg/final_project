import React, { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext.js';
import '../../styles/modals.scss';

const GamePageImageModal = () => {

	const { openImageModal } = useContext(ModalContext)

	return (
		<div className='gamepage-image-wrapper'>
			<div className='gamepage-image-modal'>
				<img src={openImageModal} alt="" onClick={((e) => e.stopPropagation())}/>
				<div className='exit-btn'><i className="bi bi-x-square"></i></div>
			</div>
		</div>
	)
}

export default GamePageImageModal