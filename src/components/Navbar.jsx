import { IoPerson, IoMenu, IoClose } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/SignUp";
import Cart from "./Cart";
import { useCart } from "../Context/CartContext";
import Address from "../Pages/Address";
import ModeOfPayment from "../Pages/ModeOfPayment";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const token = localStorage.getItem("token");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
    setMobileMenuOpen(false);
  };

  const handleOpenSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
    setMobileMenuOpen(false);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setOpenCart(false);
  };

  const handleCart = () => {
    setOpenCart(true);
    setMobileMenuOpen(false);
  };

  const handleOrders = () => {
    navigate("/orders");
    setIsProfileOpen(false);
    setMobileMenuOpen(false);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  //     setSearchQuery("");
  //     setMobileMenuOpen(false);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/search?query=${value}`
      );
      const data = await res.json();
      setSuggestions(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  };

  const handleSelect = (product) => {
    navigate(`/productDetails/${product._id}`); // Assuming your product details route is '/product/:id'
    setSearchQuery("");
    setSuggestions([]);
  };
  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <nav className="flex items-center justify-between h-20">
          {/* Logo - Always visible */}
          <div className="flex-shrink-0 w-32 md:w-40">
            <Link to="/">
              <img
                src={logo}
                alt="SkinBuddy"
                className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Search Bar - Always visible */}
          <div className="hidden sm:flex flex-1 max-w-xl mx-4 relative">
            <form className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f18526] focus:border-transparent transition-all"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f18526] text-white p-1.5 rounded-full hover:bg-[#d9731d] transition-colors"
              >
                <IoIosSearch size={20} />
              </button>
            </form>

            {/* Suggestions dropdown */}
            {suggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSelect(product)}
                    className="px-4 py-2 cursor-pointer hover:bg-orange-100 transition-colors"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop Navigation and Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-8 mr-6">
              {[
                { path: "/shop", label: "Shop" },
                { path: "/about-us", label: "About Us" },
                { path: "/contact-us", label: "Contact Us" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative text-lg font-medium text-gray-700 hover:text-[#f18526] transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#539d68] hover:after:w-full after:transition-all"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {token ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Profile"
                >
                  <IoPerson size={22} className="text-gray-700" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {/* <button
                      onClick={() => {
                        navigate("/profile");
                        setIsProfileOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      My Profile
                    </button> */}
                    <button
                      onClick={handleOrders}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleOpenLogin}
                className="px-4 py-2 bg-[#539d68] text-white rounded-md hover:bg-[#3e7a52] transition-colors font-medium"
              >
                Login
              </button>
            )}

            <div className="relative">
              <button
                onClick={handleCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Cart"
              >
                <FaCartShopping size={22} className="text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C91010] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={handleCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Cart"
              >
                <FaCartShopping size={22} className="text-gray-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C91010] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <IoClose size={26} className="text-gray-700" />
              ) : (
                <IoMenu size={26} className="text-gray-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Search (shown only when menu is closed) */}
        {!mobileMenuOpen && (
          <div className="sm:hidden pb-3 px-2">
            <form className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f18526] focus:border-transparent transition-all"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f18526] text-white p-1.5 rounded-full hover:bg-[#d9731d] transition-colors"
              >
                <IoIosSearch size={20} />
              </button>
            </form>
            {/* Suggestions dropdown */}
            {suggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSelect(product)}
                    className="px-4 py-2 cursor-pointer hover:bg-orange-100 transition-colors"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-4">
              {[
                { path: "/shop", label: "Shop" },
                { path: "/about-us", label: "About Us" },
                { path: "/contact-us", label: "Contact Us" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="py-2 px-4 text-lg font-medium text-gray-700 hover:text-[#f18526] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-4">
                {token ? (
                  <>
                    {/* <button
                      onClick={() => {
                        navigate("/profile");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 px-4 text-left text-lg font-medium text-gray-700 hover:text-[#f18526] hover:bg-gray-50 rounded-md transition-colors"
                    >
                      My Profile
                    </button> */}
                    <button
                      onClick={handleOrders}
                      className="w-full py-2 px-4 text-left text-lg font-medium text-gray-700 hover:text-[#f18526] hover:bg-gray-50 rounded-md transition-colors"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-4 text-left text-lg font-medium text-gray-700 hover:text-[#f18526] hover:bg-gray-50 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleOpenLogin}
                      className="w-full py-2 px-4 text-left text-lg font-medium text-gray-700 hover:text-[#f18526] hover:bg-gray-50 rounded-md transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleOpenSignup}
                      className="w-full py-2 px-4 text-left text-lg font-medium text-gray-700 hover:text-[#f18526] hover:bg-gray-50 rounded-md transition-colors"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <Login
        isOpen={showLogin}
        onClose={handleCloseModals}
        onSwitchToSignup={handleOpenSignup}
      />
      <Signup
        isOpen={showSignup}
        onClose={handleCloseModals}
        onSwitchToLogin={handleOpenLogin}
      />
      <Cart
        isCartOpen={openCart}
        onClose={handleCloseModals}
        showLogin={showLogin}
        onTriggerLogin={handleOpenLogin}
        onCheckout={() => {
          setOpenCart(false);
          setOpenAddress(true);
        }}
      />
      <Address
        isOpen={openAddress}
        onClose={() => setOpenAddress(false)}
        openCart={() => {
          setOpenAddress(false);
          setOpenCart(true);
        }}
        goToPayment={() => {
          setOpenAddress(false);
          setOpenPayment(true);
        }}
      />
      <ModeOfPayment
        isOpen={openPayment}
        onClose={() => setOpenPayment(false)}
        openCart={() => {
          setOpenPayment(false);
          setOpenAddress(true);
        }}
      />
    </div>
  );
}

export default Navbar;
