// src/components/Parcel.jsx
import React, { useState } from "react";
import axios from "axios";

const Parcel = ({ onSuccess }) => {
  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: "",
    paymentType: "COD",
  });

  // handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/parcel`, form);
      alert("Parcel booked successfully!");
      if (onSuccess) onSuccess(); // refresh parent if needed
    } catch (err) {
      console.error(err);
      alert("Failed to book parcel");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Book a Parcel</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="sender"
          placeholder="Sender Name"
          value={form.sender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="receiver"
          placeholder="Receiver Name"
          value={form.receiver}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={form.pickupAddress}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={form.deliveryAddress}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="parcelType"
          placeholder="Parcel Type (e.g. Small, Medium, Large)"
          value={form.parcelType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="paymentType"
          value={form.paymentType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Prepaid">Prepaid</option>
        </select>

        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded w-full hover:bg-pink-700 transition"
        >
          Book Parcel
        </button>
      </form>
    </div>
  );
};

export default Parcel;
