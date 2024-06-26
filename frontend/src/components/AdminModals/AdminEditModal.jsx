import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { useLanguage } from "../../contexts/LanguageContext.js";
import defaultPic from "../../assets/defaultProfilepic.webp"
import '../../styles/modals.scss';
import { toast } from 'react-toastify';

const AdminEditModal = () => {
	const [data, setData] = useState(null)
	const [objectToEdit, setObjectToEdit] = useState({})
	const { setOpenModalBlocker, adminEditModal, setAdminEditModal, adminTab, setAdminTab } = useContext(ModalContext)

	const { language } = useLanguage();

	const handleClose = (e) => {
		e.preventDefault();
		setOpenModalBlocker(false)
		setAdminEditModal('')
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:3001/${adminTab === 'accounts' ? 'accounts/updateAccountInfo' : 'games'}/${adminEditModal}`
			const response = await fetch(url, {
				method: 'PATCH',
				headers: {
					"Content-Type": "application/json"
					},
				body: JSON.stringify(objectToEdit)
			})
			if (!response.ok) {
				const data = await response.json()
				toast.error(data.message)
				throw new Error(data.message)
			} else {
				const data = await response.json()
				toast.success(data.message)
				setObjectToEdit({})
				setOpenModalBlocker(false)
				setAdminEditModal('')
				if (adminTab === 'accounts') {
					setAdminTab('')
					setTimeout(() => {
						setAdminTab('accounts')
					}, 1000);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setObjectToEdit((prev) => {
			if (type === 'checkbox') {
				return { ...prev, [name]: checked };
			} else {
				if (value === '' || value === data[name]) {
					const { [name]: _, ...updatedObject } = prev;
					return updatedObject;
				} else {
					return { ...prev, [name]: value };
				}
			}
		});
	};

	const resetAccountProfilePic = async (e) => {
		const url = `http://localhost:3001/accounts/resetAccountProfilePic/${adminEditModal}`;
		const response = await fetch(url, {method: 'PATCH'})
		if (!response.ok) {
			const data = await response.json()
			toast.error(data.message)
			throw new Error(data.message)
		} else {
			const data = await response.json()
			toast.success(data.message)
			setAdminTab('')
			setTimeout(() => {
				setAdminTab('accounts')
			}, 1000);
		}
	};

	useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchObjectToEdit = async () => {
      try {
        const url = `http://localhost:3001/${adminTab}/${adminEditModal}`;
        const response = await fetch(url, { method: 'GET', signal: signal });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      }
    };

    fetchObjectToEdit();

    return () => {
      controller.abort();
			setObjectToEdit({});
			setData(null);
    };
  }, [adminTab, adminEditModal]);

	useEffect(() => {
		if (data && adminTab === 'accounts') {
			setObjectToEdit((prev) => ({
				...prev,
				isAdmin: data.isAdmin ? true : false
			}))
		}
	}, [data])

	return (
		<div className='admin-edit-modal' onClick={((e) => e.stopPropagation())}>
			<div className='modal-content-header'>
				<div className='info-id'>{adminTab === 'accounts' ? 'User' : adminTab === 'games' ? 'Game' : 'Log'}: <span>{adminEditModal}</span></div>
				<div className='close-btn' onClick={handleClose}>
					<i className="bi bi-x-lg"></i>
				</div>
			</div>
			<h3>{adminTab === 'accounts' ? 'Edit User' : adminTab === 'games' ? 'Edit Game' : 'View Logs'}</h3>
			<div className='modal-content-bottom'>
				<form className='modal-content modal-content-left' onSubmit={handleSubmit}>
					{(data && adminTab === 'accounts') &&
						<div className='form-row'>
							<div className='edit-row'>
								<label htmlFor="email">{language === 'en' ? 'Edit E-Mail' : 'E-Mail ändern'}:</label>
								<input type="email" name='email' id='email' defaultValue={data.email} onChange={handleChange} />
							</div>
							<div className='edit-row'>
								<label htmlFor="benutzername">{language === 'en' ? 'Edit Username' : 'Benutzername ändern'}:</label>
								<input type="text" name='benutzername' id='benutzername' defaultValue={data.benutzername} onChange={handleChange} />
							</div>
							<div className='edit-row'>
								<label htmlFor="vorname">{language === 'en' ? 'Edit Firstname' : 'Vorname ändern'}:</label>
								<input type="text" name='vorname' id='vorname' defaultValue={data.vorname} onChange={handleChange} />
							</div>
							<div className='edit-row'>
								<label htmlFor="nachname">{language === 'en' ? 'Edit Lastname' : 'Nachname ändern'}:</label>
								<input type="text" name='nachname' id='nachname' defaultValue={data.nachname} onChange={handleChange} />
							</div>
							<div className='edit-row checkbox-row'>
								<label htmlFor="isAdmin">{language === 'en' ? 'User is admin?' : 'Nutzer ist Admin?'}</label>
								<input type="checkbox" name="isAdmin" id="isAdmin" checked={objectToEdit.isAdmin || false} onChange={handleChange} />
							</div>
						</div>
					}
					{(data && adminTab === 'games') &&
						<div className='edit-row'>
							<input type="text" defaultValue={data.title} />
						</div>
					}
					<hr className='horizontal-hr'/>
					<div className='edit-row button-row'>
						<button className='btn-cancel' onClick={handleClose}>{language === 'en' ? 'Cancel' : 'Abbrechen'}</button>
						<button className='btn-update'>{language === 'en' ? 'Update' : 'Aktualisieren'}</button>
					</div>
				</form>
				<hr className='vertical-hr'/>
				<div className='modal-content modal-content-right'>
					{(data && adminTab === 'accounts') &&
						<>
							<>
								<div className='user-profilepic-wrapper'>
									<img src={data.profilePic ? data.profilePic : defaultPic} alt="" />
								</div>
							</>
							<hr className='horizontal-hr'/>
							<div className="edit-row button-row">
								<button className='btn-cancel' onClick={resetAccountProfilePic}>Delete Image</button>
							</div>
						</>
					}
				</div>
			</div>
		</div>
	)
}

export default AdminEditModal