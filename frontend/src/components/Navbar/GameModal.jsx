import { NavLink } from 'react-router-dom';
import '../../styles/modals.scss';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import GameModalCardContainer from './GameModalCardContainer';
import slugify from 'slugify';

const GameModal = () => {
	const [genre, setGenre] = useState('')

	const { setOpenGameModal, setOpenModalBlocker } = useContext(ModalContext)

  useEffect(() => {
    const gamesGenre = document.querySelectorAll('.games-modal-link');

    const handleMouseEnter = (e) => {
      const currentGenre = e.target;
      setGenre(slugify(currentGenre.innerText.toLowerCase()));
      
      gamesGenre.forEach((genre) => {
        if (genre !== currentGenre) {
          genre.classList.remove('active');
        }
      });

      currentGenre.classList.add('active');
    };

    gamesGenre.forEach((genre) => {
      genre.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      gamesGenre.forEach((genre) => {
        genre.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, [genre]);

    return (
      <div className='games-modal' onClick={((e) => e.stopPropagation())}>
        <div className='games-genre-list'>
          <p className='games-modal-link' >Neu erschienen</p>
          <p className='games-modal-link' >Beliebte Titel</p>
          <p className='games-modal-link' >Angebote</p>
					<hr style={{borderBottom: "1px solid #fff"}}/>
          <p className='games-modal-link' >Abenteuer</p>
          <p className='games-modal-link' >Action</p>
          <p className='games-modal-link' >Shooter</p>
          <p className='games-modal-link' >Rollenspiel</p>
          <p className='games-modal-link' >Strategie</p>
          <p className='games-modal-link' >Fantasy</p>
          <p className='games-modal-link' >Science-Fiction</p>
        </div>
        {genre && <div className='games-content'>
					<GameModalCardContainer genre={genre} />
					<div className=''>
						<NavLink to={`/games/genres/${genre.toLowerCase()}`} className='genre-link' onClick={((e) => {setOpenGameModal(false); setOpenModalBlocker(false);})}>
							{
								genre === 'beliebte-titel'
								? 'Zu allen beliebten Titeln'
								: genre === 'neu-erschienen'
								? 'Zu allen Neuerscheinungen'
								: genre === 'angebote'
								? 'Zu allen Angeboten'
								: `Zu allen ${slugify(genre)}-Spielen`}
						</NavLink>
					</div>
        </div>}
      </div>
    )
}

export default GameModal;
