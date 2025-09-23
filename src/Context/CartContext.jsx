import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();


export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product) => {
     if (!user) {
    toast.error("Please login to add items to cart!");
    return;
  }
    setCartItems((prev) => {
    const existingItem = prev.find((item) => item.id === product.id);
    if (existingItem) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart,setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
