import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section className="hero">
      <img
        className="hero-img"
        src="https://images.pexels.com/photos/33546638/pexels-photo-33546638.jpeg"
        alt="Seasonal campaign"
      />
      <div className="hero-overlay">
        <div className="headline text-center">
          <div className="mb-3 fw-semibold">NEW SEASON • EDIT</div>
          <Button 
            variant="dark" 
            size="sm" 
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  )
}
