import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* Large 404 number */}
      <p className="text-8xl font-bold text-primary mb-4">404</p>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-dark mb-3">Page Not Found</h1>

      {/* Subtitle */}
      <p className="text-body mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved to
        another location.
      </p>

      {/* Back to Home button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary text-dark font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors no-underline"
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
        Back to Home
      </Link>
    </div>
  );
}
