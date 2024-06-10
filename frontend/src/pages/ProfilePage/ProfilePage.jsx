import React, { useContext, useEffect, useMemo, useState } from 'react'
import './profilepage.scss'
import { LogginContext } from '../../contexts/LogginContext'
import { toast } from 'react-toastify';
import defaultPic from '../../assets/defaultProfilepic.webp';


const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const [hasFile, setHasFile] = useState(false)
	const [objectToUpdate, setObjectToUpdate] = useState({});
	const [passwordToUpdate, setPasswordToUpdate] = useState({});
	
	const { loggedInUser } = useContext(LogginContext);

	const fetchUser = useMemo(() => async () => {
		try {
			const url = `http://localhost:3001/accounts/${loggedInUser.id}`;
			const resp = await fetch(url, { method: 'GET' })
			if (!resp.ok) {
				const data = await resp.json()
				toast.error(data.message)
			} else {
				const data = await resp.json()
				setUser(data)
				console.log(data)
			}
		} catch (error) {
			console.error(error);
		}
	}, [loggedInUser.id])

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	const handleFileChange = (e) => {
		if (e.target.files.length > 0) {
			setHasFile(true)
		} else {
			setHasFile(false)
		}
	};

	const sumbitProfilePicUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const url = `http://localhost:3001/accounts/updateAccountProfilePic/${loggedInUser.id}`;
		try {
			const response = await fetch(url, { method: 'PATCH', body: formData })

			if (!response.ok){
				const data = await response.json();
				toast.error(data.message);
				throw new Error("Something went wrong");
			} else {
				const data = await response.json();
				toast.success(data.message)
				setHasFile(false)
				fetchUser()
				e.target.reset();
			}

		} catch (error) {
			console.error(error);
		}
	};

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
    if (value === '') {
      const updatedPassword = {...passwordToUpdate};
      delete updatedPassword[name];
      setPasswordToUpdate(updatedPassword);
    } else {
      setPasswordToUpdate(prev => ({...prev, [name]: value}));
    }
	};

	const submitPassword = async (e) => {
		e.preventDefault();
		const url = `http://localhost:3001/accounts/updateAccountPassword/${loggedInUser.id}`
		try {
			const resp = await fetch(url, {method: 'PATCH', headers: {"Content-Type": "application/json"}, body: JSON.stringify(passwordToUpdate)});
			if (!resp.ok) {
				const data = await resp.json()
				toast.error(data.message)
				throw new Error("Something went wrong!")
			} else {
				const data = await resp.json();
				toast.success(data.message)
				setPasswordToUpdate({})
				e.target.reset()
			}
			
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className='main-wrapper profile-wrapper'>
			{user &&
				<>
					<div className='profile-sidebar'>
						<div className='profilePic-content'>
							<div className='profilePic-wrapper'>
								{user.profilePic && user.profilePic !== ''
									? <img className='profilePic' src={user.profilePic} alt="" />
									: <img className='profilePic' src={defaultPic} alt="" />
								}
							</div>
						</div>
						<h2>{user.benutzername}</h2>
						<p>{user.email}</p>
						<p>{user.vorname}</p>
						<p>{user.nachname}</p>
					</div>
					<div className='profile-content'>
						<form className='profile-form-row' encType='multipart/form-data' onSubmit={sumbitProfilePicUpload}>
							<div className='profile-inside-row'>
								<label htmlFor="profilepic">Profilbild ändern:</label>
								<input type="file" name="profilepic" id="profilepic" onChange={handleFileChange} />
							</div>
							<button className='profile-btn' disabled={!hasFile}>Upload Image</button>
						</form>
						<hr />
						<form className='profile-form-row' onSubmit={submitPassword}>
							<div className='profile-inside-row'>
								<label htmlFor="password">Current Password:</label>
								<input type="password" name="password" id="password" onChange={handlePasswordChange}/>
							</div>
							<div className='profile-inside-row'>
								<label htmlFor="newpassword">Enter new password:</label>
								<input type="password" name="newpassword" id="newpassword" onChange={handlePasswordChange}/>
							</div>
							<button className='profile-btn' disabled={Object.keys(passwordToUpdate).length < 2 ? true : false }>Change Password</button>
						</form>
						<hr />
						<form className='profile-form-row'>
							<div className='profile-inside-row'>
								<label htmlFor="">Email ändern:</label>
								<input type="email" name="email" id="email" />
							</div>
							<div className='profile-inside-row'>
								<label htmlFor="">Vorname ändern:</label>
								<input type="text" name="vorname" id="vorname" />
							</div>
							<div className='profile-inside-row'>
								<label htmlFor="">Nachname ändern:</label>
								<input type="text" name="nachname" id="nachname" />
							</div>
							<button className='profile-btn'>Change Account Info</button>
						</form>
					</div>
				</>
			}
		</div>
	)
}

export default ProfilePage