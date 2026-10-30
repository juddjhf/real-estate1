import { useState } from 'react'
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function submit(event) {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <>
      <section className="simple-page-hero contact-hero">
        <div className="page-container">
          <p className="eyebrow eyebrow--light">We’re here to help</p>
          <h1>Let’s start a<br /><em>conversation.</em></h1>
          <p>Whether you’re looking for a place or thinking about your next move, we’d love to hear from you.</p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="page-container contact-layout">
          <div className="contact-details">
            <p className="eyebrow">Come say hello</p>
            <h2>Good conversations<br />start <em>somewhere.</em></h2>
            <p className="body-copy">Reach out to our team. We’ll take the time to understand what you’re looking for and help you find a thoughtful way forward.</p>
            <div className="contact-info-list">
              <a href="tel:+911140012345"><span><Phone size={18} /></span><div><small>Call our team</small><strong>+91 11 4001 2345</strong></div></a>
              <a href="mailto:hello@aurelestates.in"><span><Mail size={18} /></span><div><small>Write to us</small><strong>hello@aurelestates.in</strong></div></a>
              <div><span><MapPin size={18} /></span><div><small>Visit our studio</small><strong>12 Defence Colony, New Delhi 110024</strong></div></div>
              <div><span><Clock3 size={18} /></span><div><small>We’re around</small><strong>Monday – Saturday, 10 am – 6 pm</strong></div></div>
            </div>
            <div className="map-placeholder">
              <div className="map-grid" />
              <span className="map-pin"><MapPin size={22} fill="currentColor" /></span>
              <span className="map-label">AUREL ESTATES <small>DEFENCE COLONY, NEW DELHI</small></span>
              <span className="map-note">Illustrative location</span>
            </div>
          </div>
          <div className="contact-form-card">
            {sent ? (
              <div className="form-success form-success--inline">
                <span><Mail size={22} /></span>
                <p className="eyebrow">Message noted</p>
                <h2>Thank you for reaching out.</h2>
                <p>This is a demo form. No message has been sent to or stored by an agency.</p>
                <button className="text-link" type="button" onClick={() => setSent(false)}>Write another message <ArrowUpRight size={15} /></button>
              </div>
            ) : (
              <>
                <p className="eyebrow">A note to our team</p>
                <h2>How can we help?</h2>
                <p className="form-card-intro">Tell us a little about what you have in mind.</p>
                <form className="form-stack" onSubmit={submit}>
                  <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
                  <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required /></label>
                  <label>Phone number<input name="phone" type="tel" autoComplete="tel" minLength={8} maxLength={18} inputMode="tel" placeholder="+91 98765 43210" required /></label>
                  <label>Your message<textarea name="message" rows="4" placeholder="I’m looking for..." required /></label>
                  <button className="button button--dark button--full" type="submit">Send your message <ArrowUpRight size={16} /></button>
                </form>
                <p className="demo-note">Demo only — your details are not sent or stored.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
