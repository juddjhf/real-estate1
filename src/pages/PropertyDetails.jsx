import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Bath, BedDouble, Check, ChevronLeft, ChevronRight, Heart, MapPin, MoveUpRight, Share2, ShieldCheck, X } from 'lucide-react'
import { properties } from '../data/properties.js'
import { useWishlist } from '../context/WishlistContext.jsx'
import PropertyCard from '../components/PropertyCard.jsx'

export default function PropertyDetails() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const { isSaved, toggleWishlist } = useWishlist()

  if (!property) return <section className="not-found page-container"><span className="eyebrow">Aurel Estates</span><h1>This home has moved on.</h1><p>It may have found its person, but there are other places to discover.</p><Link className="button button-dark" to="/properties">Explore the collection <ArrowRight size={16} /></Link></section>

  const similar = properties.filter((item) => item.id !== property.id && (item.city === property.city || item.type === property.type)).slice(0, 3)
  const changeImage = (direction) => setActiveImage((current) => (current + direction + property.images.length) % property.images.length)
  const submitEnquiry = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset() }
  const shareProperty = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: property.title, url: window.location.href })
        setShareMessage('Property shared')
      } catch (error) {
        if (error.name !== 'AbortError') setShareMessage('Unable to share this property.')
      }
      return
    }
    if (!navigator.clipboard) {
      setShareMessage('Sharing is unavailable in this browser.')
      return
    }
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareMessage('Link copied')
    } catch {
      setShareMessage('Unable to copy the property link.')
    }
  }

  return <>
    <div className="detail-page page-container">
      <Link to="/properties" className="back-link"><ArrowLeft size={15} /> Back to the collection</Link>
      <div className="detail-heading"><div><span className="eyebrow">{property.type} <span className="eyebrow-dot">·</span> {property.status}</span><h1>{property.title}</h1><p><MapPin size={16} />{property.location}</p></div><div className="detail-price">{property.priceLabel}<span>{property.status === 'For Rent' ? 'Per month' : 'Guide price'}</span></div></div>
      <div className="gallery-grid">
        <button className="gallery-main" onClick={() => setGalleryOpen(true)}><img src={property.images[0]} alt={`${property.title} exterior`} /><span className="gallery-view">View gallery <ArrowUpRight size={15} /></span></button>
        {property.images.slice(1, 3).map((image, index) => <button className={`gallery-side gallery-side-${index + 1}`} key={image} onClick={() => { setActiveImage(index + 1); setGalleryOpen(true) }}><img src={image} alt={`${property.title} interior ${index + 1}`} />{index === 1 && <span className="gallery-more">+{Math.max(property.images.length - 3, 0)} photos</span>}</button>)}
        <button className={`save-property detail-save ${isSaved(property.id) ? 'is-saved' : ''}`} onClick={() => toggleWishlist(property.id)} aria-label={isSaved(property.id) ? 'Remove from saved homes' : 'Save property'}><Heart size={18} fill={isSaved(property.id) ? 'currentColor' : 'none'} /></button>
        <button className="share-property" onClick={shareProperty} aria-label="Share property"><Share2 size={17} /></button>
        {shareMessage && <span className="share-feedback" role="status">{shareMessage}</span>}
      </div>
      <div className="detail-body">
        <div className="detail-main">
          <div className="detail-specs"><span><BedDouble size={18} />{property.beds || '—'} bedrooms</span><span><Bath size={18} />{property.baths} bathrooms</span><span><MoveUpRight size={17} />{property.area.toLocaleString('en-IN')} sq ft</span><span><ShieldCheck size={18} />Verified</span></div>
          <section className="detail-block"><span className="eyebrow">A little about this home</span><h2>Considered living,<br /><em>beautifully realised.</em></h2><p>{property.description}</p><p>Every detail has been thoughtfully considered, from the way natural light moves through the rooms to the connection with the neighbourhood beyond. A home that feels just right from the moment you arrive.</p></section>
          <section className="detail-block amenities-block"><span className="eyebrow">The details</span><h2>Made for living.</h2><div className="amenities-grid">{property.amenities.map((amenity) => <span key={amenity}><Check size={15} />{amenity}</span>)}</div></section>
          <section className="detail-block overview-block"><span className="eyebrow">Property overview</span><h2>The essentials.</h2><div className="overview-list">{[['Property type', property.type], ['Property status', property.status], ['Bedrooms', property.beds || 'N/A'], ['Bathrooms', property.baths], ['Built-up area', `${property.area.toLocaleString('en-IN')} sq ft`], ['Year completed', property.year], ['Reference', `AUR-${property.id.slice(0, 4).toUpperCase()}`]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>
          <section className="detail-block floor-plan"><span className="eyebrow">A sense of space</span><h2>Room to imagine.</h2><div className="floor-plan-art" aria-label="Illustrative floor plan"><div className="floor-room room-living">Living room</div><div className="floor-room room-dining">Dining</div><div className="floor-room room-kitchen">Kitchen</div><div className="floor-room room-bed-one">Bedroom 01</div><div className="floor-room room-bed-two">Bedroom 02</div><div className="floor-room room-bath">Bath</div></div><span className="floor-caption">Illustrative floor plan · Dimensions on request</span></section>
          <section className="detail-block location-block"><span className="eyebrow">The neighbourhood</span><h2>Right where you want to be.</h2><div className="map-placeholder"><div className="map-lines" /><span className="map-pin"><MapPin size={20} /></span><span className="map-label">{property.location}</span><span className="map-note">Map preview · Location shared on enquiry</span></div></section>
        </div>
        <aside className="detail-aside">
          <div className="agent-contact-card"><span className="eyebrow">Your Aurel advisor</span><div className="detail-agent"><img src={property.agent === 'Aarav Mehta' ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85' : property.agent === 'Maya Kapoor' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=85' : 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=85'} alt={property.agent} /><div><strong>{property.agent}</strong><span>{property.agentRole}</span></div></div><a href="tel:+911141234567" className="agent-phone">+91 11 4123 4567</a><form className="agent-enquiry" onSubmit={submitEnquiry}><label>Your name<input name="name" required placeholder="How should we address you?" /></label><label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label><label>A note for us<textarea name="message" rows="3" placeholder="I’d love to know more about this home…" /></label><button className="button button-dark" type="submit">{sent ? 'Enquiry received' : 'Request a private viewing'} <ArrowRight size={15} /></button><span className="form-note">{sent ? 'Thank you. Your advisor will be in touch shortly.' : 'A member of our team will be in touch personally.'}</span></form></div>
          <div className="visit-card"><span className="eyebrow">See it for yourself</span><h3>Some homes just feel right in person.</h3><Link to="/contact" className="text-link">Arrange a visit <ArrowUpRight size={15} /></Link></div>
        </aside>
      </div>
    </div>
    {similar.length > 0 && <section className="section-pad page-container similar-section"><div className="section-heading"><div><span className="eyebrow">Keep exploring</span><h2>Places with a similar feeling.</h2></div><Link to="/properties" className="text-link">See the full collection <ArrowUpRight size={15} /></Link></div><div className="property-grid">{similar.map((item, index) => <PropertyCard key={item.id} property={item} index={index} />)}</div></section>}
    {galleryOpen && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Property photo gallery" onClick={() => setGalleryOpen(false)}><button className="lightbox-close" onClick={() => setGalleryOpen(false)} aria-label="Close gallery"><X size={23} /></button><button className="lightbox-prev" onClick={(event) => { event.stopPropagation(); changeImage(-1) }} aria-label="Previous image"><ChevronLeft size={25} /></button><img src={property.images[activeImage]} alt={`${property.title} photo ${activeImage + 1}`} onClick={(event) => event.stopPropagation()} /><button className="lightbox-next" onClick={(event) => { event.stopPropagation(); changeImage(1) }} aria-label="Next image"><ChevronRight size={25} /></button><span className="lightbox-counter">{String(activeImage + 1).padStart(2, '0')} / {String(property.images.length).padStart(2, '0')}</span></div>}
  </>
}
