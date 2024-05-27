import React from 'react'
import { useParams } from 'react-router-dom'

const GamePage = () => {

	const { title } = useParams()
	const orginalTitle = title.replace(/-/g, ' ')
	return (
		<div>
			<h2>{orginalTitle}</h2>
		</div>
	)
}

export default GamePage