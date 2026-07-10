import { useNavigate } from 'react-router-dom'

function Admin({ items = [], addItem }) {
  const navigate = useNavigate()
  const itemCount = items.length

  const removeItem = async (id) => {
    const confirmed = window.confirm('Remove this item from the database?')
    if (!confirmed) return

    const token = window.localStorage.getItem('lostandfound-token')
    try {
      const response = await fetch(`/api/admin/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.error || 'Failed to delete item.')
      }

      if (typeof addItem === 'function') {
        addItem()
      }
    } catch (err) {
      console.error('Failed to remove item', err)
      window.alert('Unable to remove item. Please try again.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage users, items, and claims for the lost and found system</p>
        </div>
        <div className="rounded-2xl bg-indigo-600 px-5 py-4 text-white shadow-sm">
          <div className="text-xs uppercase tracking-wide text-indigo-100">Items in database</div>
          <div className="mt-2 text-3xl font-semibold">{itemCount}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Item Inventory</h2>
          <p className="text-xs text-gray-400">View item details directly from the admin console</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Category</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Reporter</th>
              <th className="text-left px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr className="border-t border-gray-50">
                <td colSpan="5" className="px-5 py-6 text-center text-gray-500">No items found in the database.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-5 py-3 text-gray-600">{item.category}</td>
                  <td className="px-5 py-3 text-gray-600 capitalize">{item.status || item.type}</td>
                  <td className="px-5 py-3 text-gray-600">{item.reporter}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => navigate(`/detail/${item.id}`, { state: { fromAdmin: true } })}
                      className="text-xs text-indigo-600 hover:underline mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Admin;