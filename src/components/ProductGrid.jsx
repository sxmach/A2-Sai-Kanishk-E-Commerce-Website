import { Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  return (
    <Row className="g-3 g-md-4">
      {products.map(p => (
        <Col key={p.id} xs={6} md={4} lg={3}>
          <ProductCard product={p} />
        </Col>
      ))}
    </Row>
  )
}
