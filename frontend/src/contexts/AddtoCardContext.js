import { createContext, useEffect, useState } from "react";

export const AddtoCardContext = createContext();

export const AddtoCardContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game) => {
    setCart((prevCart) => [...prevCart, game]);
  };

  const removeFromCart = (gameId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== gameId));
  };

  return (
    <AddtoCardContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </AddtoCardContext.Provider>
  );
};
