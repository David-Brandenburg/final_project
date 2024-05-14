import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({children}) => {
	const [openModalBlocker, setOpenModalBlocker] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	const [openCart, setOpenCart] = useState(false);
	const [openLoginModal, setOpenLoginModal] = useState(false);

	return (
		<ModalContext.Provider value={{ openModalBlocker, setOpenModalBlocker, openSearch, setOpenSearch, openCart, setOpenCart, openLoginModal, setOpenLoginModal }}>
			{children}
		</ModalContext.Provider>
	)
}