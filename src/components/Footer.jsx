import { ArrowUpRight, Camera, BriefcaseBusiness, AtSign, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta">
        <div>
          <span className="eyebrow eyebrow-light">A more considered move</span>
          <h2>Let’s find your<br /><em>somewhere.</em></h2>
        </div>
        <Link to="/contact" className="button button-gold">Start a conversation <ArrowUpRight size={16} /></Link>
      </div>
      <div className="footer-main">
        <div className="footer-brand-col">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark">A</span>
            <span className="brand-copy">aurel<span>estates</span></span>
          </Link>
          <p>Thoughtful guidance.<br />Exceptional places.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/" aria-label="Instagram"><Camera size={16} /></a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn"><BriefcaseBusiness size={16} /></a>
            <a href="https://www.facebook.com/" aria-label="Facebook"><AtSign size={16} /></a>
          </div>
        </div>
        <div className="footer-column"><span className="footer-label">Explore</span><Link to="/properties">All properties</Link><Link to="/properties?status=For%20Sale">For sale</Link><Link to="/properties?status=For%20Rent">For rent</Link><Link to="/agents">Our people</Link></div>
        <div className="footer-column"><span className="footer-label">Aurel</span><Link to="/about">Our story</Link><Link to="/contact">Get in touch</Link><Link to="/wishlist">Saved homes</Link><Link to="/agents">Meet the team</Link></div>
        <div className="footer-column footer-contact"><span className="footer-label">Find us</span><p>First Floor, The Crescent<br />Lado Sarai, New Delhi 110030</p><a href="tel:+911141234567">+91 11 4123 4567</a><a href="mailto:hello@aurelestates.in">hello@aurelestates.in</a><Link to="/contact" className="footer-directions">Get directions <ArrowRight size={14} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Aurel Estates. All rights reserved.</span><span>Made for finding your place in the world.</span><Link to="/contact">Contact Aurel</Link></div>
    </footer>
  )
}
