import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { locations, properties, propertyTypes } from '../data/properties.js'

const advisors = [...new Set(properties.map((property) => property.agent))]

export default function PropertyFilters({ filters, onChange, onReset }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const set = (key, value) => onChange((current) => ({ ...current, [key]: value }))
  const content = (
    <>
      <div className="filter-heading"><div><span className="eyebrow">Refine your search</span><h3>Find your fit</h3></div><button className="filter-reset" onClick={onReset}>Clear all</button></div>
      <label className="filter-group"><span className="filter-label">Location</span><select value={filters.location} onChange={(e) => set('location', e.target.value)}><option value="">All locations</option>{locations.map((place) => <option key={place}>{place}</option>)}</select></label>
      <label className="filter-group"><span className="filter-label">Aurel advisor</span><select value={filters.agent} onChange={(e) => set('agent', e.target.value)}><option value="">All advisors</option>{advisors.map((name) => <option key={name}>{name}</option>)}</select></label>
      <div className="filter-group"><span className="filter-label">Property type</span><div className="filter-options">{propertyTypes.map((type) => <label key={type} className="check-option"><input type="checkbox" checked={filters.types.includes(type)} onChange={(e) => set('types', e.target.checked ? [...filters.types, type] : filters.types.filter((item) => item !== type))} /><span>{type}</span></label>)}</div></div>
      <div className="filter-group"><span className="filter-label">Price range <span className="filter-muted">in ₹ Cr</span></span><div className="range-inputs"><label><span>Min</span><input type="number" min="0" placeholder="0" value={filters.minPrice} onChange={(e) => set('minPrice', e.target.value)} /></label><span className="range-divider">—</span><label><span>Max</span><input type="number" min="0" placeholder="Any" value={filters.maxPrice} onChange={(e) => set('maxPrice', e.target.value)} /></label></div></div>
      <div className="filter-group"><span className="filter-label">Bedrooms</span><div className="choice-row">{['Any', '1+', '2+', '3+', '4+'].map((option) => <button key={option} className={filters.beds === option ? 'choice-active' : ''} onClick={() => set('beds', option)}>{option}</button>)}</div></div>
      <div className="filter-group"><span className="filter-label">Bathrooms</span><div className="choice-row">{['Any', '1+', '2+', '3+', '4+'].map((option) => <button key={option} className={filters.baths === option ? 'choice-active' : ''} onClick={() => set('baths', option)}>{option}</button>)}</div></div>
      <label className="filter-group"><span className="filter-label">Property status</span><select value={filters.status} onChange={(e) => set('status', e.target.value)}><option value="">Buy or rent</option><option>For Sale</option><option>For Rent</option></select></label>
      <button className="button button-dark filter-apply" onClick={() => setMobileOpen(false)}>Show properties</button>
    </>
  )
  return (
    <>
      <button className="filter-mobile-trigger" onClick={() => setMobileOpen(true)}><SlidersHorizontal size={16} /> Filters</button>
      <aside className={`filters-sidebar ${mobileOpen ? 'filters-open' : ''}`}>
        <button className="filter-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close filters"><X size={20} /></button>
        {content}
      </aside>
      {mobileOpen && <button className="filter-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close filters" />}
    </>
  )
}
