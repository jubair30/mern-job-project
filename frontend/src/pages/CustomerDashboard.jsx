import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import { io } from "socket.io-client";
import { motion } from "framer-motion";


const socket = io("http://localhost:5000");

export default function CustomerDashboard() {
  const [form, setForm] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: "",
    paymentMode: "COD",
  });
  const [parcels, setParcels] = useState([]);

  const fetchParcels = async () => {
    const { data } = await API.get("/parcels/my");
    setParcels(data);
  };

  useEffect(() => {
    socket.on("statusUpdate", () => fetchParcels());
  }, []);

  const bookParcel = async (e) => {
    e.preventDefault();
    await API.post("/parcels/book", form);
    fetchParcels();
  };

  useEffect(() => {
    //fetchParcels();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-indigo-100 p-6">
      <h1 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
        Customer Dashboard ✨
      </h1>

      {/* Form */}
      <motion.form
        onSubmit={bookParcel}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg max-w-lg mx-auto mb-10 border border-pink-200"
      >
        <input
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition"
          placeholder="📍 Pickup Address"
          onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
        />
        <input
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition"
          placeholder="🚚 Delivery Address"
          onChange={(e) => setForm({ ...form, deliveryAddress: e.target.value })}
        />
        <input
          className="border p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition"
          placeholder="📦 Parcel Type"
          onChange={(e) => setForm({ ...form, parcelType: e.target.value })}
        />
        <select
          className="border p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none transition"
          onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}
        >
          <option value="COD">💵 Cash on Delivery</option>
          <option value="Prepaid">💳 Prepaid</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition duration-300"
        >
          Book Parcel
        </motion.button>
      </motion.form>

      {/* My Bookings */}
      <h2 className="text-2xl font-bold text-purple-700 mb-4">My Bookings 📑</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {parcels.map((p) => (
          <motion.div
            key={p._id}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl shadow-md bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200"
          >
            <p>
              <b className="text-pink-600">Pickup:</b> {p.pickupAddress}
            </p>
            <p>
              <b className="text-purple-600">Delivery:</b> {p.deliveryAddress}
            </p>
            <p>
              <b className="text-indigo-600">Status:</b>{" "}
              <span className="font-semibold">{p.status}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
