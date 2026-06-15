import { useNavigate, useParams } from 'react-router-dom'

function Claim({ items }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const item = items.find(entry => String(entry.id) === String(id))

  if (!item) {
    navigate('/browse')
    return null
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button onClick={() => navigate(`/detail/${item.id}`)} className="text-sm text-indigo-600 hover:underline mb-4">← Back to item</button>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Claim Item</h1>
          <p className="text-sm text-gray-500 mt-1">Submit your claim for {item.name}.</p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 space-y-1">
          <div><span className="font-semibold text-gray-700">Item:</span> {item.name}</div>
          <div><span className="font-semibold text-gray-700">Location:</span> {item.location}</div>
          <div><span className="font-semibold text-gray-700">Status:</span> {item.status}</div>
        </div>

        <div className="space-y-3">
          <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Your name" />
          <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" placeholder="University email" type="email" />
          <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 resize-none" rows={4} placeholder="Tell us why this item belongs to you" />
        </div>

        <button onClick={() => navigate('/browse')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
          Submit Claim
        </button>
      </div>
    </div>
  )
}

export default Claim
