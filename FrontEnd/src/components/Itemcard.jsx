// function ItemCard({ item, onClick }) {
//   return (
//     <div onClick={onClick} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all">
//       <div className="h-36 bg-gray-100 overflow-hidden">
//         <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
//       </div>
//       <div className="p-4">
//         <div className="flex items-start justify-between gap-2 mb-1">
//           <h3 className="font-semibold text-gray-800 text-sm leading-snug">{item.name}</h3>
//           <StatusBadge item={item} />
//         </div>
//         <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
//         <div className="flex items-center justify-between text-xs text-gray-400">
//           <span>📍 {item.location}</span>
//           <span>📅 {item.date}</span>
//         </div>
//         <div className="mt-1">
//           <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.category}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemCard;

// 1. Missing StatusBadge Component Defined Inline
function StatusBadge({ item }) {
  // Check if item type is 'lost' or 'found' (fallback to 'lost' if undefined)
  const isLost = item.type === 'lost';
  
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0 shadow-sm capitalize ${
      isLost ? 'bg-red-500' : 'bg-[#296eb4]'
    }`}>
      {item.type || 'Lost'}
    </span>
  );
}

// 2. Main ItemCard Component
function ItemCard({ item, onClick }) {
  return (
    <div 
      onClick={onClick} 
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col h-full"
    >
      {/* Card Thumbnail Image container */}
      <div className="h-36 bg-gray-100 overflow-hidden">
        <img 
          src={item.img || 'https://via.placeholder.com/150'} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Card Content Information Details wrapper */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-1">
            {item.name}
          </h3>
          {/* StatusBadge execution handles without errors now */}
          <StatusBadge item={item} />
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-grow">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span className="line-clamp-1 max-w-[60%]">📍 {item.location}</span>
          <span className="shrink-0">📅 {item.date}</span>
        </div>
        
        <div className="mt-auto pt-1">
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
            {item.category}
          </span>
        </div>
      </div>

    </div>
  );
}

export default ItemCard;