import { Container } from 'react-bootstrap'
import Hero from '../components/Hero.jsx'
import CategoryStrip from '../components/CategoryStrip.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { PRODUCTS } from '../data/products.js'

export default function Home() {
  const highlights = PRODUCTS.slice(0, 4)
  return (
    <>
      <Hero />
      <CategoryStrip />
      <Container className="my-4 my-md-5">
        <h5 className="mb-3 text-uppercase">Highlights</h5>
        <ProductGrid products={highlights} />
      </Container>
    </>
  )
}
