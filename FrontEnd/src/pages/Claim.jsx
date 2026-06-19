import { useNavigate, useParams } from 'react-router-dom'

function Claim({ items }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const item = items.find(entry => String(entry.id) === String(id))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!item) {
    navigate('/browse')
    return null
  }

  const apiBase = process.env.REACT_APP_API_BASE || 'http://localhost:4000'

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiBase}/api/items/${item.id}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimant: { name, email }, reason }),
      })
      if (!res.ok) throw new Error('Failed to submit claim')
      navigate('/browse')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input value={name} onChange={e => setName(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Your name" />
          <input value={email} onChange={e => setEmail(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" placeholder="University email" type="email" />
          <textarea value={reason} onChange={e => setReason(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 resize-none" rows={4} placeholder="Tell us why this item belongs to you" />

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
            {loading ? 'Submitting…' : 'Submit Claim'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Claim
