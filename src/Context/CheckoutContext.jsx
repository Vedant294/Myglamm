import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cart, setCart] = useState(null);
  return (
    <CheckoutContext.Provider
      value={{
        address,
        setAddress,
        paymentMethod,
        setPaymentMethod,
        cart,
        setCart,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
