import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import ListProperty from './pages/ListProperty.jsx'
import NotFound from './pages/NotFound.jsx'

function AppLayout() {
  const [favorites, setFavorites] = useState([])
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  function toggleFavorite(propertyId) {
    setFavorites((current) =>
      current.includes(propertyId)
        ? current.filter((id) => id !== propertyId)
        : [...current, propertyId],
    )
  }

  return (
    <>
      <Navbar key={`${location.pathname}${location.search}`} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/properties"
            element={<Properties key={location.search} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/properties/:id"
            element={<PropertyDetails favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
