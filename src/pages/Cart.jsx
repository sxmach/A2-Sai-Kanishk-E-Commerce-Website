import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import QuantityControl from '../components/QuantityControl.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const cart = useCart()
  const nav = useNavigate()

  return (
    <Container className="my-4 my-md-5">
      <h5 className="mb-3 text-uppercase">Your Cart</h5>

      {cart.entries.length === 0 ? (
        <div className="text-center py-5">
          <p className="mb-3">Your cart is empty.</p>
          <Button as={Link} to="/products" variant="dark">Start Shopping</Button>
        </div>
      ) : (
        <Row className="g-4">
          <Col lg={8}>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th style={{width:'60px'}}>Item</th>
                  <th>Product</th>
                  <th style={{width:'140px'}}>Qty</th>
                  <th style={{width:'120px'}}>Price</th>
                  <th style={{width:'80px'}}></th>
                </tr>
              </thead>
              <tbody>
                {cart.entries.map(({ item, qty }) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.title} style={{width:56, height:70, objectFit:'cover'}} />
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <QuantityControl value={qty} onChange={(v) => cart.setQty(item.id, v)} />
                    </td>
                    <td>₹{(item.price * qty).toLocaleString('en-IN')}</td>
                    <td>
                      <Button variant="outline-dark" size="sm" onClick={() => cart.remove(item.id)}>Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col lg={4}>
            <div className="p-3 border">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <strong>₹{cart.subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Tax (5%)</span>
                <strong>₹{cart.tax.toLocaleString('en-IN')}</strong>
              </div>
              <div className="d-flex justify-content-between border-top pt-2 mb-3">
                <span>Total</span>
                <strong>₹{cart.total.toLocaleString('en-IN')}</strong>
              </div>
              <Button variant="dark" className="w-100 mb-2" onClick={() => nav('/checkout')}>Proceed to Checkout</Button>
              <Button variant="outline-dark" className="w-100" onClick={() => cart.clear()}>Clear Cart</Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  )
}
