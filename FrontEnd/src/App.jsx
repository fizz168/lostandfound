import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './routes/Approutes'

function App() {
  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') return ''
    return window.localStorage.getItem('lostandfound-token') ?? ''
  })
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    try {
      return JSON.parse(window.localStorage.getItem('lostandfound-user'))
    } catch {
      return null
    }
  })
  const [authed, setAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return Boolean(window.localStorage.getItem('lostandfound-token'))
  })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.localStorage.setItem('lostandfound-authed', String(authed))
    if (token) {
      window.localStorage.setItem('lostandfound-token', token)
    } else {
      window.localStorage.removeItem('lostandfound-token')
    }
    if (user) {
      window.localStorage.setItem('lostandfound-user', JSON.stringify(user))
    } else {
      window.localStorage.removeItem('lostandfound-user')
    }
  }, [authed, token, user])

  useEffect(() => {
    if (!token || user) return

    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Unauthorized')
        const profile = await res.json()
        setUser(profile)
        setAuthed(true)
      } catch (err) {
        console.error('Failed to refresh user session', err)
        setToken('')
        setUser(null)
        setAuthed(false)
      }
    }

    fetchUser()
  }, [token, user])

  const fetchItems = () => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        console.error('Failed to load items', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      <Navbar authed={authed} user={user} setAuthed={setAuthed} setUser={setUser} setToken={setToken} />
      <main>
        <AppRoutes
          items={items}
          addItem={fetchItems}
          authed={authed}
          user={user}
          setAuthed={setAuthed}
          setUser={setUser}
          setToken={setToken}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App