import { createContext, useEffect, useState } from "react";

export const LogginContext = createContext();

export const LogginContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : {
      benutzername: '',
      email: '',
      id: '',
      profilePic: '',
      token: '',
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <LogginContext.Provider value={{ loggedInUser, setLoggedInUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </LogginContext.Provider>
  );
};
