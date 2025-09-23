import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../Context/AuthContext";
const Signup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const apiResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/google`,
        { tokenId: credential }
      );

      // Assuming API returns token
      const { token, user } = apiResponse.data; // backend should return user + token
      login(user, token);
      localStorage.setItem("token", token);
      fetchUserInfo(token);
      toast.success("Login successful");
      onClose();
    } catch (err) {
      message.error(
        err.response?.data?.message || "Google login failed. Please try again."
      );
    }
  };

  const handleGoogleFailure = () => {
    message.error("Google login failed. Please try again.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleSignup = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
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
          toast("Signup success");
          onClose();
        } else {
          const errorData = await response.json();
          console.error("Signup failed:", errorData.message);
          toast.error("User already exists");
        }
      } catch (error) {
        console.error("Signup error:", error.message);
        toast.error("Something went wrong. Please try again.");
      }
    };

    handleSignup();
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-[400px] relative">
        <button
          className="absolute top-4 right-3 text-gray-500 hover:text-black cursor-pointer"
          onClick={onClose}
        >
          <RxCross2 />
        </button>
        <h2
          className="text-xl font-semibold mb-6 text-center text-[#333]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
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
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
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
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#f18526] text-white py-2 rounded-md hover:bg-[#f18527] transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 flex justify-center items-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            className="text-[#539d68] hover:underline"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
