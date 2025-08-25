import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'

export default function CategoryStrip() {
  const navigate = useNavigate()
  return (
    <Container className="category-strip my-5">
      <Row className="g-0">
        {CATEGORIES.map((c) => (
          <Col key={c} xs={12} sm={6} md={3} className="text-center py-4 cat"
               role="button"
               onClick={() => navigate(`/products?cat=${c}`)}>
            {c}
          </Col>
        ))}
      </Row>
    </Container>
  )
}
