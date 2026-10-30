import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Compass,
  HeartHandshake,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard.jsx'
import PropertySearch from '../components/PropertySearch.jsx'
import { properties, propertyTypes } from '../data/properties.js'
import { testimonials } from '../data/testimonials.js'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const benefits = [
  { icon: ShieldCheck, title: 'Verified, always', text: 'Every home is thoughtfully vetted, so you can move forward with confidence.' },
  { icon: Compass, title: 'Guidance with perspective', text: 'Local expertise and considered advice, from first viewing to final key.' },
  { icon: HeartHandshake, title: 'A search that feels personal', text: 'We listen closely, then find the places that feel like they were meant for you.' },
  { icon: BadgeCheck, title: 'Clarity at every step', text: 'Transparent communication and no surprises. Just a better way to move.' },
]

export default function Home({ favorites, onToggleFavorite }) {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
          alt="Sculptural contemporary home framed by a lush garden"
        />
        <div className="hero-shade" />
        <div className="hero-content page-container">
          <motion.div initial="hidden" animate="visible" variants={reveal}>
            <p className="eyebrow eyebrow--light"><span /> Exceptional real estate</p>
            <h1>Find a place<br />that feels like <em>home.</em></h1>
            <p className="hero-description">
              Explore exceptional properties, discover inspiring spaces, and find your next address with confidence.
            </p>
            <div className="hero-actions">
              <Link className="button button--gold" to="/properties">Explore properties <ArrowUpRight size={17} /></Link>
              <Link className="text-link text-link--light" to="/about">Discover our story <ArrowRight size={16} /></Link>
            </div>
          </motion.div>
        </div>
        <a className="hero-scroll" href="#featured">
          <span>Scroll to discover</span><ArrowDown size={15} />
        </a>
        <div className="hero-caption">A quieter kind of extraordinary <span>— New Delhi</span></div>
        <div className="hero-search-wrap page-container">
          <PropertySearch inHero />
        </div>
      </section>

      <section className="section section--featured" id="featured">
        <div className="page-container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">A considered collection</p>
              <h2>Exceptional properties.<br /><em>Extraordinary living.</em></h2>
            </div>
            <div className="section-heading-side">
              <p>Distinctive homes, chosen for their character, considered details and sense of place.</p>
              <Link className="text-link" to="/properties">View all properties <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="property-grid">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                favorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
          <div className="center-link">
            <Link className="button button--outline" to="/properties">Discover the collection <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section section--categories">
        <div className="page-container">
          <div className="section-heading">
            <p className="eyebrow">Find your kind of home</p>
            <h2>Space for the way<br /><em>you want to live.</em></h2>
          </div>
          <div className="category-grid">
            {propertyTypes.map((category, index) => (
              <motion.div
                key={category.name}
                className={`category-tile category-tile--${index + 1}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
              >
                <img src={category.image} alt="" loading="lazy" />
                <div className="category-overlay" />
                <Link to={`/properties?type=${encodeURIComponent(category.type)}`} className="category-content">
                  <span>{category.count}</span>
                  <h3>{category.name}</h3>
                  <MoveUpRight size={19} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--about-preview">
        <div className="page-container about-preview">
          <div className="about-image-composition">
            <img
              className="about-main-image"
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85"
              alt="Warm modern home opening onto a private garden"
              loading="lazy"
            />
            <div className="experience-card">
              <span className="experience-number">12<span>+</span></span>
              <span>years of finding<br />the right address</span>
            </div>
            <div className="image-index">01 <span>/</span> 04</div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">A different point of view</p>
            <h2>More than properties.<br /><em>We create possibilities.</em></h2>
            <p className="body-copy">
              A home is more than an address. It’s the light in the morning, the familiar walk, the space to grow into. At Aurel, we look beyond the listing to help you find a place that feels unmistakably yours.
            </p>
            <p className="body-copy body-copy--muted">
              From a first conversation to the moment you turn the key, our approach is thoughtful, personal and rooted in a deep understanding of the places we call home.
            </p>
            <Link className="button button--dark" to="/about">Get to know us <ArrowUpRight size={16} /></Link>
            <div className="about-signature">A more thoughtful way home<span>— Aurel Estates</span></div>
          </div>
        </div>
      </section>

      <section className="section section--benefits">
        <div className="page-container">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">The Aurel difference</p>
            <h2>Good guidance changes <em>everything.</em></h2>
            <p className="heading-description">A thoughtful property journey is built on trust, insight and an understanding of what home means to you.</p>
          </div>
          <div className="benefit-grid">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <motion.article
                className="benefit-item"
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: index * 0.08 } } }}
              >
                <span className="benefit-icon"><Icon size={22} strokeWidth={1.4} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="lifestyle-section">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=90"
          alt="Serene modern residence with a view into the garden"
          loading="lazy"
        />
        <div className="lifestyle-overlay" />
        <div className="lifestyle-copy page-container">
          <p className="eyebrow eyebrow--light">A life, well considered</p>
          <h2>Live beyond<br /><em>ordinary.</em></h2>
          <p>Some places simply change the way a day feels. Discover homes with a little more room for life.</p>
          <Link className="button button--gold" to="/properties">Explore the collection <ArrowUpRight size={17} /></Link>
        </div>
        <span className="lifestyle-note">Designed around the moments that matter</span>
      </section>

      <section className="section section--testimonials">
        <div className="page-container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Illustrative client notes</p>
              <h2>It’s not just finding a home.<br /><em>It’s how you feel getting there.</em></h2>
            </div>
            <Sparkles className="testimonial-sparkle" size={30} strokeWidth={1.2} />
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{testimonial.quote}”</blockquote>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt="" loading="lazy" />
                  <div><strong>{testimonial.name}</strong><span>{testimonial.location}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="page-container final-cta-inner">
          <div>
            <p className="eyebrow eyebrow--light">Your next chapter</p>
            <h2>Your next chapter begins<br />with the <em>right address.</em></h2>
          </div>
          <div className="final-cta-actions">
            <Link className="button button--gold" to="/properties">Explore properties <ArrowUpRight size={16} /></Link>
            <Link className="text-link text-link--light" to="/contact">Talk to our team <ArrowRight size={16} /></Link>
          </div>
        </div>
        <span className="cta-watermark">A</span>
      </section>
    </>
  )
}
