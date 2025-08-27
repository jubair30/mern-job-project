import React, { useEffect, useState } from "react";
import axios from "axios";

const ParcelList = () => {
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

  if (loading) return <p>Loading parcels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Parcel List</h2>
      {parcels.length === 0 ? (
        <p>No parcels found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Pickup Address</th>
              <th>Delivery Address</th>
              <th>Parcel Type</th>
              <th>Payment Mode</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel._id}</td>
                <td>{parcel.customerId?.name || "N/A"}</td>
                <td>{parcel.pickupAddress}</td>
                <td>{parcel.deliveryAddress}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.paymentMode}</td>
                <td>{parcel.status}</td>
                <td>{new Date(parcel.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParcelList;
