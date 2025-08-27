import React, { useState } from "react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Logging in with:", email, password);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SECTION */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 text-white p-10 relative"
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Welcome Back 🚀
        </h1>
        <p className="mt-4 text-lg opacity-90">
          S & S Courier Parcel – Fast, Secure & Reliable
        </p>

        {/* Decorative circle */}
        <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50"
      >
        <div className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/40">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Login to S & S Courier
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter your credentials below
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="📧 your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="🔒••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none transition"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition duration-300"
            >
              {loading ? "⏳ Logging in..." : "Login"}
            </motion.button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-pink-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
