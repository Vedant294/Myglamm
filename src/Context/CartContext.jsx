import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Sync cart count from backend on login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setCartItems([]); return; }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { if (data.items) setCartItems(data.items); })
      .catch(() => {});
  }, [user]);

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
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
