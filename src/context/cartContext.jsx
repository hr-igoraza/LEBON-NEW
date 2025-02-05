// import React, { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

  
//   const addToCart = (item) => {
//     setCart((prevCart) => [...prevCart, item]);
//   };

 
//   const removeFromCart = (itemId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([item]); // Always replace cart with the latest item
  };

  const removeFromCart = () => {
    setCart([]); // Clears the cart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
