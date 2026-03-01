import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

export default function CartSummary({ onSignInClick }) {
  const { items, subtotal, itemCount, checkout, checkingOut } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      {/* Subtotal row */}
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-forest-900">Subtotal</span>
        <span className="font-semibold text-forest-700 text-lg">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Item count */}
      <p className="text-sm text-bark-300 mb-4">
        {itemCount} {itemCount === 1 ? "item" : "items"} in cart
      </p>

      {/* Checkout / Sign In button */}
      {isAuthenticated ? (
        <Button
          variant="primary"
          fullWidth
          loading={checkingOut}
          onClick={checkout}
        >
          Place Order
        </Button>
      ) : (
        <Button
          variant="primary"
          fullWidth
          onClick={onSignInClick}
        >
          Sign In to Checkout
        </Button>
      )}
    </div>
  );
}
