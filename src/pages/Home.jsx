import { useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropertyCard from '../components/PropertyCard.jsx'
import PropertySearch from '../components/PropertySearch.jsx'
import CountUp from '../components/CountUp.jsx'
import { properties } from '../data/properties.js'
import { testimonials } from '../data/testimonials.js'
import { agents } from '../data/agents.js'

const heroImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90'
const categoryImage = {
  Villas: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
  Apartments: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85',
  Penthouses: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
  'Independent homes': 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
}

function SectionHeading({ eyebrow, title, copy, link, light = false }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
      {link && <Link to={link.to} className="text-link">{link.label}<ArrowUpRight size={16} /></Link>}
    </div>
  )
}

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const featured = properties.filter((property) => property.featured).slice(0, 3)
  const testimonial = testimonials[testimonialIndex]
  const moveTestimonial = (direction) => setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length)

  return (
    <>
      <section className="hero">
        <img className="hero-image" src={heroImage} alt="Warmly illuminated contemporary villa at dusk" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content page-container">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <span className="hero-kicker"><span className="gold-dot" /> A different kind of property partner</span>
            <h1>Find your place<br />in the <em>world.</em></h1>
            <div className="hero-bottom">
              <p>Considered homes. Personal guidance.<br />A move that feels like you.</p>
              <Link to="/properties" className="hero-explore">Explore our collection <ArrowUpRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
        <div className="hero-caption"><span>01 / 04</span><span>Private residence · New Delhi</span><ArrowDown size={16} /></div>
      </section>

      <section className="search-section page-container" aria-label="Search properties">
        <PropertySearch />
      </section>

      <section className="section-pad page-container">
        <SectionHeading eyebrow="A considered collection" title={<>Spaces worth<br className="desktop-break" /> coming home to.</>} copy="A handpicked selection of exceptional homes across Delhi NCR. Each one chosen for the way it makes you feel." link={{ to: '/properties', label: 'View all properties' }} />
        <div className="property-grid">
          {featured.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}
        </div>
      </section>

      <section className="category-section">
        <div className="page-container">
          <SectionHeading eyebrow="Find your kind of place" title="A home for every chapter." copy="From a sunlit city apartment to room to roam, begin with what feels right." />
          <div className="category-grid">
            {Object.entries(categoryImage).map(([name, image], index) => (
              <Link key={name} to={`/properties?type=${encodeURIComponent(name === 'Independent homes' ? 'Independent House' : name.replace(/s$/, ''))}`} className={`category-card category-card-${index + 1}`}>
                <img src={image} alt="" loading="lazy" />
                <div className="category-shade" /><span className="category-index">0{index + 1}</span><div className="category-label"><div><h3>{name}</h3><span>{properties.filter((property) => property.type.toLowerCase().includes(name.split(' ')[0].toLowerCase())).length || 2} considered spaces</span></div><span className="category-arrow"><ArrowUpRight size={17} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-image"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1700&q=90" alt="An elegant modern home surrounded by greenery" loading="lazy" /><span className="image-note">The Glasshouse · New Delhi</span></div>
        <div className="feature-copy">
          <span className="eyebrow eyebrow-light">The Aurel point of view</span>
          <h2>Luxury isn’t a label.<br />It’s <em>how a place feels.</em></h2>
          <p>We look beyond the listing. The morning light, the quiet lane, the feeling when you walk through the door. Because finding a home is about more than an address.</p>
          <Link to="/about" className="button button-outline-light">Get to know us <ArrowUpRight size={16} /></Link>
          <div className="feature-mark">A</div>
        </div>
      </section>

      <section className="section-pad page-container">
        <SectionHeading eyebrow="The Aurel difference" title="Good advice changes everything." copy="A more thoughtful way to buy, sell, and find your place in the world." />
        <div className="value-grid">
          <article className="value-card"><span className="value-icon"><HeartHandshake size={23} /></span><span className="value-number">01</span><h3>People, always.</h3><p>We start with listening. Your needs lead the search, not the other way around.</p></article>
          <article className="value-card"><span className="value-icon"><BadgeCheck size={23} /></span><span className="value-number">02</span><h3>Quality over quantity.</h3><p>Every home is personally considered, carefully vetted, and worth your time.</p></article>
          <article className="value-card"><span className="value-icon"><ShieldCheck size={23} /></span><span className="value-number">03</span><h3>Advice you can trust.</h3><p>Clear answers and honest perspective, from your first viewing to your final signature.</p></article>
          <article className="value-card"><span className="value-icon"><Sparkles size={23} /></span><span className="value-number">04</span><h3>Considered, end to end.</h3><p>Thoughtful guidance at every turn, so the important decisions feel simpler.</p></article>
        </div>
      </section>

      <section className="stats-section">
        <div className="page-container stats-inner">
          <div className="stats-intro"><span className="eyebrow eyebrow-light">A little perspective</span><h2>Good things take<br /><em>the right people.</em></h2></div>
          <div className="stat"><strong><CountUp value={12} suffix="+" /></strong><span>years finding the right fit</span></div>
          <div className="stat"><strong><CountUp value={450} prefix="₹" suffix=" Cr" /></strong><span>in considered transactions</span></div>
          <div className="stat"><strong><CountUp value={96} suffix="%" /></strong><span>clients come by recommendation</span></div>
        </div>
      </section>

      <section className="locations-section">
        <div className="page-container locations-inner">
          <div className="locations-copy"><span className="eyebrow">Places with a point of view</span><h2>Know the feeling<br />of <em>the neighbourhood.</em></h2><p>Good homes start with the right streets. We know the quieter lanes, the corner cafés, and the places that make a city feel like yours.</p><Link to="/properties" className="text-link">Explore all neighbourhoods <ArrowUpRight size={16} /></Link></div>
          <div className="location-list">
            {[
              ['New Delhi', 'South Delhi, Jor Bagh, Defence Colony', '08'],
              ['Gurugram', 'Golf Course Road, DLF, Sushant Lok', '12'],
              ['Noida', 'Sector 44, Noida Expressway', '06'],
            ].map(([city, areas, count], i) => <Link key={city} className="location-row" to={`/properties?location=${encodeURIComponent(city)}`}><span className="location-count">0{i + 1}</span><span className="location-name">{city}<small>{areas}</small></span><span className="location-total">{count} homes</span><ArrowUpRight size={17} /></Link>)}
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="page-container testimonial-inner">
          <div className="testimonial-aside"><span className="eyebrow eyebrow-light">Kind words</span><div className="testimonial-controls"><button onClick={() => moveTestimonial(-1)} aria-label="Previous testimonial"><ChevronLeft size={18} /></button><button onClick={() => moveTestimonial(1)} aria-label="Next testimonial"><ChevronRight size={18} /></button></div></div>
          <div className="testimonial-content" key={testimonial.name}><span className="quote-mark">“</span><blockquote>{testimonial.quote}</blockquote><div className="quote-author"><span className="quote-line" /><div><strong>{testimonial.name}</strong><span>{testimonial.detail}</span></div><span className="quote-index">0{testimonialIndex + 1} / 0{testimonials.length}</span></div></div>
        </div>
      </section>

      <section className="section-pad page-container agents-preview">
        <SectionHeading eyebrow="The people behind the keys" title="Here when it matters." copy="Good property advice starts with a good conversation. Meet the people who make every move a little easier." link={{ to: '/agents', label: 'Meet our people' }} />
        <div className="agent-preview-grid">
          {agents.slice(0, 2).map((agent) => <article className="agent-preview-card" key={agent.name}><img src={agent.image} alt={agent.name} loading="lazy" /><div><h3>{agent.name}</h3><span>{agent.role}</span><Link to="/agents" aria-label={`View ${agent.name}`}><ArrowUpRight size={16} /></Link></div></article>)}
          <div className="agent-note"><span className="eyebrow">A good place to start</span><h3>Tell us what<br />you’re looking for.</h3><Link to="/contact" className="text-link">Talk to an advisor <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return <section className="newsletter-section"><div className="page-container newsletter-inner"><div><span className="eyebrow eyebrow-light">A note from Aurel</span><h2>A little inspiration,<br /><em>delivered thoughtfully.</em></h2><p>New homes, neighbourhood notes, and the occasional good read. Never noise.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label htmlFor="newsletter-email">Your email address</label><div><input id="newsletter-email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Subscribe"><ArrowRight size={19} /></button></div><span>{submitted ? 'You’re on the list. Look out for a note from us soon.' : 'By subscribing, you agree to receive occasional updates from Aurel.'}</span></form></div></section>
}
