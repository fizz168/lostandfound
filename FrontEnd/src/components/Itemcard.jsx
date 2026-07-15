function StatusBadge({ item }) {
  const normalizedStatus = (item?.status || item?.type || 'found').toLowerCase()
  const isClaim = ['claim', 'claimed'].includes(normalizedStatus)
  const isLost = item?.type === 'lost' && !isClaim
  const label = isClaim ? 'Claim' : isLost ? 'Lost' : 'Found'

  return (
    <span
      className={`shrink-0 border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] ${
        isClaim ? 'bg-[#7C3AED] text-white' : isLost ? 'bg-[#D02020] text-white' : 'bg-[#1040C0] text-white'
      }`}
    >
      {label}
    </span>
  )
}

function ItemCard({ item, onClick }) {
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
  
  const getImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/150'
    if (imgPath.startsWith('http')) return imgPath
    if (imgPath.startsWith('/')) return `${apiBase}${imgPath}`
    return imgPath
  }

  const imageUrl = getImageUrl(item.img)

  return (
    <div
      onClick={onClick}
      className="flex h-full cursor-pointer flex-col overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_#121212] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative h-44 bg-[#E0E0E0]">
        <span className="absolute right-3 top-3 h-5 w-5 rounded-full border-2 border-black bg-[#F0C020]" />
        <img
          src={imageUrl}
          alt={item.name}
          className="h-full w-full object-cover duration-300 hover:grayscale-0"
        />
      </div>

      <div className="flex flex-grow flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-black line-clamp-1">
            {item.name}
          </h3>
          <StatusBadge item={item} />
        </div>

        <p className="mb-3 flex-grow text-sm text-[#3a3a3a] line-clamp-2">
          {item.description}
        </p>

        <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-black/60">
          <span className="line-clamp-1 max-w-[60%]">📍 {item.location}</span>
          <span className="shrink-0">📅 {item.date}</span>
        </div>

        <div className="mt-auto pt-1">
          <span className="border-2 border-black bg-[#F0F0F0] px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;