import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const cart = useCart()

  return (
    <Card className="product-card h-100">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <Card.Img variant="top" src={product.image} alt={product.title} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{product.title}</Card.Title>
        <div className="text-muted small mb-2">★ {product.rating.toFixed(1)}</div>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
          <Button size="sm" variant="outline-dark" onClick={() => cart.add(product)}>Add</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
