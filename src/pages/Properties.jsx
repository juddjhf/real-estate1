import { useMemo, useState } from 'react'
import { ArrowDownUp, Grid2X2, List, Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'

function initialFilters(params) {
  return {
    search: params.get('search') || '',
    transaction: params.get('transaction') || '',
    location: params.get('location') || '',
    type: params.get('type') || '',
    minPrice: '',
    maxPrice: params.get('maxPrice') || '',
    beds: '',
    sort: 'recommended',
  }
}

export default function Properties({ favorites, onToggleFavorite }) {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => initialFilters(searchParams))
  const [view, setView] = useState('grid')

  const filteredProperties = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase()
    return properties
      .filter((property) => {
        const searchable = `${property.name} ${property.location} ${property.city} ${property.type}`.toLowerCase()
        return (
          (!searchTerm || searchable.includes(searchTerm)) &&
          (!filters.transaction || property.transaction === filters.transaction) &&
          (!filters.location || `${property.city} ${property.location}`.toLowerCase().includes(filters.location.toLowerCase())) &&
          (!filters.type || property.type === filters.type) &&
          (!filters.minPrice || property.price >= Number(filters.minPrice)) &&
          (!filters.maxPrice || property.price <= Number(filters.maxPrice)) &&
          (!filters.beds || property.beds >= Number(filters.beds))
        )
      })
      .sort((a, b) => {
        if (filters.sort === 'price-low') return a.price - b.price
        if (filters.sort === 'price-high') return b.price - a.price
        return 0
      })
  }, [filters])

  function update(field, value) {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  function clearFilters() {
    setFilters({
      search: '',
      transaction: '',
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      sort: 'recommended',
    })
  }

  return (
    <>
      <section className="listing-hero">
        <div className="page-container listing-hero-inner">
          <p className="eyebrow eyebrow--light">A place for your next chapter</p>
          <h1>Explore our<br /><em>properties.</em></h1>
          <p>Distinctive homes across Delhi NCR, chosen with care.</p>
          <span className="listing-hero-count">AUREL COLLECTION <b>—</b> 01 / 08</span>
        </div>
      </section>
      <section className="listing-section">
        <div className="page-container">
          <div className="listing-topline">
            <div>
              <p className="eyebrow">Find your place</p>
              <h2>A considered collection</h2>
            </div>
            <span className="results-count">{filteredProperties.length} thoughtfully selected {filteredProperties.length === 1 ? 'home' : 'homes'}</span>
          </div>
          <div className="filter-toolbar">
            <label className="filter-search">
              <Search size={17} />
              <span className="sr-only">Search properties</span>
              <input value={filters.search} onChange={(event) => update('search', event.target.value)} placeholder="Search by name or location" />
            </label>
            <label className="filter-control">
              <span className="sr-only">Buy or rent</span>
              <select value={filters.transaction} onChange={(event) => update('transaction', event.target.value)}>
                <option value="">Buy or rent</option>
                <option value="buy">For sale</option>
                <option value="rent">For rent</option>
              </select>
            </label>
            <label className="filter-control">
              <span className="sr-only">Location</span>
              <select value={filters.location} onChange={(event) => update('location', event.target.value)}>
                <option value="">All locations</option>
                <option value="South Delhi">South Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Noida">Noida</option>
                <option value="Greater Kailash">Greater Kailash</option>
                <option value="Golf Course Road">Golf Course Road</option>
              </select>
            </label>
            <label className="filter-control">
              <span className="sr-only">Property type</span>
              <select value={filters.type} onChange={(event) => update('type', event.target.value)}>
                <option value="">Any property type</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Independent House">Independent house</option>
              </select>
            </label>
            <button type="button" className="filter-reset" onClick={clearFilters}><X size={14} /> Clear all</button>
          </div>
          <div className="advanced-filters">
            <div className="advanced-filter-group">
              <SlidersHorizontal size={15} />
              <span>Refine</span>
              <label>
                <span className="sr-only">Minimum price</span>
                <input type="number" min="0" placeholder="Min price ₹" value={filters.minPrice} onChange={(event) => update('minPrice', event.target.value)} />
              </label>
              <label>
                <span className="sr-only">Maximum price</span>
                <input type="number" min="0" placeholder="Max price ₹" value={filters.maxPrice} onChange={(event) => update('maxPrice', event.target.value)} />
              </label>
              <label>
                <span className="sr-only">Bedrooms</span>
                <select value={filters.beds} onChange={(event) => update('beds', event.target.value)}>
                  <option value="">Any bedrooms</option>
                  <option value="2">2+ bedrooms</option>
                  <option value="3">3+ bedrooms</option>
                  <option value="4">4+ bedrooms</option>
                  <option value="5">5+ bedrooms</option>
                </select>
              </label>
            </div>
            <div className="listing-controls">
              <label className="sort-control">
                <ArrowDownUp size={15} />
                <span className="sr-only">Sort properties</span>
                <select value={filters.sort} onChange={(event) => update('sort', event.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </label>
              <div className="view-toggle" aria-label="Property display">
                <button type="button" className={view === 'grid' ? 'selected' : ''} aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><Grid2X2 size={16} /></button>
                <button type="button" className={view === 'list' ? 'selected' : ''} aria-label="List view" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={17} /></button>
              </div>
            </div>
          </div>
          {filteredProperties.length > 0 ? (
            <div className={`property-grid listing-grid ${view === 'list' ? 'property-grid--list' : ''}`}>
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  favorite={favorites.includes(property.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon"><Search size={23} /></span>
              <p className="eyebrow">Nothing just yet</p>
              <h2>No homes match those filters.</h2>
              <p>Try a different location or widen your search to discover more possibilities.</p>
              <button type="button" className="button button--dark" onClick={clearFilters}>Clear filters <X size={15} /></button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
