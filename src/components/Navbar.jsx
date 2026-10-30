import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'Buy', to: '/properties?transaction=buy' },
  { label: 'Rent', to: '/properties?transaction=rent' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'
  const activeTransaction = new URLSearchParams(location.search).get('transaction')

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return (
    <header className={`navbar ${onHome && !scrolled ? 'navbar--over-hero' : 'navbar--solid'}`}>
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="Aurel Estates home">
          <span className="brand-mark">A</span>
          <span className="brand-wordmark">AUREL <b>ESTATES</b></span>
        </Link>
        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`} aria-label="Main navigation">
          {links.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className={({ isActive }) => {
                const transactionLink = label === 'Buy' || label === 'Rent'
                const transactionIsActive =
                  location.pathname === '/properties' && activeTransaction === label.toLowerCase()
                const active = transactionLink ? transactionIsActive : isActive
                return `nav-link ${active ? 'nav-link--active' : ''}`
              }}
            >
              {label}
            </NavLink>
          ))}
          <a className="mobile-nav-cta" href="tel:+911140012345">
            <Phone size={15} /> +91 11 4001 2345
          </a>
          <Link className="mobile-nav-cta" to="/list-property">
            List your property <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="nav-actions">
          <a className="nav-call" href="tel:+911140012345" aria-label="Call Aurel Estates">
            <Phone size={15} />
            <span>+91 11 4001 2345</span>
          </a>
          <Link className="button button--gold nav-list" to="/list-property">
            List your property <ArrowUpRight size={15} />
          </Link>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  )
}
