const StatusBadge = ({ item }) => {
  const normalizedStatus = (item?.status || item?.type || 'found').toLowerCase();

  if (normalizedStatus === 'claimed' || normalizedStatus === 'claim') {
    return <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Claim</span>;
  }

  if (normalizedStatus === 'returned') {
    return <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Returned</span>;
  }

  if (item?.type === 'lost' || normalizedStatus === 'lost') {
    return <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Lost</span>;
  }

  return <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Found</span>;
};

export default StatusBadge;