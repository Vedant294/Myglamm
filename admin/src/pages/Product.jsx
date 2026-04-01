import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiStar } from "react-icons/fi";
import { getAllProducts ,deleteProductById} from "../api/Api";
import { useNavigate } from "react-router";
import Button from "../components/Button";
function ProductManagement() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (productId) => async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      await deleteProductById(productId);
      setProducts(products.filter((product) => product._id !== productId));
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      console.log(data)
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      {/* Header + Upload Button */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0  items-center mb-6">
        <h2 className="text-2xl font-bold ">Product Management</h2>  
        <Button onClick={() => {navigate("/upload-product")}}><FiPlus/> Upload Product</Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

            {/* Product Info */}
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="mt-2 font-medium text-blue-600">
              ₹{product.price}{" "}
              <span className="text-sm text-gray-400">/ {product.weight}</span>
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-yellow-500 text-sm">
                <FiStar /> {product.rating}
              </span>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-4 pt-3 border-t text-sm">
              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
              onClick={() => navigate(`/upload-product`,{
                state: { product }
              })}>
                <FiEdit /> Edit
              </button>
              <button className="flex items-center gap-1 text-red-500 hover:text-red-700"
              onClick={handleDelete(product._id)}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManagement;
