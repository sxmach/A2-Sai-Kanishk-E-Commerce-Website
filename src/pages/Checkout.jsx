import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const cart = useCart()
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('This is a simulated checkout. No payment processed.\nThank you for testing!')
    cart.clear()
  }

  return (
    <Container className="my-4 my-md-5">
      <h5 className="mb-3 text-uppercase">Checkout (Demo)</h5>
      <Row className="g-4">
        <Col md={7}>
          <Form onSubmit={handleSubmit} className="p-3 border">
            <h6 className="mb-3">Shipping</h6>
            <Row className="mb-3">
              <Col md={6}><Form.Control placeholder="First name" required /></Col>
              <Col md={6}><Form.Control placeholder="Last name" required /></Col>
            </Row>
            <Form.Control className="mb-3" placeholder="Address" required />
            <Row className="mb-3">
              <Col md={6}><Form.Control placeholder="City" required /></Col>
              <Col md={6}><Form.Control placeholder="Postal Code" required /></Col>
            </Row>
            <h6 className="mb-3 mt-2">Payment</h6>
            <Form.Control className="mb-3" placeholder="Card Number" required />
            <Row className="mb-3">
              <Col md={6}><Form.Control placeholder="Expiry (MM/YY)" required /></Col>
              <Col md={6}><Form.Control placeholder="CVV" required /></Col>
            </Row>
            <Button type="submit" variant="dark" className="w-100">Place Order</Button>
          </Form>
        </Col>
        <Col md={5}>
          <div className="p-3 border">
            <h6 className="mb-3">Order Summary</h6>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Items</span>
              <strong>{cart.entries.reduce((s,e)=>s+e.qty,0)}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <strong>₹{cart.subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Tax (5%)</span>
              <strong>₹{cart.tax.toLocaleString('en-IN')}</strong>
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
              <span>Total</span>
              <strong>₹{cart.total.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
