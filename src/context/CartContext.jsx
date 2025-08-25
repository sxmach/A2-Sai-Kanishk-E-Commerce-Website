import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { item, qty } = action.payload
      const existing = state.items[item.id]
      const newQty = (existing?.qty || 0) + (qty || 1)
      return {
        ...state,
        items: {
          ...state.items,
          [item.id]: { item, qty: newQty }
        }
      }
    }
    case 'REMOVE': {
      const id = action.payload
      const copy = { ...state.items }
      delete copy[id]
      return { ...state, items: copy }
    }
    case 'SET_QTY': {
      const { id, qty } = action.payload
      if (qty <= 0) {
        const copy = { ...state.items }
        delete copy[id]
        return { ...state, items: copy }
      }
      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...state.items[id], qty }
        }
      }
    }
    case 'CLEAR':
      return { items: {} }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: {} })

  const api = useMemo(() => {
    const entries = Object.values(state.items)
    const subtotal = entries.reduce((sum, { item, qty }) => sum + item.price * qty, 0)
    const tax = Math.round(subtotal * 0.05) // static 5% tax
    const total = subtotal + tax
    const count = entries.reduce((sum, it) => sum + it.qty, 0)

    return {
      entries,
      subtotal,
      tax,
      total,
      count,
      add(item, qty = 1) { dispatch({ type: 'ADD', payload: { item, qty } }) },
      setQty(id, qty) { dispatch({ type: 'SET_QTY', payload: { id, qty } }) },
      remove(id) { dispatch({ type: 'REMOVE', payload: id }) },
      clear() { dispatch({ type: 'CLEAR' }) }
    }
  }, [state])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
