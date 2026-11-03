import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }
  return <>
    <section className="interior-hero page-container contact-hero"><div><span className="eyebrow">We’re good listeners</span><h1>Tell us what<br />you’re <em>thinking.</em></h1></div><p>Buying, selling, just exploring? Wherever you are in the process, we’re here for a good conversation.</p></section>
    <section className="contact-layout page-container">
      <div className="contact-form-panel"><span className="eyebrow">A good place to begin</span><h2>What’s on your mind?</h2><p>Share a little about what you’re looking for. A real person from our team will get back to you shortly.</p>
        {submitted ? <div className="form-success"><span><Mail size={20} /></span><h3>Thank you for reaching out.</h3><p>Your note is with our team. We’ll be in touch soon for a proper conversation.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another message <ArrowRight size={15} /></button></div> : <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="First and last name" required /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div><div className="form-row"><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" pattern="\+?[0-9 ]{8,18}" title="Enter a valid phone number" required /></label><label>I'm interested in<select name="interest" defaultValue=""><option value="" disabled>Select an option</option><option>Buying a home</option><option>Renting a home</option><option>Selling a property</option><option>Property advice</option><option>Something else</option></select></label></div><label>A little more about it<textarea name="message" rows="5" placeholder="The more we know, the better we can help." required /></label><button className="button button-dark" type="submit">Send your note <ArrowRight size={16} /></button><span className="form-note">Your details are only used to get back to you. No noise, ever.</span></form>}
      </div>
      <aside className="contact-info-panel"><div className="contact-info-top"><span className="eyebrow eyebrow-light">Come find us</span><h2>Good conversations<br />start <em>somewhere.</em></h2></div><div className="contact-info-list"><div><MapPin size={18} /><p><strong>Aurel Estates</strong><span>First Floor, The Crescent<br />Lado Sarai, New Delhi 110030</span></p></div><div><Phone size={18} /><p><strong>Give us a call</strong><a href="tel:+911141234567">+91 11 4123 4567</a></p></div><div><Mail size={18} /><p><strong>Drop us a note</strong><a href="mailto:hello@aurelestates.in">hello@aurelestates.in</a></p></div><div><Clock3 size={18} /><p><strong>When we’re around</strong><span>Monday – Saturday<br />10:00 am – 6:00 pm</span></p></div></div><div className="contact-map"><div className="map-lines" /><span className="map-pin"><MapPin size={19} /></span><span className="map-label">The Crescent · Lado Sarai</span><span className="map-note">New Delhi, India · Map preview</span></div><a className="contact-direction" href="https://maps.google.com/?q=Lado+Sarai+New+Delhi">Find your way here <ArrowUpRight size={15} /></a></aside>
    </section>
  </>
}
