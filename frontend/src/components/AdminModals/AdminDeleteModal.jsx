import React, { useContext, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext.js';
import { ModalContext } from '../../contexts/ModalContext.js';
import '../../styles/modals.scss';
import { toast } from 'react-toastify';

const AdminDeleteModal = () => {
	const [data, setData] = useState(null);
  const {
    setOpenModalBlocker,
    adminDeleteModal,
    setAdminDeleteModal,
    adminTab,
    setAdminTab,
  } = useContext(ModalContext);

  const { language } = useLanguage();

  const URL = process.env.REACT_APP_URL_BACKEND;

	const handleDelete = async (e) => {
		try {
			const response = await fetch(`${URL}/accounts/deleteAccount/${adminDeleteModal}`, {method: 'DELETE'})
			if (!response.ok) {
				const data = await response.json();
				toast.error(data.message);
				throw new Error(data.message);
			} else {
				const data = await response.json();
        toast.success(data.message);
        setOpenModalBlocker(false);
        setAdminDeleteModal("");
        if (adminTab === "accounts") {
          setAdminTab("");
          setTimeout(() => {
            setAdminTab("accounts");
          }, 1000);
        }
			}
		} catch (error) {
			console.error(error);
		}
	};

  const handleClose = (e) => {
    e.preventDefault();
    setOpenModalBlocker(false);
    setAdminDeleteModal("");
  };

	return (
		<div className='admin-delete-modal' onClick={(e) => e.stopPropagation()}>
			<div className="modal-content-header">
        <div className="info-id">
          {adminTab === "accounts"
            ? "User"
            : adminTab === "games"
            ? "Game"
            : "Log"}
          : <span>{adminDeleteModal}</span>
        </div>
        <div className="close-btn" onClick={handleClose}>
          <i className="bi bi-x-lg"></i>
        </div>
      </div>
			<h3>
        {language === 'en' ? 'Delete account' : 'Account löschen'}
      </h3>
			<div className='modal-content-bottom'>
				<div className="content-left"></div>
				<div className="content-right"></div>
			</div>
		</div>
	)
}

export default AdminDeleteModal