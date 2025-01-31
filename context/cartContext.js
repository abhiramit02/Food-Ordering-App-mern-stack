import React, { createContext, useState } from "react";

// Create a Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart function
  const addToCart = (pizza, variant, quantity) => {
    const newItem = {
      ...pizza,
      variant,
      quantity: Number(quantity),
      price: pizza.prices[0][variant] * quantity,
    };
    setCart((prevCart) => [...prevCart, newItem]);
  };

  // Remove from cart function
  const removeFromCart = (pizzaId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== pizzaId));
  };

  // Calculate total price of cart items
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]); // Clears the cart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
