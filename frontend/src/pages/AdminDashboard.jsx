import React from "react";
import Parcel from "../components/parcel";
import Parcels from "../components/Percels";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <a href="/admin/users" className="hover:bg-blue-600 p-2 rounded">
            👥 Manage Users
          </a>
          <a href="/admin/orders" className="hover:bg-blue-600 p-2 rounded">
            📦 Manage Orders
          </a>
          <a href="/admin/agents" className="hover:bg-blue-600 p-2 rounded">
            🚚 Manage Agents
          </a>
          <a href="/admin/settings" className="hover:bg-blue-600 p-2 rounded">
            ⚙️ Settings
          </a>
        </nav>
      </aside>

      <Parcels />
    </div>
  );
};

export default AdminDashboard;
