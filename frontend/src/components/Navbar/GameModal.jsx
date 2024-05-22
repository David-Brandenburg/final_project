import { useContext, useEffect, useState } from 'react';
import '../../styles/modals.scss';
import { ModalContext } from '../../contexts/ModalContext.js';

const GameModal = () => {

    const { 
        openGameModal,
        setOpenGameModal,
        openModalBlocker,
        setOpenModalBlocker,
    } = useContext(ModalContext);

		const games = [
			{
				title: 'Manor Lords',
				thumbnail: 'https://images.gog-statics.com/1e07143b952181ab7b723c2df2adfe26d9f653b38d7fd4717631cb881a305732_196.jpg',
				platforms: ['windows'],
				price: '39.99',
				discount: '30%'
			}
		]

    return (
        <div className='games-modal' onClick={((e) => e.stopPropagation())}>
            <div className='games-genre-list'>
                <p className='games-modal-link'>Abenteuer</p>
                <p className='games-modal-link'>Action</p>
                <p className='games-modal-link'>Simulation</p>
                <p className='games-modal-link'>Rollenspiel</p>
            </div>
            <div className='games-card-container'>
							{games.map((game) => {

								return (
								<div className='game-card' key={game.title}>
									<div className='game-card-thumbnail-wrapper'>
										<img src={game.thumbnail} alt="" />
									</div>
									<div className='game-card-info-wrapper'>
										<div className='game-card-platforms-wrapper'>
											{game.platforms.map((platform) => (
												<small key={platform} className='game-card-platform'><i className={`bi bi-${platform}`}></i></small>
											))}
										</div>
										<small className='game-card-price-tag'>{game.price} €</small>
									</div>
								</div>
								)
							})}
						</div>
        </div>
    )
}

export default GameModal;
