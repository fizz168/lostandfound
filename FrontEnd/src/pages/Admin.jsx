import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../components/Statusbadge'

function Admin({ items = [], addItem }) {
  const navigate = useNavigate()
  const [claims, setClaims] = useState([])
  const [claimsLoading, setClaimsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const itemCount = items.length
  const pendingClaims = claims.filter((claim) => claim.status === 'pending')

  const getToken = () => (typeof window !== 'undefined' ? window.localStorage.getItem('lostandfound-token') : '')

  const fetchClaims = async () => {
    setClaimsLoading(true)
    try {
      const token = getToken()
      const response = await fetch('/api/admin/claims', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      if (!response.ok) throw new Error('Failed to load claim requests')
      const data = await response.json()
      setClaims(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load claim requests', err)
      setClaims([])
    } finally {
      setClaimsLoading(false)
    }
  }

  useEffect(() => {
    fetchClaims()
  }, [])

  const updateClaimStatus = async (id, status) => {
    setActionLoading(true)
    try {
      const token = getToken()
      const response = await fetch(`/api/admin/claims/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.error || 'Failed to update claim status')
      }
      await fetchClaims()
      if (typeof addItem === 'function') addItem()
    } catch (err) {
      console.error('Failed to update claim status', err)
      window.alert('Unable to update claim status. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

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

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-gray-700">Claim Requests</h2>
            <p className="text-xs text-gray-400">Review incoming claim requests and approve or deny them.</p>
          </div>
          <div className="text-xs text-gray-500">
            {claimsLoading ? 'Loading requests…' : `${pendingClaims.length} pending`}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <th className="text-left px-5 py-3">Item</th>
                <th className="text-left px-5 py-3">Claimant</th>
                <th className="text-left px-5 py-3">Reason</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Submitted</th>
                <th className="text-left px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claimsLoading ? (
                <tr className="border-t border-gray-50">
                  <td colSpan="6" className="px-5 py-6 text-center text-gray-500">Loading claim requests...</td>
                </tr>
              ) : pendingClaims.length === 0 ? (
                <tr className="border-t border-gray-50">
                  <td colSpan="6" className="px-5 py-6 text-center text-gray-500">No pending claim requests.</td>
                </tr>
              ) : (
                pendingClaims.map((claim) => (
                  <tr key={claim.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-800">{claim.Item?.name || 'Unknown item'}</td>
                    <td className="px-5 py-3 text-gray-600">
                      <div>{claim.claimantName}</div>
                      <div className="text-xs text-gray-400">{claim.claimantEmail}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600 max-w-xs break-words">{claim.reason || 'No reason provided'}</td>
                    <td className="px-5 py-3 text-gray-600 capitalize">{claim.status}</td>
                    <td className="px-5 py-3 text-gray-600">{new Date(claim.createdAt).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <button
                        disabled={actionLoading}
                        onClick={() => updateClaimStatus(claim.id, 'approved')}
                        className="text-xs text-indigo-600 hover:underline mr-2 disabled:text-gray-300 disabled:hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={() => updateClaimStatus(claim.id, 'denied')}
                        className="text-xs text-red-500 hover:underline disabled:text-gray-300 disabled:hover:underline"
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
                  <td className="px-5 py-3">
                    <StatusBadge item={item} />
                  </td>
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