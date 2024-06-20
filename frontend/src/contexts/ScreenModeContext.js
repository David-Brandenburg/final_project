import { createContext, useEffect, useState } from "react";


export const ScreenModeContext = createContext();

export const ScreenModeContextProvider = ({children}) => {
	const [screenMode, setScreenMode] = useState(localStorage.getItem("screenMode"));
	
	const screen = localStorage.getItem("screenMode")
	if (!screen) {
		localStorage.setItem("screenMode", 'light')
	}

	useEffect(() => {
		const root = document.querySelector(':root');
		if (screenMode === 'light') {
			root.style.setProperty("--background", "#d9d9d9")
			root.style.setProperty("--main", "#ffffff80")
			root.style.setProperty("--mainBorder", "#fff")
			root.style.setProperty("--mainColor", "#000")
			root.style.setProperty("--mainColorLight", "#c0c0c0")
		} else {
			root.style.setProperty("--background", "#262626")
			root.style.setProperty("--main", "#00000080")
			root.style.setProperty("--mainBorder", "#000")
			root.style.setProperty("--mainColor", "#fff")
			root.style.setProperty("--mainColorLight", "#424242")
		}
	}, [screenMode])

	return (
		<ScreenModeContext.Provider value={{screenMode, setScreenMode}}>
			{children}
		</ScreenModeContext.Provider>
	)
};