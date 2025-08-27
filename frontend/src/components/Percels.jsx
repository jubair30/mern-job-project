import React, { useEffect, useState } from "react";
import axios from "axios";

const Parcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/parcel");
        setParcels(response.data);
      } catch (err) {
        setError("Failed to fetch parcels");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "In Transit":
        return "text-blue-600";
      case "Picked Up":
        return "text-purple-600";
      case "Failed":
        return "text-red-600";
      default:
        return "text-yellow-600"; // Booked or pending
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h3 className="text-xl font-semibold mb-4">Recent Parcels</h3>
      {loading ? (
        <p>Loading parcels...</p>
      ) : error ? (
        <p>{error}</p>
      ) : parcels.length === 0 ? (
        <p>No parcels found</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Parcel ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Delivery</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="border-b">
                <td className="p-3">#{parcel._id.slice(-6)}</td>
                <td className="p-3">{parcel.customerId?.name || "N/A"}</td>
                <td
                  className={`p-3 font-semibold ${getStatusColor(
                    parcel.status
                  )}`}
                >
                  {parcel.status}
                </td>
                <td className="p-3">{parcel.pickupAddress}</td>
                <td className="p-3">{parcel.deliveryAddress}</td>
                <td className="p-3">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Parcels;
