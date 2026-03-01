import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-8xl font-bold text-forest-700 mb-4">404</p>
      <h1 className="font-display text-3xl font-semibold text-forest-900 mb-4">
        Page Not Found
      </h1>
      <p className="text-bark-300 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-forest-700 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-forest-800 transition-colors"
      >
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
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Books
      </Link>
    </div>
  );
}
