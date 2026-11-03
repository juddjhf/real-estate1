import { ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseBusiness, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { agents } from '../data/agents.js'
import { properties } from '../data/properties.js'

export default function Agents() {
  return <>
    <section className="interior-hero page-container"><div><span className="eyebrow">Good people, good advice</span><h1>Your people<br />in <em>property.</em></h1></div><p>Experienced advisors who know the neighbourhoods, ask the right questions, and make the whole journey feel a little easier.</p></section>
    <section className="agents-page page-container">
      {agents.map((agent, index) => {
        const listings = properties.filter((property) => property.agent === agent.name)
        return <article className={`agent-profile ${index % 2 ? 'agent-profile-reverse' : ''}`} key={agent.name}>
          <div className="agent-profile-image"><img src={agent.image} alt={agent.name} /><span className="agent-image-note">Aurel Estates · Advisor 0{index + 1}</span></div>
          <div className="agent-profile-info"><span className="eyebrow">{agent.role}</span><h2>{agent.name}</h2><p className="agent-intro">The right home starts with the right conversation. {agent.name.split(' ')[0]} brings a thoughtful perspective, local expertise, and a genuine care for finding the fit that feels like you.</p><div className="agent-facts"><span><BriefcaseBusiness size={16} />{agent.experience} in property</span><span><BadgeCheck size={16} />{agent.transactions} advised</span><span><MapPin size={16} />{agent.area}</span></div><div className="agent-contact-links"><a href={`tel:${agent.phone.replaceAll(' ', '')}`}><Phone size={15} />{agent.phone}</a><a href={`mailto:${agent.email}`}><Mail size={15} />{agent.email}</a></div><div className="agent-profile-actions"><Link to={`/properties?agent=${encodeURIComponent(agent.name)}`} className="button button-dark">View {listings.length} listings <ArrowRight size={15} /></Link><Link to="/contact" className="text-link">Get in touch <ArrowUpRight size={16} /></Link></div></div>
        </article>
      })}
    </section>
    <section className="agents-bottom"><div className="page-container"><span className="eyebrow eyebrow-light">A good first step</span><h2>Tell us what you’re<br /><em>looking for.</em></h2><Link to="/contact" className="button button-gold">Start a conversation <ArrowUpRight size={15} /></Link></div></section>
  </>
}
