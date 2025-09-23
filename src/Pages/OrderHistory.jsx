import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 lg:py-8 pt-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
  
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
          <div className="mt-6">
            <Link
              to={"/shop"}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <div>
                    <h2 className="text-[14px] text-gray-900">Order #{order._id.slice(0,6)}</h2>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="mt-2 w-fit sm:mt-0 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    {order.status}
                  </div>
                </div>
  
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>Payment Method: <span className="text-gray-900 font-medium">{order.paymentMethod}</span></p>
                  <p>
                    Shipping Address:{' '}
                    <span className="text-gray-900">
                      {typeof order.shippingAddress === "string"
                        ? order.shippingAddress
                        : `${order.shippingAddress.fullName}, ${order.shippingAddress.phone}, ${order.shippingAddress.road}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`}
                    </span>
                  </p>
                </div>
  
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item._id} className="py-4 flex gap-4">
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.productId.name}</p>
                          <p className="text-sm text-gray-500">{item.productId.description}</p>
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="text-sm">Price: ₹{item.productId.price}</p>
                          <p className="text-sm font-medium">Total: ₹{item.productId.price * item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
  
                <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                  <p className="text-lg font-medium text-gray-900">Total: ₹{order.subtotal.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  
  );
}

export default OrderHistory;
