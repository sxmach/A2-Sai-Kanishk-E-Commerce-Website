import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { PRODUCTS } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p.id === id)
  const cart = useCart()

  if (!product) {
    return <Container className="py-5">Product not found.</Container>
  }

  return (
    <Container className="my-4 my-md-5">
      <Row className="g-4">
        <Col md={6}>
          <img src={product.image} alt={product.title} className="w-100 border" style={{borderColor:'#e9ecef'}} />
        </Col>
        <Col md={6}>
          <h3 className="mb-1">{product.title}</h3>
          <div className="text-muted mb-2">★ {product.rating.toFixed(1)}</div>
          <div className="fs-5 mb-3">₹{product.price.toLocaleString('en-IN')}</div>
          <p className="mb-4">{product.description}</p>
          <div className="d-flex gap-2">
            <Button variant="dark" onClick={() => cart.add(product)}>Add to Cart</Button>
            <Button variant="outline-dark" onClick={() => cart.add(product)}>Buy Now</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
