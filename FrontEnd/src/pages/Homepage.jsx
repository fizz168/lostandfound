import { useNavigate } from 'react-router-dom'
import ItemCard from '../components/Itemcard'


function HomePage({ items }) {
  const navigate = useNavigate()
  const lost  = items.filter(i => i.type === "lost").slice(0, 3);
  const found = items.filter(i => i.type === "found").slice(0, 3);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-500 text-white px-8 py-12 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome to Lost&amp;Found</h1>
        <p className="text-indigo-100 mb-6 max-w-xl mx-auto">Your university's smart lost and found management system. Report lost items, browse found items, and help reunite belongings with their owners.</p>
        <button
          onClick={() => navigate("/report-lost")}
          style={{ backgroundColor: "#ef4444" }}
          className="hover:bg-red-600 transition-colors text-white font-semibold px-5 py-2.5 rounded-xl text-sm mr-5"
        >
          Report Lost Item
        </button>

        <button
          onClick={() => navigate("/report-found")}
          style={{backgroundColor: "blue"}}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer border border-white border-opacity-10"
        >
          Report Found Item
        </button>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Lost Items</h2>
          <button onClick={() => navigate("/browse")} className="text-sm text-indigo-600 hover:underline">View all →</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {lost.map(item => <ItemCard key={item.id} item={item} onClick={() => navigate(`/detail/${item.id}`)} />)}
        </div>
      </div>
 
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Found Items</h2>
          <button onClick={() => navigate("/browse")} className="text-sm text-indigo-600 hover:underline">View all →</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {found.map(item => <ItemCard key={item.id} item={item} onClick={() => navigate(`/detail/${item.id}`)} />)}
        </div>
      </div>
    </div>
  );
}
export default HomePage;