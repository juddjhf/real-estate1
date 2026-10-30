import { useState } from 'react'
import { ArrowUpRight, Check, ClipboardCheck } from 'lucide-react'

export default function ListProperty() {
  const [success, setSuccess] = useState(false)

  function submit(event) {
    event.preventDefault()
    setSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="simple-page-hero list-property-hero">
        <div className="page-container">
          <p className="eyebrow eyebrow--light">For discerning homeowners</p>
          <h1>A good home deserves<br /><em>a thoughtful introduction.</em></h1>
          <p>Tell us about your property and our team will help you explore what comes next.</p>
        </div>
      </section>
      <section className="section submission-section">
        <div className="page-container submission-layout">
          <aside className="submission-aside">
            <p className="eyebrow">List with Aurel</p>
            <h2>Every home has<br />a <em>story to tell.</em></h2>
            <p className="body-copy">We’ll take the time to understand what makes your property special and help you share it with the right people.</p>
            <div className="submission-promise"><span><ClipboardCheck size={19} /></span><p><strong>A considered first conversation</strong><br />Our team will review your details and help you understand your options.</p></div>
            <p className="demo-note">This is a demonstration form. Your information will not be sent to a real agency or published.</p>
          </aside>
          <div className="submission-form-card">
            {success ? (
              <div className="form-success form-success--inline">
                <span><Check size={22} /></span>
                <p className="eyebrow">Details received for this demo</p>
                <h2>Thank you for sharing your property.</h2>
                <p>This demonstration does not send, store, or publish your property information.</p>
                <button type="button" className="button button--dark" onClick={() => setSuccess(false)}>Add another property <ArrowUpRight size={16} /></button>
              </div>
            ) : (
              <>
                <div className="form-card-heading">
                  <p className="eyebrow">Tell us about it</p>
                  <h2>Property details</h2>
                  <p>Fields marked with * are required.</p>
                </div>
                <form className="submission-form" onSubmit={submit}>
                  <div className="form-section-label"><span>01</span> Your details</div>
                  <div className="form-grid">
                    <label>Owner name *<input name="ownerName" autoComplete="name" required /></label>
                    <label>Phone number *<input name="phone" type="tel" autoComplete="tel" minLength={8} maxLength={18} inputMode="tel" required /></label>
                    <label className="form-span-2">Email address *<input name="email" type="email" autoComplete="email" required /></label>
                  </div>
                  <div className="form-section-label"><span>02</span> The property</div>
                  <div className="form-grid">
                    <label className="form-span-2">Property title *<input name="title" placeholder="e.g. A light-filled home in Vasant Vihar" required /></label>
                    <label className="form-span-2">Property location *<input name="location" placeholder="Neighbourhood, city" required /></label>
                    <label>Property type *
                      <select name="type" defaultValue="" required>
                        <option value="" disabled>Select a type</option>
                        <option>Villa</option><option>Apartment</option><option>Penthouse</option><option>Independent House</option>
                      </select>
                    </label>
                    <label>Listing type *
                      <select name="transaction" defaultValue="" required>
                        <option value="" disabled>For sale or rent</option>
                        <option>For sale</option><option>For rent</option>
                      </select>
                    </label>
                    <label>Expected price (₹) *<input name="price" type="number" min="1" placeholder="e.g. 25000000" required /></label>
                    <label>Property area (sq. ft.) *<input name="area" type="number" min="1" placeholder="e.g. 2400" required /></label>
                    <label>Bedrooms<input name="bedrooms" type="number" min="0" max="30" /></label>
                    <label>Bathrooms<input name="bathrooms" type="number" min="0" max="30" /></label>
                    <label className="form-span-2">Property description *<textarea name="description" rows="4" placeholder="What makes this property special?" required /></label>
                    <label className="form-span-2">Property image URL<input name="imageUrl" type="url" placeholder="https://..." /></label>
                  </div>
                  <button className="button button--dark" type="submit">Share property details <ArrowUpRight size={16} /></button>
                  <p className="demo-note">Demo only. Clicking this button will not publish or send your property details.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
