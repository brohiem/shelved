import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link
            to="/"
            className="font-display text-xl font-bold text-forest-900 no-underline"
          >
            Shelved
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative text-forest-900 hover:text-forest-700 transition-colors cursor-pointer"
              aria-label="Open cart"
            >
              <svg
                className="h-6 w-6"
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
              <span className="absolute -top-1.5 -right-1.5">
                <Badge count={itemCount} />
              </span>
            </button>

            {isAuthenticated ? (
              <>
                <span className="text-sm text-bark-500 font-medium hidden sm:inline">
                  {user?.name}
                </span>
                <Link
                  to="/orders"
                  className="text-sm text-forest-700 hover:text-forest-800 font-medium no-underline hidden sm:inline"
                >
                  My Orders
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setAuthModalOpen(true)}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab="login"
      />
    </>
  );
}
