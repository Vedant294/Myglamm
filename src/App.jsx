import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import ProductDetails from "./Pages/ProductDetails"
import Shop from "./Pages/Shop";
import OrderHistory from "./Pages/OrderHistory";
import About from "./StaticPages/About";
import Contact from "./StaticPages/Contact";
import ViewAll from "./components/ViewAll";
import ViewAllBestSeller from "./Pages/ViewAllBestSeller";
import ScrollToTop from "./ScrollToTop";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/all/:skinType" element={<ViewAll />} />
        <Route path="/all/Best-seller" element={<ViewAllBestSeller />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
