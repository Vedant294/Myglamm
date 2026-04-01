/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiCheck,
  FiImage,
  FiDollarSign,
  FiBox,
  FiAward,
  FiLoader,
  FiAlertCircle,
  FiShoppingCart,
} from "react-icons/fi";
import { postAllProducts, updateProductById } from "../api/Api"; 

function UploadProducts() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; 

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "",
    price: product?.price || "",
    image: "",
    previewUrl: product?.image || "",
    stock: product?.stock || 1,
    weight: product?.weight || "",
    bestseller: product?.bestseller || false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        image: file,
        previewUrl: file ? URL.createObjectURL(file) : formData.previewUrl,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const dataToSend = new FormData();
      
      // Append all form data except previewUrl
      Object.keys(formData).forEach(key => {
        if (key !== 'previewUrl') {
          dataToSend.append(key, formData[key]);
        }
      });
      
      if (product) {
        // Update existing product
        await updateProductById(product._id, dataToSend);
      } else {
        // Create new product
        await postAllProducts(dataToSend);
      }
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after submission for new products
      if (!product) {
        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          image: null,
          previewUrl: "",
          stock: 1,
          weight: "",
          rating: 0,
          bestseller: false,
        });
      }

      // Redirect to product management page after a delay
      setTimeout(() => navigate("/products"), 1500);
    } catch (error) {
      console.error("Error submitting product:", error);
      setIsSubmitting(false);
      setErrors({ submit: "Failed to save product. Please try again." });
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {product ? "Edit Product" : "Create New Product"}
        </h2>
        <p className="text-gray-600 mt-2">
          {product ? "Update product details" : "Add a new product to your inventory"}
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 flex items-center">
          <FiCheck className="w-5 h-5 mr-2" />
          Product {product ? "updated" : "created"} successfully!
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center">
          <FiAlertCircle className="w-5 h-5 mr-2" />
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FiShoppingCart className="mr-2" /> Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Hydrating Face Cream"
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe the product features and benefits..."
            required
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.description}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Oily">Oily Skin</option>
            <option value="Dry">Dry Skin</option>
            <option value="Combination">Combination Skin</option>
            <option value="Sensitive">Sensitive Skin</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.category}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FiDollarSign className="mr-2" /> Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <FiDollarSign />
            </span>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.price}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FiImage className="mr-2" /> Upload Image
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">
              <FiImage />
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.image && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.image}
            </p>
          )}
          {formData.previewUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Image Preview:</p>
              <div className="h-50 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={formData.previewUrl}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
            <FiBox className="mr-2" /> Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight
          </label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.weight ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., 50ml, 100g"
            required
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {errors.weight}
            </p>
          )}
        </div>

        {/* Bestseller */}
        <div className="md:col-span-2 flex items-start pt-4">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="bestseller"
              checked={formData.bestseller}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              id="bestseller"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="bestseller"
              className="font-medium text-gray-700 flex items-center"
            >
              <FiAward className="mr-2 text-blue-600" /> Mark as Bestseller
            </label>
            <p className="text-gray-500">
              Featured products get highlighted on the homepage
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            } text-white transition-colors`}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Processing...
              </>
            ) : (
              <>
                <FiPlus className="mr-2" />
                {product ? "Update Product" : "Create Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadProducts;