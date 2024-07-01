import React, { createContext, useContext, useState } from "react";

// Erstelle einen Context
export const LanguageContext = createContext();

// Erstelle einen Provider für den Context
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("de"); // Standardmäßig auf Deutsch
  const [inputSearch, setInputSearch] = useState(""); // Stores the input for search

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "de" : "en")); // Wechselt zwischen Englisch ('en') und Deutsch ('de')
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, inputSearch, setInputSearch }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Benutzerdefinierte Hook, um den Context zu verwenden
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage muss innerhalb des LanguageProviders verwendet werden"
    );
  }
  return context;
};
