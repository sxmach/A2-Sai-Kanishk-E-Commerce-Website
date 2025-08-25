import { Form, Row, Col } from 'react-bootstrap'
import { CATEGORIES } from '../data/products.js'

export default function SortFilterBar({ q, setQ, category, setCategory, sort, setSort }) {
  return (
    <Form className="mb-3">
      <Row className="gy-2 align-items-center">
        <Col xs={12} md={4}>
          <Form.Control
            value={q}
            placeholder="Search products"
            onChange={(e) => setQ(e.target.value)}
          />
        </Col>
        <Col xs={6} md={3}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Form.Select>
        </Col>
        <Col xs={6} md={3}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating: High → Low</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  )
}
