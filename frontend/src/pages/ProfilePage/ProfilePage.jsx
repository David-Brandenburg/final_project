import React, { useContext, useEffect, useMemo, useState } from 'react'
import { LogginContext } from '../../contexts/LogginContext.js'
import { toast } from 'react-toastify';
import defaultPic from '../../assets/defaultProfilepic.webp';
import { useLanguage } from '../../contexts/LanguageContext.js'
import './profilepage.scss'
import AdminTable from '../../components/AdminTable/AdminTable.jsx';

const ProfilePage = ({setProfilePicChange}) => {
	const { language } = useLanguage();
	const [user, setUser] = useState(null);
	const [hasFile, setHasFile] = useState(false)
	const [objectToUpdate, setObjectToUpdate] = useState({});
	const [passwordToUpdate, setPasswordToUpdate] = useState({});
	const [indexTab, setIndexTab] = useState('accountandsecurity');
	const [adminTab, setAdminTab] = useState('accounts');
	
	const { loggedInUser, isAdmin } = useContext(LogginContext);

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
			toast.info(language === 'en' ? 'Uploading Image..' : 'Bild hochladen..')
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
				localStorage.setItem("profilePic", data.profilePic)
				setTimeout(() => {
					setProfilePicChange(true)
				}, 500);
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setObjectToUpdate((prev) => {
			if (value === '') {
				const { [name]: _, ...updatedObject } = prev;
				return updatedObject;
			} else {
				return { ...prev, [name]: value };
			}
		});
	};
	
	const submitAccountInfo = async (e) => {
		e.preventDefault();
		const url = `http://localhost:3001/accounts/updateAccountInfo/${loggedInUser.id}`;
		try {
			const resp = await fetch(url, {method: 'PATCH', headers: {"Content-Type": "application/json"}, body: JSON.stringify(objectToUpdate)})
			if (!resp.ok) {
				const data = await resp.json();
				toast.error(data.message);
				throw new Error(data.message);
			} else {
				const data = await resp.json();
				toast.success(data.message);
				setObjectToUpdate({});
				fetchUser()
				e.target.reset();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='main-wrapper profile-wrapper'>
			{user &&
				<>
					<div className='profile-sidebar'>
						{(indexTab === 'accountandsecurity' || indexTab === 'socialsandlinks') &&
							<>
								<div className='profilePic-content'>
									<div className='profilePic-wrapper'>
										{user.profilePic && user.profilePic !== ''
											? <img className='profilePic' src={user.profilePic} alt="" />
											: <img className='profilePic' src={defaultPic} alt="" />
										}
									</div>
								</div>
								<div className='profileInfo-content'>
									{indexTab === 'accountandsecurity' &&
										<>
											<div className='profileInfo-content-row'>
												<p>{language === 'en' ? 'Username' : 'Nutzername'}:</p>
												<p>{user.benutzername}</p>
											</div>
											<hr style={{margin: "5px 0"}}/>
											<div className='profileInfo-content-row'>
												<p>E-Mail:</p>
												<p>{user.email}</p>
											</div>
											<hr style={{margin: "5px 0"}}/>
											<div className='profileInfo-content-row'>
												<p>{language === 'en' ? 'Firstname' : 'Vorname'}:</p>
												<p style={{color: user.vorname ? "unser" : "gray"}}>{user.vorname ? user.vorname : "Nicht angegeben"}</p>
											</div>
											<hr style={{margin: "5px 0"}}/>
											<div className='profileInfo-content-row'>
												<p>{language === 'en' ? 'Lastname' : 'Nachname'}:</p>
												<p style={{color: user.nachname ? "unser" : "gray"}}>{user.nachname ? user.nachname : "Nicht angegeben"}</p>
											</div>
										</>
									}
									{indexTab === 'socialsandlinks' &&
										<>
											<div className='profileInfo-content-row'>
												<p>Steam:</p>
												<p>{language === 'en' ? 'Not linked' : 'Nicht verlinkt'}</p>
											</div>
											<hr style={{margin: "5px 0"}}/>
											<div className='profileInfo-content-row'>
												<p>Epic Games:</p>
												<p>{language === 'en' ? 'Not linked' : 'Nicht verlinkt'}</p>
											</div>
											<hr style={{margin: "5px 0"}}/>
											<div className='profileInfo-content-row'>
												<p>Ubisoft:</p>
												<p>{language === 'en' ? 'Not linked' : 'Nicht verlinkt'}</p>
											</div>
											<hr style={{margin: "5px 0"}}/>
											<div className='profileInfo-content-row'>
												<p>EA Play:</p>
												<p>{language === 'en' ? 'Not linked' : 'Nicht verlinkt'}</p>
											</div>
											<hr style={{margin: "5px 0"}}/>
											<div className='profileInfo-content-row'>
												<p>Battle.net:</p>
												<p>{language === 'en' ? 'Not linked' : 'Nicht verlinkt'}</p>
											</div>
										</>
									}
								</div>
							</>
						}
						{indexTab === 'adminanddashboard' &&
							<>
								<div className='admin-index-tab-menu'>
									<p 
										className={`admin-index-tab-item ${adminTab === 'accounts' ? 'active' : ''}`}
										onClick={((e) => setAdminTab('accounts'))}
										>Accounts</p>
									<hr style={{margin: "0", width: 'calc(100% - 24px)', alignSelf: 'center'}}/>
									<p 
										className={`admin-index-tab-item ${adminTab === 'games' ? 'active' : ''}`}
										onClick={((e) => setAdminTab('games'))}
										>{language === 'en' ? 'Games' : 'Spiele'}</p>
									<hr style={{margin: "0", width: 'calc(100% - 24px)', alignSelf: 'center'}}/>
									<p 
										className={`admin-index-tab-item ${adminTab === '' ? 'active' : ''}`}
										onClick={((e) => setAdminTab(null))}
										>{language === 'en' ? 'Placeholder' : 'Platzhalter'}</p>
									<hr style={{margin: "0", width: 'calc(100% - 24px)', alignSelf: 'center'}}/>
									<p 
										className={`admin-index-tab-item ${adminTab === 'logs' ? 'active' : ''}`}
										onClick={((e) => setAdminTab('logs'))}
										>Logs</p>
								</div>
							</>
						}
					</div>
					<div className='profile-content'>
						<div className='profile-index-tab-menu'>
							<p 
								onClick={((e) => setIndexTab('accountandsecurity'))}
								className={indexTab === 'accountandsecurity' ? 'indextab-active' : ''}
								>{language === 'en' ? 'Account and Security' : 'Account und Sicherheit'}</p>
							<p 
								onClick={((e) => setIndexTab('socialsandlinks'))}
								className={indexTab === 'socialsandlinks' ? 'indextab-active' : ''}
								>{language === 'en' ? 'Socials and Links' : 'Soziales und Verlinkungen'}</p>
							{isAdmin && 
								<p
									onClick={((e) => setIndexTab('adminanddashboard'))}
									className={indexTab === 'adminanddashboard' ? 'indextab-active' : '' }
									>{language === 'en' ? 'Admin and Dashboard' : 'Admin und Dashboard'}</p>
								}
						</div>
						<hr style={{margin: "0"}}/>
						{indexTab === 'accountandsecurity' ?
							<>
								<form className='profile-form-row' encType='multipart/form-data' onSubmit={sumbitProfilePicUpload}>
									<div className='profile-inside-row'>
										<label htmlFor="profilepic">{language === 'en' ? 'Change Profilepicture' : 'Profilbild ändern'}:</label>
										<input type="file" name="profilepic" id="profilepic" onChange={handleFileChange} />
									</div>
									<button className='profile-btn' disabled={!hasFile}>{language === 'en' ? 'Upload Image' : 'Bild hochladen'}</button>
								</form>
								<hr style={{width: "350px"}} />
								<form className='profile-form-row' onSubmit={submitAccountInfo}>
									<div className='profile-inside-row'>
										<label htmlFor="">{language === 'en' ? 'Change Username': 'Benutzername ändern'}:</label>
										<input type="text" name="benutzername" id="benutzername" onChange={handleInputChange} />
									</div>
									<div className='profile-inside-row'>
										<label htmlFor="">{language === 'en' ? 'Change E-Mail' : 'E-Mail ändern'}:</label>
										<input type="email" name="email" id="email" onChange={handleInputChange} />
									</div>
									<div className='profile-inside-row'>
										<label htmlFor="">{language === 'en' ? 'Change Firstname' : 'Vorname ändern'}:</label>
										<input type="text" name="vorname" id="vorname" onChange={handleInputChange} />
									</div>
									<div className='profile-inside-row'>
										<label htmlFor="">{language === 'en' ? 'Change Lastname' : 'Nachname ändern'}:</label>
										<input type="text" name="nachname" id="nachname" onChange={handleInputChange} />
									</div>
									<button className='profile-btn' disabled={Object.keys(objectToUpdate).length < 1 ? true : false }>{language === 'en' ? 'Change Account Info' : 'Account Informationen ändern'}</button>
								</form>
								<hr style={{width: "350px"}} />
								<form className='profile-form-row' onSubmit={submitPassword}>
									<div className='profile-inside-row'>
										<label htmlFor="password">{language === 'en' ? 'Current Password' : 'Aktuelles Passwort'}:</label>
										<input type="password" name="password" id="password" onChange={handlePasswordChange}/>
									</div>
									<div className='profile-inside-row'>
										<label htmlFor="newpassword">{language === 'en' ? 'Enter new password' : 'Neues Passwort eingeben'}:</label>
										<input type="password" name="newpassword" id="newpassword" onChange={handlePasswordChange}/>
									</div>
									<button className='profile-btn' disabled={Object.keys(passwordToUpdate).length < 2 ? true : false }>{language === 'en' ? 'Change Password' : 'Passwort ändern'}</button>
								</form>
							</>
						: indexTab === 'socialsandlinks' ?
							<>
								Under construction..
							</>
						: indexTab === 'adminanddashboard' ?
							<>
								<AdminTable adminTab={adminTab} />
							</>
						: <p>Error</p>
						}
					</div>
				</>
			}
		</div>
	)
}

export default ProfilePage;