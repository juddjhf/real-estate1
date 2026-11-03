import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import About from './pages/About.jsx'
import Agents from './pages/Agents.jsx'
import Contact from './pages/Contact.jsx'
import Wishlist from './pages/Wishlist.jsx'
import NotFound from './pages/NotFound.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

function PageFrame() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return <WishlistProvider><BrowserRouter><PageFrame /></BrowserRouter></WishlistProvider>
}
