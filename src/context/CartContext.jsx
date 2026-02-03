import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product2) => {
    setCart([...cart, product2]);
  };

  const removeItem = (indexToRemove) => {
    setCart((prevCart1) => prevCart1.filter((_, i) => i !== indexToRemove));
  };

  const removeItemById = (id) => {
    setCart((prevCart1) => {
      const index = prevCart1.findIndex((item) => item.id === id);
      if (index !== -1) {
        return prevCart1.filter((_, i) => i !== index);
      }
      return prevCart1;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, removeItemById }}
    >
      {children}
    </CartContext.Provider>
  );
};
