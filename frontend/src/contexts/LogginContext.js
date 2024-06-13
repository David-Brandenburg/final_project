import { createContext, useEffect, useState } from "react";

export const LogginContext = createContext();

export const LogginContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : {
      benutzername: '',
      email: '',
      id: '',
      token: '',
    };
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
		console.log("loggedInUser updated:", loggedInUser)
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
		if (loggedInUser.token && loggedInUser.benutzername && loggedInUser.email && loggedInUser.id) {
			setIsLoggedIn(true)
			checkAdmin();
		} else {
			setIsLoggedIn(false)
		}
		
  }, [loggedInUser]);

	const checkAdmin = async (e) => {
		try {
			const url = `http://localhost:3001/api/checkAdmin/${loggedInUser.id}`
			const response = await fetch(url, {method: 'GET'})
			if (!response.ok) {
				const data = await response.json()
				throw new Error(data.message)
			} else {
				const data = await response.json()
				if (data.isAdmin) {
					setIsAdmin(true)
				}
			}
		} catch (error) {
			console.error(error);
		}
	}


  return (
    <LogginContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn, isAdmin }}>
      {children}
    </LogginContext.Provider>
  );
};
