import { useState } from 'react'
import RECENT_ACTIVITY from '../data/activity'

function Admin() {
  const [tab, setTab] = useState("items");
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Manage users, items, and claims for the lost and found system</p>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Recent Activity</h2>
          <p className="text-xs text-gray-400">Latest actions in the system</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3">Action</th>
              <th className="text-left px-5 py-3">Item</th>
              <th className="text-left px-5 py-3">User</th>
              <th className="text-left px-5 py-3">Time</th>
              <th className="text-left px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_ACTIVITY.map((row, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 text-gray-600">{row.action}</td>
                <td className="px-5 py-3 font-medium text-gray-800">{row.item}</td>
                <td className="px-5 py-3 text-gray-600">{row.user}</td>
                <td className="px-5 py-3 text-gray-400">{row.time}</td>
                <td className="px-5 py-3">
                  <button className="text-xs text-indigo-600 hover:underline mr-2">View</button>
                  <button className="text-xs text-red-500 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Admin;