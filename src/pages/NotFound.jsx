import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="not-found page-container"><span className="error-number">404</span><span className="eyebrow">A little off the map</span><h1>Well, this is<br /><em>somewhere else.</em></h1><p>The page you’re looking for may have moved. Let’s find your way back.</p><div className="error-actions"><Link to="/" className="button button-dark"><ArrowLeft size={16} /> Back home</Link><Link to="/properties" className="text-link">Explore homes <ArrowUpRight size={16} /></Link></div></section>
}
