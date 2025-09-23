import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
function Login({ isOpen, onClose, onSwitchToSignup }) {
  const { login } = useAuth();

  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchUserInfo = async (token) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const apiResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google`,
        { token: credential }
      );

      // Assuming API returns token
      const { token ,user } = apiResponse.data;
      login(user, token);
      localStorage.setItem("token", token);
      fetchUserInfo(token);
      toast.success("Login successful");
      onClose();
    } catch (err) {
      console.error(
        err.response?.data?.message || "Google login failed. Please try again."
      );
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google login failed. Please try again.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleLogin = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const data = await response.json();
          login(data.user, data.token);
          toast("Login success");
          localStorage.setItem("token", data.token);
          onClose();
        } else {
          const errorData = await response.json();
          toast.error("Login failed:", errorData.message);
        }
      } catch (error) {
        console.log("Login error:", error.message);
        toast.error("Something went wrong. Please try again.");
      }
    };

    handleLogin();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/70">
      <div className="bg-white p-6 rounded-md w-full max-w-[400px] relative">
        <button
          className="absolute text-gray-500 cursor-pointer top-4 right-3 hover:text-black"
          onClick={onClose}
        >
          <RxCross2 />
        </button>
        <h2
          className="text-xl font-semibold mb-6 text-center text-[#333]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#f18526] text-white py-2 rounded-md hover:bg-[#f18527] transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 flex justify-center items-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            className="text-[#539d68] hover:underline"
            onClick={onSwitchToSignup}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
