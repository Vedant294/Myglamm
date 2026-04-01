import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiInfo,
  FiMail,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  const navItems = useMemo(
    () => [
      { name: "Dashboard", path: "/", icon: <MdDashboard /> },
      { name: "Product Management", path: "/products", icon: <FiInfo /> },
      { name: "Contact", path: "/contact", icon: <FiMail /> },
      { name: "Orders", path: "/orders", icon: <FiUser /> },
    ],
    []
  );

  useEffect(() => {
    if (isMobile) setOpen(false);
  }, [location, isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!open || !isMobile) return;
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar") && !event.target.closest(".sidebar-toggle")) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, isMobile]);

  return (
    <>
      <button
        className="sidebar-toggle lg:hidden p-3 text-2xl fixed top-2 left-2 z-50 bg-[#f18526]/70 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      {open && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`sidebar fixed lg:static top-0 left-0 h-full w-64 p-5 transition-transform duration-300 z-40 shadow-xl bg-white
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
       <div className="flex items-center mb-4 mt-4 justify-center">
          <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            <span style={{ color: "#c9a84c" }}>My</span>
            <span className="text-gray-900">Glamm</span>
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => isMobile && setOpen(false)}
              className={({ isActive }) =>
                `flex items-center p-3 rounded transition-all
                ${isActive ? "bg-[#539d68] text-white font-medium" : "hover:bg-[#539d68]/20 hover:text-[#539d68] text-gray-700"}`
              }
            >
              <span className="mr-3 text-lg">{icon}</span>
              {name}
            </NavLink>
          ))}
        </nav>

        {/* <div className="my-6 border-t border-indigo-500/40"></div> */}

        <button onClick={handleLogout} className="flex items-center mt-2 w-full p-3 rounded-lg transition-all hover:bg-red-500 hover:text-white text-gray-700">
          <FiLogOut className="mr-3 text-lg" />
          Logout
        </button>

        <div className="flex items-center mt-6 pt-6 border-t border-indigo-500/40">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
            {user.picture ? (
              <img src={user.picture} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <FiUser className="text-white" />
            )}
          </div>
          <div>
            <p className="font-medium text-sm">{user.name || "Admin"}</p>
            <p className="text-xs text-gray-500">{user.email || ""}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
export default Sidebar;
