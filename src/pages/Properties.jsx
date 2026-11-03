import { useEffect, useMemo, useState } from 'react'
import { ArrowDownUp, ArrowLeft, ArrowRight, Grid2X2, List, SearchX } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard.jsx'
import PropertyFilters from '../components/PropertyFilters.jsx'
import { properties } from '../data/properties.js'

const PER_PAGE = 6
const emptyFilters = { location: '', types: [], minPrice: '', maxPrice: '', beds: 'Any', baths: 'Any', status: '', agent: '' }

function readFilters(params) {
  const type = params.get('type') || ''
  return {
    ...emptyFilters,
    location: params.get('location') || '',
    types: type ? [type] : [],
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    status: params.get('status') || '',
    agent: params.get('agent') || '',
  }
}

export default function Properties() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => readFilters(searchParams))
  const [sort, setSort] = useState('latest')
  const [layout, setLayout] = useState('grid')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setFilters(readFilters(searchParams))
    setPage(1)
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = properties.filter((property) => {
      const minPrice = filters.minPrice ? Number(filters.minPrice) * 10000000 : 0
      const maxPrice = filters.maxPrice ? Number(filters.maxPrice) * 10000000 : Infinity
      const minimumBeds = filters.beds === 'Any' ? 0 : Number.parseInt(filters.beds, 10)
      const minimumBaths = filters.baths === 'Any' ? 0 : Number.parseInt(filters.baths, 10)
      return (!filters.location || property.city === filters.location || property.location.includes(filters.location))
        && (filters.types.length === 0 || filters.types.includes(property.type))
        && (!filters.status || property.status === filters.status)
        && (!filters.agent || property.agent === filters.agent)
        && property.price >= minPrice && property.price <= maxPrice
        && property.beds >= minimumBeds && property.baths >= minimumBaths
    })
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'latest') result = [...result].sort((a, b) => b.year - a.year)
    return result
  }, [filters, sort])

  useEffect(() => setPage(1), [filters, sort])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const reset = () => setFilters(emptyFilters)

  return (
    <div className="listing-page">
      <section className="listing-hero">
        <div className="page-container listing-hero-inner"><div><span className="eyebrow eyebrow-light">The Aurel collection</span><h1>Find a place<br />to <em>belong.</em></h1></div><p>Thoughtful homes, selected with care.<br />Explore the collection and find your somewhere.</p></div>
        <div className="listing-hero-rule" />
      </section>
      <div className="page-container listing-layout">
        <PropertyFilters filters={filters} onChange={setFilters} onReset={reset} />
        <section className="listing-results" aria-label="Property results">
          <div className="results-topline"><span>Showing <strong>{filtered.length ? (page - 1) * PER_PAGE + 1 : 0}–{Math.min(page * PER_PAGE, filtered.length)}</strong> of <strong>{filtered.length}</strong> homes</span><div className="results-controls"><label className="sort-control"><ArrowDownUp size={15} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort properties"><option value="latest">Latest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label><div className="view-toggle"><button className={layout === 'grid' ? 'view-active' : ''} onClick={() => setLayout('grid')} aria-label="Grid view"><Grid2X2 size={17} /></button><button className={layout === 'list' ? 'view-active' : ''} onClick={() => setLayout('list')} aria-label="List view"><List size={18} /></button></div></div></div>
          {filtered.length > 0 ? <>
            <div className={`${layout === 'grid' ? 'property-grid listing-grid' : 'property-list'}`}>{visible.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}</div>
            {pageCount > 1 && <nav className="pagination" aria-label="Pagination"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous page"><ArrowLeft size={16} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} className={page === number ? 'page-active' : ''} onClick={() => setPage(number)}>{String(number).padStart(2, '0')}</button>)}<button onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} aria-label="Next page"><ArrowRight size={16} /></button></nav>}
          </> : <div className="empty-results"><SearchX size={30} /><h2>No homes found this time.</h2><p>Try adjusting your filters. The right place may be just around the corner.</p><button className="button button-dark" onClick={reset}>Clear all filters</button><Link className="text-link" to="/contact">Ask us to find it for you <ArrowRight size={15} /></Link></div>}
        </section>
      </div>
    </div>
  )
}
