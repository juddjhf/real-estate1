import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Check, Heart, MapPin, Maximize2, Phone, ShowerHead, X } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'

const formatPrice = (property) =>
  property.transaction === 'rent'
    ? `₹${property.price.toLocaleString('en-IN')} / month`
    : `₹${(property.price / 10000000).toFixed(property.price >= 100000000 ? 1 : 2).replace(/\.?0+$/, '')} Cr`
const fallbackImage = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'

export default function PropertyDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [sent, setSent] = useState(false)

  if (!property) return <Navigate to="/not-found" replace />
  const similarProperties = properties.filter(
    (item) => item.id !== property.id && (item.city === property.city || item.type === property.type),
  ).slice(0, 3)

  function submitEnquiry(event) {
    event.preventDefault()
    setSent(true)
  }

  const gallery = property.gallery || [property.image]

  return (
    <>
      <section className="detail-page">
        <div className="page-container">
          <Link className="back-link" to="/properties"><ArrowLeft size={15} /> Back to collection</Link>
          <div className="detail-heading">
            <div>
              <p className="eyebrow">{property.type} <span className="detail-dot">·</span> {property.badge}</p>
              <h1>{property.name}</h1>
              <p className="detail-location"><MapPin size={16} /> {property.location}</p>
            </div>
            <div className="detail-price-block">
              <span className="eyebrow">{property.transaction === 'rent' ? 'Monthly rent' : 'Asking price'}</span>
              <p>{formatPrice(property)}</p>
              <button
                type="button"
                className={`save-property ${favorites.includes(property.id) ? 'save-property--active' : ''}`}
                onClick={() => onToggleFavorite(property.id)}
              >
                <Heart size={16} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
                {favorites.includes(property.id) ? 'Saved' : 'Save home'}
              </button>
            </div>
          </div>
          <div className="gallery-layout">
            <div className="gallery-feature">
              <img
                src={gallery[activeImage]}
                alt={`${property.name} view ${activeImage + 1}`}
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = fallbackImage
                }}
              />
              <span className="gallery-count">{String(activeImage + 1).padStart(2, '0')} <span>/</span> {String(gallery.length).padStart(2, '0')}</span>
            </div>
            <div className="gallery-thumbnails">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  className={index === activeImage ? 'gallery-thumb gallery-thumb--active' : 'gallery-thumb'}
                  key={image}
                  aria-label={`View property image ${index + 1}`}
                  aria-pressed={index === activeImage}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt=""
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = fallbackImage
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-columns">
            <div className="detail-main">
              <div className="detail-stats">
                <div><BedDouble size={19} /><strong>{property.beds}</strong><span>Bedrooms</span></div>
                <div><ShowerHead size={19} /><strong>{property.baths}</strong><span>Bathrooms</span></div>
                <div><Maximize2 size={18} /><strong>{property.area.toLocaleString('en-IN')}</strong><span>Sq. ft.</span></div>
              </div>
              <section className="detail-section">
                <p className="eyebrow">The residence</p>
                <h2>Considered in every detail.</h2>
                <p className="body-copy">{property.description}</p>
              </section>
              <section className="detail-section">
                <p className="eyebrow">The details</p>
                <h2>Designed for living well.</h2>
                <div className="amenity-grid">
                  {property.amenities.map((amenity) => <span key={amenity}><Check size={15} /> {amenity}</span>)}
                </div>
              </section>
              <section className="detail-section">
                <p className="eyebrow">A few things to love</p>
                <div className="highlight-list">
                  {property.highlights.map((highlight, index) => <div key={highlight}><span>0{index + 1}</span><p>{highlight}</p></div>)}
                </div>
              </section>
            </div>
            <aside className="detail-sidebar">
              <div className="agent-card">
                <div className="agent-card-top">
                  <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=180&q=80" alt="Aurel property consultant" />
                  <div>                  <span className="eyebrow">Illustrative advisor profile</span><h3>Arjun Khanna</h3><span>Senior property consultant</span></div>
                </div>
                <p>A considered conversation is a good place to begin. Ask us anything about this home.</p>
                <button className="button button--dark button--full" type="button" onClick={() => { setEnquiryOpen(true); setSent(false) }}>
                  Enquire about this home <ArrowUpRight size={16} />
                </button>
                <a className="agent-phone" href="tel:+911140012345"><Phone size={15} /> +91 11 4001 2345</a>
              </div>
              <div className="advisor-note"><span>“</span><p>We’re here to help you see the possibility in every place.</p><span>— Aurel Estates</span></div>
            </aside>
          </div>
          {similarProperties.length > 0 && (
            <section className="similar-section">
              <div className="section-heading section-heading--split">
                <div><p className="eyebrow">You may also like</p><h2>More places to <em>consider.</em></h2></div>
                <Link className="text-link" to="/properties">View all homes <ArrowRight size={16} /></Link>
              </div>
              <div className="property-grid">
                {similarProperties.map((item) => (
                  <PropertyCard
                    key={item.id}
                    property={item}
                    favorite={favorites.includes(item.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
      {enquiryOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setEnquiryOpen(false)
        }}>
          <div className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
            <button type="button" className="modal-close" aria-label="Close enquiry form" onClick={() => setEnquiryOpen(false)}><X size={20} /></button>
            {sent ? (
              <div className="form-success">
                <span><Check size={24} /></span>
                <p className="eyebrow">Thank you</p>
                <h2>We’ll be in touch.</h2>
                <p>Your enquiry is a demo only. An Aurel advisor would follow up to help you explore this home.</p>
                <button className="button button--dark" type="button" onClick={() => setEnquiryOpen(false)}>Continue exploring</button>
              </div>
            ) : (
              <>
                <p className="eyebrow">A thoughtful next step</p>
                <h2 id="enquiry-title">Ask us about<br /><em>{property.name}.</em></h2>
                <p className="modal-intro">Share a few details and our property advisor will help with your questions.</p>
                <form className="form-stack" onSubmit={submitEnquiry}>
                  <label>Your name<input name="name" autoComplete="name" required /></label>
                  <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
                  <label>Phone number<input name="phone" type="tel" autoComplete="tel" minLength={8} maxLength={18} inputMode="tel" required /></label>
                  <label>Message<textarea name="message" rows="3" defaultValue={`I’d love to know more about ${property.name}.`} required /></label>
                  <button className="button button--dark button--full" type="submit">Send an enquiry <ArrowUpRight size={16} /></button>
                </form>
                <p className="demo-note">This form is for demonstration only. No information is sent or stored.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
