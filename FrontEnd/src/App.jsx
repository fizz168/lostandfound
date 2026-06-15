import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './routes/Approutes'
import DEFAULT_ITEMS from './data/item'

const ITEMS_STORAGE_KEY = 'lostandfound-items'

function getInitialItems() {
  if (typeof window === 'undefined') {
    return DEFAULT_ITEMS
  }

  try {
    const savedItems = window.localStorage.getItem(ITEMS_STORAGE_KEY)
    if (!savedItems) {
      return DEFAULT_ITEMS
    }

    const parsedItems = JSON.parse(savedItems)
    return Array.isArray(parsedItems) ? parsedItems : DEFAULT_ITEMS
  } catch {
    return DEFAULT_ITEMS
  }
}

function App() {
  const [authed, setAuthed] = useState(false)
  const [items, setItems] = useState(getInitialItems)

  useEffect(() => {
    window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (newItem) => {
    setItems(currentItems => [newItem, ...currentItems])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar authed={authed} setAuthed={setAuthed} />
      <main>
        <AppRoutes
          items={items}
          addItem={addItem}
          setAuthed={setAuthed}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App