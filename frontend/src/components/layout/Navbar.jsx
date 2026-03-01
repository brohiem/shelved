import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import Badge from "../ui/Badge";
import AuthModal from "../auth/AuthModal";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      {/* Row 1: Top bar */}
      <div className="bg-dark text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs">
          <span className="text-white/70">Welcome to Shelved Bookstore</span>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-white/70">
                  Hi, {user?.name}
                </span>
                <Link
                  to="/orders"
                  className="text-white/70 hover:text-white transition-colors no-underline"
                >
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none text-xs font-body"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none text-xs font-body"
                >
                  Login
                </button>
                <span className="text-white/30">|</span>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none text-xs font-body"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Main header */}
      <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 no-underline"
          >
            {/* Book icon */}
            <svg
              className="h-7 w-7 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="text-2xl font-bold text-dark">Shelved</span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative text-dark hover:text-body transition-colors cursor-pointer bg-transparent border-none p-2"
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
              <span className="absolute -top-0.5 -right-0.5">
                <Badge count={itemCount} />
              </span>
            </button>

            {/* Sign In button (visible when not authenticated) */}
            {!isAuthenticated && (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-dark hover:text-primary-dark transition-colors cursor-pointer bg-transparent border-none font-body"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Sign In
              </button>
            )}

            {/* User info (visible when authenticated, larger screens) */}
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-body">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span className="font-medium text-dark">{user?.name}</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab="login"
      />
    </>
  );
}
