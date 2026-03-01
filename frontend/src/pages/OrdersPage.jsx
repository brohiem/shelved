import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../api/client";
import Spinner from "../components/ui/Spinner";
import OrderList from "../components/orders/OrderList";
import AuthModal from "../components/auth/AuthModal";

export default function OrdersPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    setLoading(true);
    api
      .getOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isAuthenticated]);

  // Loading auth state
  if (authLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Spinner size="lg" />
      </div>
    );
  }

  // Not authenticated: prompt to sign in
  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-light-bg flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-body"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-dark mb-2">
            Sign in to view your orders
          </h2>
          <p className="text-body mb-6 max-w-md">
            You need to be signed in to access your order history and track your
            purchases.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="bg-primary text-dark font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </div>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialTab="login"
        />
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark">My Orders</h1>
        <p className="text-body mt-1">Track and manage your book orders</p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-danger"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <p className="text-danger font-medium mb-2">
            Something went wrong
          </p>
          <p className="text-body text-sm">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-light-bg flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-body"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-dark mb-2">
            No orders yet
          </h3>
          <p className="text-body mb-6">
            Start shopping and your orders will appear here!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-dark font-semibold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors no-underline"
          >
            Browse Books
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      )}

      {/* Orders list */}
      {!loading && !error && orders.length > 0 && (
        <OrderList orders={orders} />
      )}
    </div>
  );
}
