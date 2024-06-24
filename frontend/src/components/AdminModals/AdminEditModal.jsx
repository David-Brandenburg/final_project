import React, { useContext, useEffect, useState } from 'react';
import '../../styles/modals.scss';
import { ModalContext } from '../../contexts/ModalContext';

const AdminEditModal = () => {
	const [data, setData] = useState(null)
	const [objectToEdit, setObjectToEdit] = useState({})
	const { setOpenModalBlocker, adminEditModal, setAdminEditModal, adminTab } = useContext(ModalContext)

	const handleClose = (e) => {
		e.preventDefault();
		setOpenModalBlocker(false)
		setAdminEditModal('')
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
				<div className='modal-content modal-content-left'>
					left
				</div>
				<div className='modal-content modal-content-right'>
					right
				</div>
			</div>
		</div>
	)
}

export default AdminEditModal