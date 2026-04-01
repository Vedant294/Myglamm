import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductManagement from "./pages/Product";
import UploadProducts from "./pages/UploadProducts";
import Orders from "./pages/Orders";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const isAuthenticated = () => !!localStorage.getItem("adminToken");

function ProtectedLayout() {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/upload-product" element={<UploadProducts />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}

export default App;
