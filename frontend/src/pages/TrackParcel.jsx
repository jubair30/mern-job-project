import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosConfig";
import { socket } from "../socket";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "420px" };

export default function TrackParcel() {
  const { id } = useParams(); // parcel id
  const [parcel, setParcel] = useState(null);
  const [center, setCenter] = useState({ lat: 23.8103, lng: 90.4125 }); // Dhaka default
  const [trail, setTrail] = useState([]); // keep a breadcrumb of positions
  const mapRef = useRef(null);

  const fetchParcel = async () => {
    const { data } = await API.get(`/parcels/track/${id}`);
    setParcel(data);
    if (data?.currentLocation?.lat && data?.currentLocation?.lng) {
      const c = { lat: data.currentLocation.lat, lng: data.currentLocation.lng };
      setCenter(c);
      setTrail([c]);
    }
  };

  useEffect(() => {
    fetchParcel();
    // listen to server pushes and filter by this parcel id
    const onLocation = (p) => {
      if (p?._id !== id) return;
      const c = { lat: p.currentLocation.lat, lng: p.currentLocation.lng };
      setParcel(p);
      setCenter(c);
      setTrail(prev => [...prev, c].slice(-50)); // keep last 50 points
      // smooth pan
      if (mapRef.current) {
        const map = mapRef.current;
        map.panTo(c);
      }
    };
    const onStatus = (p) => {
      if (p?._id !== id) return;
      setParcel(p);
    };

    socket.on("locationUpdate", onLocation);
    socket.on("statusUpdate", onStatus);

    return () => {
      socket.off("locationUpdate", onLocation);
      socket.off("statusUpdate", onStatus);
    };
  }, [id]);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Live Tracking</h1>

      {parcel ? (
        <>
          <div className="mb-3 bg-white p-4 rounded-xl shadow">
            <p><b>Parcel ID:</b> {parcel._id}</p>
            <p><b>Status:</b> {parcel.status}</p>
            <p><b>Pickup:</b> {parcel.pickupAddress}</p>
            <p><b>Delivery:</b> {parcel.deliveryAddress}</p>
            {parcel.assignedAgent && (
              <p><b>Agent:</b> {parcel.assignedAgent.name || parcel.assignedAgent.email}</p>
            )}
          </div>

          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              onLoad={(map)=> (mapRef.current = map)}
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
            >
              {parcel?.currentLocation && (
                <Marker position={{
                  lat: parcel.currentLocation.lat,
                  lng: parcel.currentLocation.lng
                }} />
              )}

              {trail.length > 1 && (
                <Polyline
                  path={trail}
                  options={{ strokeOpacity: 0.8, strokeWeight: 4 }}
                />
              )}
            </GoogleMap>
          </LoadScript>
        </>
      ) : (
        <div className="p-4 bg-yellow-50 rounded">Loading parcel…</div>
      )}
    </div>
  );
}
