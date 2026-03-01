import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Drawer from "../ui/Drawer";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import AuthModal from "../auth/AuthModal";

export default function CartDrawer() {
  const { items, isOpen, closeCart, itemCount, updateQuantity, removeItem } =
    useCart();
  const [authOpen, setAuthOpen] = useState(false);

  const title = (
    <span className="flex items-center gap-2">
      Your Cart
      {itemCount > 0 && (
        <span className="bg-amber-500 text-white text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1">
          {itemCount}
        </span>
      )}
    </span>
  );

  return (
    <>
      <Drawer isOpen={isOpen} onClose={closeCart} title={title}>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            {/* Shopping bag icon */}
            <svg
              className="h-16 w-16 text-bark-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
            <p className="text-lg font-medium text-forest-900 mb-2">
              Your cart is empty
            </p>
            <Link
              to="/"
              onClick={closeCart}
              className="text-forest-700 hover:text-forest-800 font-medium underline underline-offset-2 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Scrollable item list */}
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              {items.map((item) => (
                <CartItem
                  key={item.book.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Summary fixed at bottom */}
            <CartSummary onSignInClick={() => setAuthOpen(true)} />
          </div>
        )}
      </Drawer>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialTab="login"
      />
    </>
  );
}
