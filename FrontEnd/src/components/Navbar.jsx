
import { useLocation, useNavigate } from 'react-router-dom'

function Navbar({ authed, setAuthed }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLoginPage = pathname === '/login'
  const activePath = pathname === '/' ? 'home' : pathname.split('/')[1]

  if (isLoginPage) {
    return (
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center h-14">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 font-bold text-lg text-indigo-600">
            <span className="bg-indigo-600 text-white rounded-lg w-7 h-7 flex items-center justify-center text-sm font-black">L</span>
            Lost&amp;Found
          </button>
        </div>
      </nav>
    )
  }
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">

        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center gap-2 font-bold text-lg text-indigo-600">
          <span className="bg-indigo-600 text-white rounded-lg w-7 h-7 flex items-center justify-center text-sm font-black">L</span>
          Lost&amp;Found
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
          {[
            { path: "/", key: "home", label: "Home" },
            { path: "/browse", key: "browse", label: "Browse Items" },
            { path: "/admin", key: "admin", label: "Admin" },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => navigate(p.path)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                activePath === p.key ? "bg-indigo-50 text-indigo-600 font-medium" : "hover:bg-gray-50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {authed ? (
            <button
              onClick={() => {
                setAuthed(false)
                navigate("/")
              }}
              className="text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
               className="hidden md:block text-sm border border-blue-200 text-blue-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Login 
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;