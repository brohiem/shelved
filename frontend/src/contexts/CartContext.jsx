import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../api/client";
import { useToast } from "./ToastContext";

const CartContext = createContext();

function loadCart() {
  try {
    const saved = localStorage.getItem("shelved_cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem("shelved_cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((book) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    showToast(`Added "${book.title}" to cart`, "success");
    setIsOpen(true);
  }, [showToast]);

  const removeItem = useCallback((bookId) => {
    setItems((prev) => prev.filter((item) => item.book.id !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.book.id !== bookId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const checkout = useCallback(async () => {
    setCheckingOut(true);
    try {
      const orderItems = items.map((item) => ({
        book_id: item.book.id,
        quantity: item.quantity,
      }));
      const result = await api.createOrder(orderItems);
      setItems([]);
      setIsOpen(false);
      showToast(`Order #${result.id} placed! Total: $${result.total}`, "success");
      return result;
    } catch (err) {
      showToast(err.message || "Checkout failed", "error");
      throw err;
    } finally {
      setCheckingOut(false);
    }
  }, [items, showToast]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items, isOpen, checkingOut, itemCount, subtotal,
        addItem, removeItem, updateQuantity, clearCart,
        openCart, closeCart, checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
