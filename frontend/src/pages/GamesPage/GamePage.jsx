import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './gamepage.scss'

const GamePage = () => {
	const [gameData, setGameData] = useState(null);
	const { title } = useParams();

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

	return (
		<div className='main-wrapper gamepage-wrapper'>
			{gameData &&
				<>
					<div className='gamepage-hero'>
						<img src={gameData.pageThumbnail} className='hero-thumbnail' alt="" />
						<img src={gameData.logo} className='hero-logo' alt="" />
					</div>
					<div>
						<h2>{gameData.title}</h2>
						<img src={gameData.thumbnail} alt="" />
					</div>
				</>
			}
			<div className='gamepage-info-container'>Info Container, Price, ...</div>
		</div>
	)
}

export default GamePage