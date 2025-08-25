import { Container, Nav, Navbar, Badge } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const cart = useCart()
  return (
    <Navbar expand="lg" bg="white" className="border-bottom sticky-top" data-bs-theme="light">
      <Container fluid className="px-3">
        <Navbar.Brand as={Link} to="/" className="py-3">NIVORA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="header-nav">
          <Nav className="me-auto gap-2">
            <Nav.Link as={NavLink} to="/products">Shop</Nav.Link>
            <Nav.Link href="#women" as={NavLink} to="/products?cat=women">Women</Nav.Link>
            <Nav.Link href="#men" as={NavLink} to="/products?cat=men">Men</Nav.Link>
            <Nav.Link href="#kids" as={NavLink} to="/products?cat=kids">Kids</Nav.Link>
            <Nav.Link href="#accessories" as={NavLink} to="/products?cat=accessories">Accessories</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/cart">
              Cart {cart.count > 0 && <Badge bg="dark" pill className="ms-2">{cart.count}</Badge>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
