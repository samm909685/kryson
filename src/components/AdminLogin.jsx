import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
 const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login Successful");

        localStorage.setItem("admin", JSON.stringify(data.admin));

        navigate("/admin/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Kryson Logo"
            className="h-20 object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <ShieldCheck className="text-blue-600" size={32} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Admin Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to manage Kryson Life Science
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

              <Mail className="text-gray-400" size={20} />

              <input
  type="email"
  placeholder="admin@kryson.com"
  className="w-full ml-3 outline-none bg-transparent"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

            </div>
          </div>

          {/* Password */}
          <div>

            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

              <Lock className="text-gray-400" size={20} />

              <input
  type={showPassword ? "text" : "password"}
  placeholder="••••••••"
  className="w-full ml-3 outline-none bg-transparent"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-500" size={20} />
                ) : (
                  <Eye className="text-gray-500" size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}
          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          © 2026 Kryson Life Science
        </div>

      </div>
    </div>
  );
}