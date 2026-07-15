import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../components/Statusbadge'

function Detail({ items }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
  const fromAdmin = location.state?.fromAdmin
  const fromBrowse = location.state?.fromBrowse
  const item = items.find(entry => String(entry.id) === String(id))

  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/300'
    if (imgPath.startsWith('http')) return imgPath
    if (imgPath.startsWith('/')) return `${apiBase}${imgPath}`
    return imgPath
  }

  const imageUrl = getImageUrl(item?.img)

  if (!item) return <Navigate to="/browse" replace />;
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(fromAdmin ? '/admin' : fromBrowse ? '/browse' : '/')}
        className="text-sm text-indigo-600 hover:underline mb-6 flex items-center gap-1"
      >
        ← Back
      </button>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <img src={imageUrl} alt={item.name} className="w-full h-56 object-cover" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
            <StatusBadge item={item} />
          </div>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.category}</span>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Description</div>
              <p>{item.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{item.type === "lost" ? "Date Lost" : "Date Found"}</div>
                <p>{new Date(item.date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{item.type === "lost" ? "Location Lost" : "Location Found"}</div>
                <p>{item.location}</p>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Reported By</div>
              <p>{item.reporter}</p>
            </div>
          </div>
 
          {item.type === "found" && (
            <button onClick={() => navigate(`/claim/${item.id}`)} className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
              Claim This Item
            </button>
          )}
 
          <div className="mt-5 border-t border-gray-100 pt-5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Contact Information</div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm text-gray-600">
              <div>✉️ {item.email}</div>
              {item.phone && <div>📞 {item.phone}</div>}
            </div>
            <p className="text-xs text-gray-400 mt-2">💡 Please be respectful and verify ownership before arranging pickup or delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Detail;