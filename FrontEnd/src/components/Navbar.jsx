import { useLocation, useNavigate } from 'react-router-dom'

function Navbar({ authed, setAuthed }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLoginPage = pathname === '/login'
  const activePath = pathname === '/' ? 'home' : pathname.split('/')[1]

  const navItems = [
    { path: '/', key: 'home', label: 'Home' },
    { path: '/browse', key: 'browse', label: 'Browse Items' },
    { path: '/admin', key: 'admin', label: 'Admin' },
  ]

  const brandIcon = (
    <span className="relative flex h-10 w-10 items-center justify-center border-2 border-black bg-[var(--color-background)] shadow-[3px_3px_0px_0px_#121212]">
      <span className="absolute h-4 w-4 rounded-full border border-black bg-[var(--color-blue)]" />
      <span className="absolute h-3 w-3 rotate-45 border border-black bg-[var(--color-yellow)]" />
      <span className="absolute -bottom-1.5 -right-1.5 h-0 w-0 border-b-[10px] border-b-[var(--color-red)] border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent" />
    </span>
  )

  const navButtonClass = (key) =>
    `px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
      activePath === key
        ? 'border-2 border-black bg-[var(--color-red)] text-white shadow-[4px_4px_0px_0px_#121212]'
        : 'border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#121212]'
    }`

  if (isLoginPage) {
    return (
      <nav className="sticky top-0 z-50 border-b-4 border-black bg-[#F0F0F0]">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-lg font-black uppercase tracking-[0.2em] text-black">
           <div className="mx-auto mb-1 flex h-14 w-14 items-center justify-center border-4 border-black bg-[#F0C020] shadow-[4px_4px_0px_0px_#121212]">
              <span className="text-2xl font-black text-black">L</span>
            </div>
            <span>Lost&amp;Found</span>
          </button>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-black bg-[#F0F0F0]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-lg font-black uppercase tracking-[0.2em] text-black">
          {brandIcon}
          <span>Lost&amp;Found</span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((p) => (
            <button
              key={p.key}
              onClick={() => navigate(p.path)}
              className={navButtonClass(p.key)}
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
                navigate('/')
              }}
              className="border-2 border-black bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden border-2 border-black bg-[var(--color-blue)] px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[4px_4px_0px_0px_#121212] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:block"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;