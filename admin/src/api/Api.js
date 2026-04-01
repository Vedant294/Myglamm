import axios from "axios";

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
});

export const getAllProducts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/product`);
  return res.data;
};

export const postAllProducts = async (productData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_API}/product/products`,
    productData,
    getAuthHeaders()
  );
  return res.data;
};

export const deleteProductById = async (productId) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BACKEND_API}/product/products/${productId}`,
    getAuthHeaders()
  );
  return res.data;
};

export const updateProductById = async (productId, productData) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BACKEND_API}/product/products/${productId}`,
    productData,
    getAuthHeaders()
  );
  return res.data;
};

export const getAllOrders = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_API}/orders/admin`,
    getAuthHeaders()
  );
  return res.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BACKEND_API}/orders/admin/${orderId}/status`,
    { status },
    getAuthHeaders()
  );
  return res.data;
};

export const getAllContacts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_API}/contact`,
    getAuthHeaders()
  );
  return res.data;
};
