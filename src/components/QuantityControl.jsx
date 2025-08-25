import { Button, ButtonGroup } from 'react-bootstrap'

export default function QuantityControl({ value, onChange, min = 0, max = 99 }) {
  const dec = () => onChange(Math.max(min, (value || 0) - 1))
  const inc = () => onChange(Math.min(max, (value || 0) + 1))
  return (
    <ButtonGroup aria-label="Quantity" className="quantity-control">
      <Button variant="outline-dark" onClick={dec}>−</Button>
      <Button variant="outline-dark" disabled>{value ?? 0}</Button>
      <Button variant="outline-dark" onClick={inc}>+</Button>
    </ButtonGroup>
  )
}
