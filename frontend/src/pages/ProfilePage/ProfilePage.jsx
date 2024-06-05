import React, { useContext, useEffect, useState } from 'react'
import './profilepage.scss'
import { LogginContext } from '../../contexts/LogginContext'
import { toast } from 'react-toastify'

const ProfilePage = () => {
	const [user, setUser] = useState(null)
	
	const { loggedInUser } = useContext(LogginContext);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const url = `http://localhost:3001/accounts/${loggedInUser.id}`;
				const resp = await fetch(url, { method: 'GET' })
				if (!resp.ok) {
					const data = await resp.json()
					toast.error(data.message)
				} else {
					const data = await resp.json()
					setUser(data)
				}
			} catch (error) {
				console.error(error);
			}
		}
		fetchUser()
	}, [])

	return (
		<div className='main-wrapper profile-wrapper'>
			{user && <div>
				<h2>{user.benutzername}</h2>
				<p>{user.email}</p>
			</div>}
		</div>
	)
}

export default ProfilePage