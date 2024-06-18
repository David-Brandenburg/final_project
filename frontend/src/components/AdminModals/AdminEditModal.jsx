import React, { useContext } from 'react';
import '../../styles/modals.scss';
import { ModalContext } from '../../contexts/ModalContext';

const AdminEditModal = () => {

	const { setOpenModalBlocker, adminEditModal, setAdminEditModal, adminTab } = useContext(ModalContext)

	const handleClose = (e) => {
		e.preventDefault();
		setOpenModalBlocker(false)
		setAdminEditModal('')
	}; 

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
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default AdminEditModal