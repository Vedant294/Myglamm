import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/Api";

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered"];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    getAllOrders().then(setOrders).catch(console.error);
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Email</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-mono text-xs text-gray-500">
                  #{order._id.slice(0, 8)}
                </td>
                <td className="p-4">
                  <p className="font-medium">{order.shippingAddress?.fullName}</p>
                  <p className="text-xs text-gray-500">{order.shippingAddress?.phone}</p>
                </td>
                <td className="p-4">{order.userId?.email}</td>
                <td className="p-4 font-semibold">₹{order.subtotal}</td>
                <td className="p-4 capitalize">{order.paymentMethod}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    disabled={updating === order._id}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[order.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {expanded === order._id ? "Hide ▲" : "Items ▼"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {expanded && (
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
          {orders.filter((o) => o._id === expanded).map((order) => (
            <div key={order._id}>
              <h2 className="text-lg font-bold mb-4">
                Order #{order._id.slice(0, 8)} — {order.shippingAddress?.fullName}
              </h2>
              <ul className="space-y-3">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 border rounded-lg p-4">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.productId?.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.productId?.price * item.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
