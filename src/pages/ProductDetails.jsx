import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { supabase } from '../supabaseClient.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const cart = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      let { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
        setProduct(null)
      } else {
        setProduct(data)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (!product) {
    return <Container className="py-5">Product not found.</Container>
  }

  return (
    <Container className="my-4 my-md-5">
      <Row className="g-4">
        <Col md={6}>
          <img src={product.image} alt={product.title} className="w-100 border" style={{ borderColor:'#e9ecef' }} />
        </Col>
        <Col md={6}>
          <h3 className="mb-1">{product.title}</h3>
          <div className="text-muted mb-2">★ {product.rating?.toFixed(1) || "N/A"}</div>
          <div className="fs-5 mb-3">₹{product.price?.toLocaleString('en-IN')}</div>
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
