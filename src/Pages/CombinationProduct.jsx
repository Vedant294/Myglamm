/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useProduct } from "../Context/ProductContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
function CombinationProduct() {
  const { getAllProductsByCategory } = useProduct();
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();
  const [dry, setDry] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getAllProductsByCategory("Combination");
      setDry(response);
    };
    fetchProduct();
  }, []);

  const showProdDetails = (id) => {
    navigate(`/productDetails/${id}`);
  };
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
                quantity: 1,
              },
            ],
          }),
        }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="w-full py-16 ">
      <div className="w-full px-4 mx-auto sm:px-6 lg:px-8">
        <h2
          className="mb-12 text-3xl font-bold text-center md:text-4xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          For Combination Skin
          <div className="w-24 h-1 bg-[#f18526] mx-auto mt-4 rounded-full"></div>
        </h2>

        <div className="grid gap-3 lg:gap-8 grid-cols-2 lg:grid-cols-4">
          {dry && dry.length > 0
            ? dry.slice(0, 4).map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative h-[350px] w-full overflow-hidden">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    onClick={() => showProdDetails(product?._id)}
                  />
                  <div
                    className="absolute px-3 py-1 text-xs font-medium text-gray-800 transition-opacity duration-300 rounded-full opacity-0 cursor-pointer top-4 right-4 bg-white/90 backdrop-blur-sm group-hover:opacity-100"
                    onClick={() => showProdDetails(product?._id)}
                  >
                    Quick View
                  </div>
                </div>


                {/* Product Info */}
                <div className="lg:p-5 p-1.5 space-y-2 border-t border-gray-100">
                  <h3
                    className="text-[15px] font-semibold text-gray-800"
                    onClick={() => showProdDetails(product?._id)}
                  >
                    {product?.name}
                  </h3>
                  <div>
                    <p className="text-[16px] font-bold text-[#f18526]">
                      ₹{product?.price}
                    </p>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:items-center">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">
                      (24 reviews)
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full lg:py-2 py-1 px-4 bg-[#539d68] hover:bg-[#3e7a52] text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    onClick={() => {
                      addToCart(product);
                      handleCart(product);
                    }}
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))
            : [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            className="px-8 py-3 border-2 border-[#f18526] text-[#f18526] font-medium rounded-full hover:bg-[#f18526] hover:text-white transition-colors duration-300"
            onClick={() => navigate("/all/Combination")}
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
}

export default CombinationProduct;
