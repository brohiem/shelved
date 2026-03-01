import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export default function CartSummary({ onSignInClick }) {
  const { items, subtotal, itemCount, checkout, checkingOut } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) return null;

  return (
    <div className="bg-light-bg p-6 border-t border-border">
      {/* Subtotal row */}
      <div className="flex justify-between items-center">
        <span className="text-body">Subtotal</span>
        <span className="text-dark font-bold text-xl">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Item count */}
      <p className="text-sm text-body mt-1">
        {itemCount} {itemCount === 1 ? "item" : "items"} in cart
      </p>

      {/* Divider */}
      <div className="border-t border-border my-4" />

      {/* Action button */}
      {isAuthenticated ? (
        <button
          onClick={checkout}
          disabled={checkingOut}
          className="bg-primary text-dark font-semibold w-full py-3 rounded-full hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {checkingOut && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {checkingOut ? "Placing Order..." : "Place Order"}
        </button>
      ) : (
        <button
          onClick={onSignInClick}
          className="bg-dark text-white font-semibold w-full py-3 rounded-full hover:bg-dark/90 transition-colors cursor-pointer"
        >
          Sign In to Checkout
        </button>
      )}
    </div>
  );
}
