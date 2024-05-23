import { createContext, useEffect, useState } from "react";

export const LogginContext = createContext();

export const LogginContextProvider = ({children}) => {
	const [loggedInUser, setLoggedInUser] = useState({
		benutzername: '',
		email: '',
		id: '',
		profilePic: '',
		token: '',
	})
	const [isLoggedIn, setIsLoggedIn] = useState(null)

	useEffect(() => {
		const user = localStorage.getItem("loggedInUser")
		if (!user) {
			localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
		}
		console.log(user)
	}, [loggedInUser]);

	return (
		<LogginContext.Provider value={{loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn}}>
			{children}
		</LogginContext.Provider>
	)
};