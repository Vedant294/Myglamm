/* eslint-disable no-unused-vars */
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useProduct } from "../Context/ProductContext";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { IoArrowBackOutline } from "react-icons/io5";
const usageData = {
  steps: [
    {
      title: "Cleanse Your Face",
      description:
        "Start with a clean face. Use your regular cleanser to remove dirt, oil, and makeup.",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Apply the Product",
      description:
        "Take a small amount of product and gently massage onto your face using upward circular motions.",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      title: "Let It Absorb",
      description:
        "Allow the product to fully absorb into your skin before applying other products.",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ],
};

import {
  StarIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
function ProductDetails() {
  const { fetchProductById } = useProduct();
  const { addToCart } = useCart();
  const [num, setNum] = useState(1);
  const token = localStorage.getItem("token");
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Description");
  const handleAddOne = () => setNum(num + 1);

  const handleRemoveOne = () => {
    if (num > 1) setNum(num - 1);
  };

  useEffect(() => {
    const productById = async () => {
      const response = await fetchProductById(id);
      setDetails(response);
    };
    productById();
  }, [id]);

  const handleCart = async (product) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: [
              {
                productId: product._id,
                quantity: num,
              },
            ],
          }),
        }
      );


    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!details) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-28 lg:pt-20 pb-10 bg-gray-50">
      <div className="w-[90%] max-w-6xl">
        <motion.button
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 lg:mt-5 mt-10 mb-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <IoArrowBackOutline />
          <span className="text-sm font-medium">Back to Products</span>
        </motion.button>
      </div>
      {/* Product Card */}
      <div className="w-[90%] max-w-6xl bg-white rounded-xl  p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 lg:flex">
        {/* Image Section */}
        <div className="lg:w-[40%] flex items-center justify-center p-4 bg-gray-50 rounded-lg">
          <img
            src={details.image}
            alt={details.name}
            className="max-h-[400px] object-contain mix-blend-multiply"
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-[60%] space-y-4 mt-6 lg:mt-0 lg:pl-8">
          <div className="border-b pb-4 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">{details.name}</h2>
            <div className="flex items-center mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">(24 reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{details.description}</p>

          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="font-bold text-2xl text-amber-600">
              <span className="text-gray-600 text-base font-normal">MRP: </span>
              ₹{details.price}
            </p>
            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            <p className="text-green-600 text-sm font-medium mt-1">
              <CheckCircleIcon className="w-4 h-4 inline mr-1" />
              In Stock (Only 5 left)
            </p>
          </div>

          <div className="pt-2">
            <p className="font-medium text-gray-700 mb-2">Quantity</p>
            <div className="flex items-center gap-4 px-4 py-2 text-lg bg-gray-100 rounded-lg w-fit border border-gray-200">
              <button
                onClick={handleRemoveOne}
                className="text-gray-500 hover:text-amber-600 transition-colors"
              >
                <FaMinus className="cursor-pointer" />
              </button>
              <span className="w-8 text-center font-medium">{num}</span>
              <button
                onClick={handleAddOne}
                className="text-gray-500 hover:text-amber-600 transition-colors"
              >
                <FaPlus className="cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pt-4">
            <button
              className="flex-1  px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg  lg:text-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2"
              onClick={() => {
                addToCart(details), handleCart(details);
              }}
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              className="px-6 py-3 border border-amber-600 text-amber-600 hover:bg-amber-50 rounded-lg text-lg font-medium transition-colors duration-300"
              onClick={() => {
                addToCart(details), handleCart(details);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="w-[90%] max-w-6xl mt-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {["Description", "How to Use"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "Description" ? (
              <div className="prose max-w-none text-gray-600">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Product Details
                </h3>
                <p>{details.description}</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                  Key Features
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>100% Natural Ingredients</li>
                  <li>Cruelty Free & Vegan</li>
                  <li>No Artificial Preservatives</li>
                  <li>Made in Small Batches</li>
                </ul>
              </div>
            ) : (
              <div className="text-gray-600">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Recommended Usage Instructions
                </h3>

                <div className="space-y-8">
                  {usageData.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-6"
                    >
                      <div className="md:w-1/3">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-start">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <h4 className="text-lg font-medium text-gray-800">
                            {step.title}
                          </h4>
                        </div>
                        <p className="mt-2 ml-11">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="font-medium text-amber-800 mb-2">Pro Tip</h4>
                  <p className="text-amber-700">
                    For best results, use this product twice daily - morning and
                    night - as part of your skincare routine.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {/* <div className="w-[90%] max-w-6xl mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
      {/* Map through related products here */}
      {/* </div>
      </div> */}
    </div>
  );
}

export default ProductDetails;
