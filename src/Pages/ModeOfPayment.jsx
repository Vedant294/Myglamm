import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useCheckout } from "../Context/CheckoutContext";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";

function ModeOfPayment({ isOpen, onClose, openCart }) {
  const [selectedMode, setSelectedMode] = useState("");
  const { address, setPaymentMethod ,cart} = useCheckout();
  const {setCartItems}=useCart();
  if (!isOpen) return null;

  const handlePayment = async() => {
    if (!selectedMode) {
      toast("Please select a payment method.");
      return;
    }

    setPaymentMethod(selectedMode);
    setCartItems([]);

    try {
      const token = localStorage.getItem("token");
    
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress:address,
          paymentMethod: selectedMode,
          subtotal:cart
        }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        toast("Order placed successfully!");
        console.log(data)
        onClose();
        // window.location.reload();
      } else {
        console.error("Server error:", data);
        alert(data.message || "Failed to place the order.");
      }
    } catch (err) {
      console.error("Order placement failed", err);
      toast("Something went wrong while placing the order.");
    }
    
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-end z-50">
      <div className="relative px-4 bg-white py-4 border-l border-gray-300 w-full max-w-[450px]">
        {/* Header */}
        <div className="border-b border-gray-300 flex justify-between items-center pb-2">
          <button onClick={openCart}>
            <IoIosArrowBack size={22} className="text-gray-800" />
          </button>
          <p className="font-semibold text-lg">Mode of Payment</p>
          <button onClick={onClose}>
            <RxCross2 size={22} className="text-gray-800" />
          </button>
        </div>

        {/* Payment Options */}
        <div className="mt-6 flex flex-col gap-4">
          <div
            onClick={() => setSelectedMode("cod")}
            className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
              selectedMode === "cod"
                ? "border-[#f18526] bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <FaMoneyBillAlt className="text-xl text-green-600" />
            <span className="text-lg font-medium text-gray-700">
              Cash on Delivery
            </span>
          </div>

          <div
            onClick={() => setSelectedMode("online")}
            className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${
              selectedMode === "online"
                ? "border-[#f18526] bg-orange-50"
                : "border-gray-300"
            }`}
          >
            <MdOutlinePayment className="text-xl text-blue-600" />
            <span className="text-lg font-medium text-gray-700">
              Online Payment
            </span>
          </div>

          <button
            onClick={handlePayment}
            className="bg-[#f18526] text-white py-2 rounded mt-4 font-semibold"
            
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModeOfPayment;
