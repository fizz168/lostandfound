import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemCard from '../components/Itemcard'

function Browse({ items }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Items");
  const [catFilter, setCatFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
 
  const categories = ["All Categories", ...new Set(items.map(i => i.category))];
 
  const filtered = items.filter(item => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All Items" || (typeFilter === "Lost" ? item.type === "lost" : item.type === "found");
    const matchCat = catFilter === "All Categories" || item.category === catFilter;
    const normalizedStatus = item.status?.toLowerCase();
    const matchStatus = statusFilter === "All Status" || normalizedStatus === statusFilter.toLowerCase() || (statusFilter.toLowerCase() === "claim" && ["claim", "claimed"].includes(normalizedStatus));
    return matchSearch && matchType && matchCat && matchStatus;
  });
 
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Browse Items</h1>
      <p className="text-gray-500 text-sm mb-6">Search through all reported lost and found items</p>
 
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search items by name, description, or location..."
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 mb-4" />
 
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: "Type", value: typeFilter, options: ["All Items","Lost","Found"], set: setTypeFilter },
          { label: "Category", value: catFilter, options: categories, set: setCatFilter },
          { label: "Status", value: statusFilter, options: ["All Status","found","lost", "claim"], set: setStatusFilter },
        ].map(f => (
          <div key={f.label} className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium">{f.label}</span>
            <select value={f.value} onChange={e => f.set(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
              {f.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
 
      {filtered.length === 0
        ? <div className="text-center py-20 text-gray-400">No items match your search.</div>
        : <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map(item => <ItemCard key={item.id} item={item} onClick={() => navigate(`/detail/${item.id}`, { state: { fromBrowse: true } })} />)}
          </div>
      }
    </div>
  );
}
export default Browse;