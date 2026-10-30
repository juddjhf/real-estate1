import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PropertySearch({ inHero = false }) {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    transaction: 'buy',
    maxPrice: '',
  })

  function update(field, value) {
    setFilters((current) => ({
      ...current,
      [field]: value,
      ...(field === 'transaction' ? { maxPrice: '' } : {}),
    }))
  }

  function search(event) {
    event.preventDefault()
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <form className={`property-search ${inHero ? 'property-search--hero' : ''}`} onSubmit={search}>
      <label className="search-field">
        <span>Location</span>
        <select value={filters.location} onChange={(event) => update('location', event.target.value)}>
          <option value="">All locations</option>
          <option value="South Delhi">South Delhi</option>
          <option value="Gurgaon">Gurgaon</option>
          <option value="Noida">Noida</option>
          <option value="Greater Kailash">Greater Kailash</option>
          <option value="Golf Course Road">Golf Course Road</option>
        </select>
      </label>
      <label className="search-field">
        <span>Property type</span>
        <select value={filters.type} onChange={(event) => update('type', event.target.value)}>
          <option value="">Any property</option>
          <option value="Villa">Luxury villa</option>
          <option value="Apartment">Apartment</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Independent House">Independent house</option>
        </select>
      </label>
      <label className="search-field">
        <span>Looking to</span>
        <select value={filters.transaction} onChange={(event) => update('transaction', event.target.value)}>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </label>
      <label className="search-field search-field--budget">
        <span>Max budget</span>
        <select value={filters.maxPrice} onChange={(event) => update('maxPrice', event.target.value)}>
          <option value="">No maximum</option>
          <option value={filters.transaction === 'rent' ? '150000' : '50000000'}>
            {filters.transaction === 'rent' ? 'Up to ₹1.5 lakh' : 'Up to ₹5 crore'}
          </option>
          <option value={filters.transaction === 'rent' ? '250000' : '100000000'}>
            {filters.transaction === 'rent' ? 'Up to ₹2.5 lakh' : 'Up to ₹10 crore'}
          </option>
        </select>
      </label>
      <button className="button button--dark search-submit" type="submit">
        <Search size={17} /> <span>Search homes</span>
      </button>
    </form>
  )
}
