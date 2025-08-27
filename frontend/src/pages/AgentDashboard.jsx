import React from "react";

const AgentDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Agent Panel</h2>
        <nav className="flex flex-col gap-3">
          <a href="/agent/tasks" className="hover:bg-green-600 p-2 rounded">
            📋 My Tasks
          </a>
          <a href="/agent/deliveries" className="hover:bg-green-600 p-2 rounded">
            🚚 Deliveries
          </a>
          <a href="/agent/history" className="hover:bg-green-600 p-2 rounded">
            📜 Delivery History
          </a>
          <a href="/agent/profile" className="hover:bg-green-600 p-2 rounded">
            👤 Profile
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Delivery Agent Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-600">Active Tasks</h3>
            <p className="text-2xl font-bold text-green-700">8</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-600">Completed</h3>
            <p className="text-2xl font-bold text-blue-600">45</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-600">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">3</p>
          </div>
        </div>

        {/* Current Tasks Table */}
        <div className="bg-white shadow rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-4">Current Deliveries</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Task ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Address</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">#A101</td>
                <td className="p-3">Rahim Uddin</td>
                <td className="p-3">Mirpur-10, Dhaka</td>
                <td className="p-3 text-yellow-600">In Progress</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">#A102</td>
                <td className="p-3">Fatema Akter</td>
                <td className="p-3">Dhanmondi, Dhaka</td>
                <td className="p-3 text-green-600">Delivered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
