import { ArrowRight, Heart, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function Wishlist() {
  const { wishlist } = useWishlist()
  const savedProperties = wishlist.map((id) => properties.find((property) => property.id === id)).filter(Boolean)
  return <section className="wishlist-page page-container"><div className="wishlist-heading"><span className="eyebrow">Kept close</span><h1>Your <em>saved places.</em></h1><p>A little collection of homes that caught your eye. Come back anytime.</p></div>{savedProperties.length ? <><div className="wishlist-countline"><span>{savedProperties.length} {savedProperties.length === 1 ? 'home' : 'homes'} saved</span><Link to="/properties" className="text-link">Find another <Search size={15} /></Link></div><div className="property-grid">{savedProperties.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}</div></> : <div className="wishlist-empty"><span className="empty-heart"><Heart size={29} /></span><span className="eyebrow">A little space for possibility</span><h2>No saved homes. Yet.</h2><p>When a place speaks to you, tap the heart. We’ll keep it safe here until you’re ready.</p><Link to="/properties" className="button button-dark">Explore the collection <ArrowRight size={16} /></Link></div>}</section>
}
