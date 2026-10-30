import { ArrowUpRight, Eye, Heart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const expertise = [
  { number: '01', title: 'A deep sense of place', text: 'Our neighbourhood knowledge goes beyond a map. We understand the rhythm, character and little details that make each pocket feel like home.' },
  { number: '02', title: 'Advice that puts you first', text: 'We listen before we recommend. Every conversation begins with what matters to you, and every next step reflects it.' },
  { number: '03', title: 'A more thoughtful journey', text: 'From the first shortlist to the final details, we bring care, clarity and calm to a process that should feel exciting.' },
]

export default function About() {
  return (
    <>
      <section className="about-hero">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90" alt="A peaceful, light-filled home" />
        <div className="about-hero-shade" />
        <div className="page-container about-hero-copy">
          <p className="eyebrow eyebrow--light">The story of Aurel</p>
          <h1>Home is a feeling.<br /><em>We help you find it.</em></h1>
          <p>We believe the right place can change everything. So we made finding it feel different.</p>
        </div>
      </section>
      <section className="section about-story">
        <div className="page-container story-layout">
          <div className="story-aside"><p className="eyebrow">A better way to move</p><span>Since<br /><b>2012</b></span></div>
          <div className="story-main">
            <h2>We look beyond the listing to see the <em>life taking shape.</em></h2>
            <p className="body-copy">Aurel Estates began with a simple belief: finding a home deserves more than a transaction. It deserves attention, empathy and a deep appreciation for the places where life unfolds.</p>
            <p className="body-copy">We bring together a carefully curated collection of exceptional homes and the kind of local insight that helps you imagine living in them. Every property we represent has a reason to be here. Every client deserves a reasoned, personal approach.</p>
            <p className="body-copy">Today, we continue to help people find their place across Delhi NCR—with an eye for the distinctive and a commitment to making every move feel like the right one.</p>
          </div>
        </div>
      </section>
      <section className="mission-section">
        <div className="page-container mission-grid">
          <article>
            <span className="mission-icon"><Heart size={22} strokeWidth={1.4} /></span>
            <p className="eyebrow">Our mission</p>
            <h2>Make the search for home feel <em>human again.</em></h2>
            <p>We pair meaningful relationships with exceptional homes, offering clear advice and genuine care at every turn.</p>
          </article>
          <article>
            <span className="mission-icon"><Eye size={22} strokeWidth={1.4} /></span>
            <p className="eyebrow">Our vision</p>
            <h2>A world where every move feels like a <em>step forward.</em></h2>
            <p>We imagine a property experience shaped around possibility, guided by trust and grounded in a true sense of place.</p>
          </article>
        </div>
      </section>
      <section className="section expertise-section">
        <div className="page-container">
          <div className="section-heading">
            <p className="eyebrow">The way we work</p>
            <h2>Good places. <em>Good people.</em><br />A better way to find home.</h2>
          </div>
          <div className="expertise-list">
            {expertise.map((item) => (
              <article key={item.number}>
                <span className="expertise-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Sparkles size={20} strokeWidth={1.2} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-stats">
        <div className="page-container stats-row">
          <div><strong>12<span>+</span></strong><span>years of local insight</span></div>
          <div><strong>640<span>+</span></strong><span>people finding their place</span></div>
          <div><strong>96<span>%</span></strong><span>referrals from happy clients</span></div>
          <div><strong>18</strong><span>neighbourhoods, deeply known</span></div>
        </div>
        <p className="stats-demo-note">Illustrative demonstration metrics.</p>
      </section>
      <section className="about-cta">
        <div className="page-container about-cta-content">
          <p className="eyebrow eyebrow--light">Let's find your place</p>
          <h2>Every good move<br />starts with a <em>conversation.</em></h2>
          <Link className="button button--gold" to="/contact">Talk to our team <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}
