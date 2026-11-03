import { ArrowUpRight, BedDouble, Bath, MoveUpRight, Heart, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function PropertyCard({ property, index = 0 }) {
  const { isSaved, toggleWishlist } = useWishlist()
  const saved = isSaved(property.id)

  return (
    <motion.article className="property-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-35px' }} transition={{ duration: 0.48, delay: (index % 3) * 0.08 }}>
      <div className="property-image-wrap">
        <Link to={`/properties/${property.id}`} className="property-image-link" aria-label={`View ${property.title}`}>
          <img className="property-image" src={property.images[0]} alt={property.title} loading="lazy" />
        </Link>
        <div className="property-badges">
          {property.featured && <span className="badge badge-featured">Curated</span>}
          <span className={`badge ${property.status === 'For Rent' ? 'badge-rent' : 'badge-sale'}`}>{property.status}</span>
        </div>
        <button className={`save-property ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(property.id)} aria-label={saved ? 'Remove from saved homes' : 'Save property'} aria-pressed={saved}>
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="property-card-content">
        <div className="property-card-topline"><span>{property.type}</span>{property.verified && <span className="verified"><BadgeCheck size={14} /> Verified</span>}</div>
        <div className="property-title-row">
          <div><h3><Link to={`/properties/${property.id}`}>{property.title}</Link></h3><p className="property-location">{property.location}</p></div>
          <Link to={`/properties/${property.id}`} className="card-arrow" aria-label={`View ${property.title}`}><ArrowUpRight size={17} /></Link>
        </div>
        <div className="property-card-bottom">
          <div className="property-specs">
            {property.beds > 0 && <span><BedDouble size={15} />{property.beds} bed</span>}
            <span><Bath size={15} />{property.baths} bath</span>
            <span><MoveUpRight size={14} />{property.area.toLocaleString('en-IN')} sq ft</span>
          </div>
          <strong className="property-price">{property.priceLabel}</strong>
        </div>
      </div>
    </motion.article>
  )
}
