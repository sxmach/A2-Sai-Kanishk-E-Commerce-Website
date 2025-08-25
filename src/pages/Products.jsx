import { useMemo, useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import SortFilterBar from '../components/SortFilterBar.jsx'
import { PRODUCTS } from '../data/products.js'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('cat') || '')
  const [sort, setSort] = useState(params.get('sort') || '')
  const [page, setPage] = useState(Number(params.get('page') || 1))
  const pageSize = 8

  // Sync URL on changes
  useEffect(() => {
    const next = new URLSearchParams()
    if (q) next.set('q', q)
    if (category) next.set('cat', category)
    if (sort) next.set('sort', sort)
    if (page !== 1) next.set('page', String(page))
    setParams(next, { replace: true })
  }, [q, category, sort, page, setParams])

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
    if (category) list = list.filter(p => p.category === category)
    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break
      case 'rating-desc': list = [...list].sort((a, b) => b.rating - a.rating); break
      default: break
    }
    return list
  }, [q, category, sort])

  const start = (page - 1) * pageSize
  const visible = filtered.slice(start, start + pageSize)
  const hasMore = start + pageSize < filtered.length

  return (
    <Container className="my-4 my-md-5">
      <h5 className="mb-3 text-uppercase">Shop All</h5>
      <SortFilterBar q={q} setQ={setQ} category={category} setCategory={setCategory} sort={sort} setSort={setSort} />
      <ProductGrid products={visible} />
      <div className="d-flex justify-content-center my-4">
        {page > 1 && <Button variant="outline-dark" className="me-2" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</Button>}
        {hasMore && <Button variant="dark" onClick={() => setPage(p => p + 1)}>Load More</Button>}
      </div>
    </Container>
  )
}
