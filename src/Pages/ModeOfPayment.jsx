import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaMoneyBillAlt, FaCreditCard, FaLock } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useCheckout } from "../Context/CheckoutContext";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";

function ModeOfPayment({ isOpen, onClose, openCart }) {
  const [selectedMode, setSelectedMode] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const { address, setPaymentMethod, cart } = useCheckout();
  const { setCartItems } = useCart();

  if (!isOpen) return null;

  const placeOrder = async (method) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ shippingAddress: address, paymentMethod: method, subtotal: cart }),
    });
    return response;
  };

  const handleProceed = async () => {
    if (!selectedMode) { toast("Please select a payment method."); return; }
    if (selectedMode === "online") { setShowCardForm(true); return; }

    // COD flow
    try {
      const res = await placeOrder("cod");
      if (res.ok) {
        setCartItems([]);
        setPaymentMethod("cod");
        toast.success("Order placed successfully!");
        onClose();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to place order.");
      }
    } catch { toast.error("Something went wrong."); }
  };

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing delay
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const res = await placeOrder("online");
      if (res.ok) {
        setCartItems([]);
        setPaymentMethod("online");
        toast.success("Payment successful! Order placed.");
        onClose();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to place order.");
      }
    } catch { toast.error("Something went wrong."); }
    finally { setProcessing(false); }
  };

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length >= 3 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-end z-50">
      <div className="relative px-4 bg-white py-4 border-l border-gray-300 w-full max-w-[450px] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-300 flex justify-between items-center pb-2">
          <button onClick={showCardForm ? () => setShowCardForm(false) : openCart}>
            <IoIosArrowBack size={22} className="text-gray-800" />
          </button>
          <p className="font-semibold text-lg">
            {showCardForm ? "Card Payment" : "Mode of Payment"}
          </p>
          <button onClick={onClose}><RxCross2 size={22} className="text-gray-800" /></button>
        </div>

        {!showCardForm ? (
          <div className="mt-6 flex flex-col gap-4">
            <div
              onClick={() => setSelectedMode("cod")}
              className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selectedMode === "cod" ? "border-[#f18526] bg-orange-50" : "border-gray-300"}`}
            >
              <FaMoneyBillAlt className="text-xl text-green-600" />
              <span className="text-lg font-medium text-gray-700">Cash on Delivery</span>
            </div>

            <div
              onClick={() => setSelectedMode("online")}
              className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selectedMode === "online" ? "border-[#f18526] bg-orange-50" : "border-gray-300"}`}
            >
              <MdOutlinePayment className="text-xl text-blue-600" />
              <span className="text-lg font-medium text-gray-700">Online Payment</span>
            </div>

            <button onClick={handleProceed} className="bg-[#f18526] text-white py-2 rounded mt-4 font-semibold">
              Proceed
            </button>
          </div>
        ) : (
          <form onSubmit={handleCardPayment} className="mt-6 flex flex-col gap-4">
            {/* Demo badge */}
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-700">
              <FaLock /> Secure Demo Payment — no real charge
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Card Number</label>
              <div className="relative mt-1">
                <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
              <input
                type="text"
                placeholder="Name on card"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded outline-none mt-1"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded outline-none mt-1"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="password"
                  placeholder="•••"
                  maxLength={3}
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                  className="w-full px-4 py-2 border border-gray-300 rounded outline-none mt-1"
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{cart}</span>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-[#f18526] text-white py-2 rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <><FaLock size={12} /> Pay ₹{cart}</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ModeOfPayment;
