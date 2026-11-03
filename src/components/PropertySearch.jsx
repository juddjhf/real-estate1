import { useState } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { locations, propertyTypes } from '../data/properties.js'

export default function PropertySearch({ compact = false }) {
  const [values, setValues] = useState({ location: '', type: '', status: 'For Sale', minPrice: '', maxPrice: '' })
  const navigate = useNavigate()
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    Object.entries(values).forEach(([key, value]) => { if (value) params.set(key, value) })
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <form className={`search-panel ${compact ? 'search-panel-compact' : ''}`} onSubmit={submit}>
      <label className="search-field search-location"><span>Where to?</span><span className="search-input-wrap"><MapPin size={16} /><select name="location" value={values.location} onChange={update}><option value="">All locations</option>{locations.map((place) => <option key={place}>{place}</option>)}</select><ChevronDown size={13} className="select-chevron" /></span></label>
      <label className="search-field"><span>I'm looking for</span><span className="search-input-wrap"><select name="type" value={values.type} onChange={update}><option value="">Any property</option>{propertyTypes.map((type) => <option key={type}>{type}</option>)}</select><ChevronDown size={13} className="select-chevron" /></span></label>
      <label className="search-field"><span>Offering</span><span className="search-input-wrap"><select name="status" value={values.status} onChange={update}><option>For Sale</option><option>For Rent</option></select><ChevronDown size={13} className="select-chevron" /></span></label>
      <label className="search-field search-price"><span>Min price <small>₹ Cr</small></span><span className="search-input-wrap"><input name="minPrice" type="number" min="0" step="0.1" placeholder="No min" value={values.minPrice} onChange={update} /></span></label>
      <label className="search-field search-price"><span>Max price <small>₹ Cr</small></span><span className="search-input-wrap"><input name="maxPrice" type="number" min="0" step="0.1" placeholder="No max" value={values.maxPrice} onChange={update} /></span></label>
      <button className="search-submit" type="submit"><Search size={17} /><span>Find a home</span></button>
    </form>
  )
}
