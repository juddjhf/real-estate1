import { ArrowRight, BriefcaseBusiness, Camera, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(event) {
    event.preventDefault()
    event.currentTarget.reset()
    setSubscribed(true)
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-column">
          <Link className="brand brand--footer" to="/">
            <span className="brand-mark">A</span>
            <span className="brand-wordmark">AUREL <b>ESTATES</b></span>
          </Link>
          <p>Discover spaces. Experience luxury.<br />A more considered way to find home.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/" aria-label="Instagram"><Camera size={17} /></a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn"><BriefcaseBusiness size={17} /></a>
          </div>
        </div>
        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/properties">All properties</Link>
          <Link to="/properties?transaction=buy">Homes to buy</Link>
          <Link to="/properties?transaction=rent">Homes to rent</Link>
          <Link to="/about">Our story</Link>
        </div>
        <div className="footer-links">
          <h3>Get in touch</h3>
          <a href="tel:+911140012345"><Phone size={15} /> +91 11 4001 2345</a>
          <a href="mailto:hello@aurelestates.in">hello@aurelestates.in</a>
          <span><MapPin size={15} /> Defence Colony, New Delhi</span>
          <Link to="/list-property">List your property</Link>
        </div>
        <div className="footer-newsletter">
          <h3>A little inspiration, occasionally.</h3>
          <p>Thoughtful homes and notes on living well, delivered to your inbox.</p>
          <form onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button>
          </form>
          {subscribed && <p className="newsletter-success" role="status">Thanks — this demo doesn’t send subscriptions.</p>}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {currentYear} Aurel Estates. All rights reserved.</span>
        <span>Illustrative property information for demonstration purposes.</span>
        <Link to="/contact">Privacy & contact</Link>
      </div>
    </footer>
  )
}
