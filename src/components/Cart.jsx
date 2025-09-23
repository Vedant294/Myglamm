/* eslint-disable no-unused-vars */
import { RxCross2 } from "react-icons/rx";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useCheckout } from "../Context/CheckoutContext";
import { toast } from "react-toastify";
function Cart({ isCartOpen, onClose, onTriggerLogin, onCheckout }) {
  const [cartData, setCartData] = useState();
  const token = localStorage.getItem("token");
  const { setCart } = useCheckout();
  const handleLogin = () => {
    onClose();
    onTriggerLogin();
  };

  const fetchCart = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setCartData(data.items);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );
      if (response.ok) {
        fetchCart(); // refresh cart after updating
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isCartOpen]);

  const removeItem = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/remove/${id}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (!isCartOpen) return;

  const subtotal = cartData?.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  console.log(cartData);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-end z-50">
      <div className="relative px-4 bg-white py-4 border-l border-gray-300 w-full max-w-[450px]">
        {/* Header */}
        <div className="border-b border-gray-300 flex justify-between items-center pb-2">
          <p className="font-semibold text-lg">Your Cart</p>
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-black cursor-pointer"
          >
            <RxCross2 size={22} />
          </button>
        </div>

        {/* Login Promo */}
        {!token && (
          <div className="py-4">
            <p className="font-medium text-gray-700">
              Get Started & grab best offers!
            </p>
            <div
              className="text-center rounded  py-1 text-[#f18526] font-medium mt-2 border border-gray-300 cursor-pointer"
              onClick={handleLogin}
            >
              Login / Register
            </div>
          </div>
        )}

        {/* Scrollable Cart Items */}
        <div className="overflow-y-auto mt-2 max-h-[calc(100vh-220px)] pr-2">
          {/* <p className="font-semibold mb-2">Items in your cart</p> */}

          {cartData?.map((item, i) => (
            <div className="flex gap-4 mb-4" key={i}>
              <img
                src={item?.productId?.image}
                alt=""
                className="w-[80px] h-[80px] object-cover mt-1.5 rounded"
              />
              <div className="flex flex-col justify-evenly">
                <p className="text-sm font-medium">{item?.productId?.name}</p>
                <p className="text-sm font-bold">₹{item?.productId?.price}</p>

                <div className="flex gap-4">
                  <div className="flex items-center gap-4 px-3 text-sm bg-gray-200 rounded w-fit mt-2">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.productId._id, item.quantity - 1);
                        }
                      }}
                    >
                      <FaMinus className="cursor-pointer" size={10} />
                    </button>

                    <span>{item?.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                    >
                      <FaPlus className="cursor-pointer" size={10} />
                    </button>
                  </div>
                  <button
                    className="text-xs text-gray-600 underline mt-1"
                    onClick={() => removeItem(item?.productId?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {token && (
          <div className="absolute bottom-0 left-0 w-full bg-white px-4 py-3 border-t shadow-md">
            <div className="flex justify-between text-[18px] font-medium mb-2">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <button
              className="w-full bg-[#f18526] text-white font-semibold py-2 rounded-md cursor-pointer"
              onClick={() => {
                if (cartData.length === 0) {
                  toast.error("Your cart is empty!");
                  return;
                }
                onClose();
                onCheckout();
                setCart(subtotal);
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
