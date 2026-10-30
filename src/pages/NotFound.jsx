import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-number">404</div>
      <p className="eyebrow">A little off the map</p>
      <h1>This address<br /><em>doesn’t exist.</em></h1>
      <p>Let’s find our way back to somewhere that feels right.</p>
      <div className="not-found-actions">
        <Link className="button button--dark" to="/"><ArrowLeft size={16} /> Back home</Link>
        <Link className="text-link" to="/properties">Explore properties <ArrowUpRight size={16} /></Link>
      </div>
    </section>
  )
}
