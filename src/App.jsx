import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import NotFound from './pages/NotFound.jsx';

// NEW imports
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

export default function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Container fluid className="px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* NEW routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>

      {/* Footer */}
      <footer className="text-center border-top mt-5 text-muted py-4">
        © {new Date().getFullYear()} NIVORA - All Rights Reserved
      </footer>
    </>
  );
}
