import { Container } from 'react-bootstrap'

export default function NotFound() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-6">404</h1>
      <p className="text-muted">Page not found.</p>
    </Container>
  )
}
