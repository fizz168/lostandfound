const StatusBadge = ({ item }) => {
  if (item.type === "lost")
    return <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Lost</span>;
  if (item.status === "returned" || item.status === "claimed")
    return <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-0.5 rounded-full capitalize">{item.status}</span>;
  return <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Found</span>;
};

export default StatusBadge;