import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './routes/Approutes'

function App() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('lostandfound-authed') === 'true'
  })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.localStorage.setItem('lostandfound-authed', String(authed))
  }, [authed])

  useEffect(() => {
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
  }, [])

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      <Navbar authed={authed} setAuthed={setAuthed} />
      <main>
        <AppRoutes items={items} addItem={setItems} authed={authed} setAuthed={setAuthed} />
      </main>
      <Footer />
    </div>
  )
}

export default App