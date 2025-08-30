import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load cart from Supabase
  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } = await supabase
        .from("cart")
        .select("*, products(*)"); // join product details
      if (!error) {
        setItems(data.map(row => ({
          ...row.products,
          qty: row.qty
        })));
      }
    };
    fetchCart();
  }, []);

  const add = async (product) => {
    // Check if product exists
    const existing = items.find((p) => p.id === product.id);

    if (existing) {
      // Update qty
      await supabase
        .from("cart")
        .update({ qty: existing.qty + 1 })
        .eq("product_id", product.id);

      setItems(items.map((p) =>
        p.id === product.id ? { ...p, qty: p.qty + 1 } : p
      ));
    } else {
      // Insert new
      await supabase
        .from("cart")
        .insert([{ product_id: product.id, qty: 1 }]);

      setItems([...items, { ...product, qty: 1 }]);
    }
  };

  const remove = async (productId) => {
    await supabase.from("cart").delete().eq("product_id", productId);
    setItems(items.filter((p) => p.id !== productId));
  };

  return (
    <CartContext.Provider value={{ items, add, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
