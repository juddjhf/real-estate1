import { ArrowUpRight, BedDouble, Heart, Maximize2, ShowerHead } from 'lucide-react'
import { Link } from 'react-router-dom'

const formatPrice = (price, transaction) =>
  transaction === 'rent'
    ? `₹${price.toLocaleString('en-IN')} / month`
    : `₹${(price / 10000000).toFixed(price >= 100000000 ? 1 : 2).replace(/\.?0+$/, '')} Cr`

export default function PropertyCard({ property, favorite, onToggleFavorite, compact = false }) {
  return (
    <article className={`property-card ${compact ? 'property-card--compact' : ''}`}>
      <div className="property-image-wrap">
        <Link to={`/properties/${property.id}`} className="property-image-link" aria-label={`View ${property.name}`}>
          <img
            className="property-image"
            src={property.image}
            alt={property.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'
            }}
          />
        </Link>
        <span className={`property-badge ${property.badge === 'Featured' ? 'property-badge--featured' : ''}`}>
          {property.badge}
        </span>
        <button
          type="button"
          className={`favorite-button ${favorite ? 'favorite-button--active' : ''}`}
          aria-label={favorite ? `Remove ${property.name} from saved properties` : `Save ${property.name}`}
          aria-pressed={favorite}
          onClick={() => onToggleFavorite(property.id)}
        >
          <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="property-card-content">
        <div className="property-card-heading">
          <div>
            <span className="eyebrow property-location">{property.location}</span>
            <h3><Link to={`/properties/${property.id}`}>{property.name}</Link></h3>
          </div>
          <span className="property-type">{property.type}</span>
        </div>
        <p className="property-price">{formatPrice(property.price, property.transaction)}</p>
        <div className="property-meta">
          <span><BedDouble size={15} /> {property.beds} beds</span>
          <span><ShowerHead size={15} /> {property.baths} baths</span>
          <span><Maximize2 size={14} /> {property.area.toLocaleString('en-IN')} sq. ft.</span>
        </div>
        <Link className="property-details-link" to={`/properties/${property.id}`}>
          View property <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
