import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import Drawer from "../ui/Drawer";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import AuthModal from "../auth/AuthModal";

export default function CartDrawer() {
  const { items, isOpen, closeCart, itemCount, updateQuantity, removeItem } =
    useCart();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={closeCart}
        title={`Shopping Cart (${itemCount})`}
      >
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            {/* Shopping bag icon */}
            <svg
              className="w-20 h-20 text-border mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <h3 className="text-dark font-semibold text-lg mb-1">
              Your cart is empty
            </h3>
            <p className="text-body text-sm mb-6">
              Looks like you haven&apos;t added any books yet.
            </p>
            <button
              onClick={closeCart}
              className="bg-primary text-dark font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Items list */}
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {items.map((item) => (
                <CartItem
                  key={item.book.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Sticky bottom summary */}
            <CartSummary onSignInClick={() => setShowAuth(true)} />
          </div>
        )}
      </Drawer>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        initialTab="login"
      />
    </>
  );
}
