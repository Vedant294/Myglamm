import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID = "168690633241-mtndcres14guehjukti8vhbked2el0bh.apps.googleusercontent.com";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");
      if (data.user?.role !== "admin") {
        setError("Access denied. Admins only.");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">MyGlamm Admin</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in with your admin Google account</p>

          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
          )}

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => setError("Google login failed")}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
