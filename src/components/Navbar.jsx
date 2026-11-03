import { useEffect, useState } from 'react'
import { Heart, Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'

const links = [
  { to: '/properties', label: 'Properties', dropdown: true },
  { to: '/about', label: 'Our story' },
  { to: '/agents', label: 'People' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { wishlist } = useWishlist()

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" to="/" aria-label="Aurel Estates home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">A</span>
          <span className="brand-copy">aurel<span>estates</span></span>
        </Link>

        <nav id="primary-navigation" className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {links.map(({ to, label, dropdown }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'nav-active' : ''}`}>
              {label}{dropdown && <ChevronDown size={13} strokeWidth={1.7} />}
            </NavLink>
          ))}
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link nav-mobile-contact ${isActive ? 'nav-active' : ''}`}>Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <Link className="wishlist-link" to="/wishlist" aria-label={`Saved homes, ${wishlist.length} properties`} onClick={() => setMenuOpen(false)}>
            <Heart size={17} strokeWidth={1.7} />
            <span>Saved</span>
            {wishlist.length > 0 && <span className="wishlist-count">{wishlist.length}</span>}
          </Link>
          <Link className="nav-contact" to="/contact">Let’s talk <ArrowUpRight size={14} /></Link>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="primary-navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
