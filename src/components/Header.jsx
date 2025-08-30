import { Container, Nav, Navbar, Badge, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header() {
  const cart = useCart()
  const { user, signOut } = useAuth()

  return (
    <Navbar expand="lg" bg="white" className="border-bottom sticky-top" data-bs-theme="light">
      <Container fluid className="px-3">
        <Navbar.Brand as={Link} to="/" className="py-3">NIVORA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="header-nav">
          <Nav className="me-auto gap-2">
            <Nav.Link as={NavLink} to="/products">Shop</Nav.Link>
            <Nav.Link as={NavLink} to="/products?cat=women">Women</Nav.Link>
            <Nav.Link as={NavLink} to="/products?cat=men">Men</Nav.Link>
            <Nav.Link as={NavLink} to="/products?cat=kids">Kids</Nav.Link>
            <Nav.Link as={NavLink} to="/products?cat=accessories">Accessories</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/cart">
              Cart {cart.count > 0 && <Badge bg="dark" pill className="ms-2">{cart.count}</Badge>}
            </Nav.Link>

            {/* 👇 auth-specific part */}
            {!user ? (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/signup">Sign up</Nav.Link>
              </>
            ) : (
              <NavDropdown title={user.email || 'Account'} id="user-nav">
                <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
