import BookCard from "./BookCard";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-light-bg" />
      <div className="p-4">
        <div className="h-5 bg-light-bg rounded w-3/4" />
        <div className="h-4 bg-light-bg rounded w-1/2 mt-2" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-6 bg-light-bg rounded w-16" />
          <div className="w-10 h-10 bg-light-bg rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function BookGrid({ books, loading, onBookClick, onAddToCart }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          className="w-16 h-16 text-border mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <h3 className="text-dark font-semibold text-lg">No books found</h3>
        <p className="text-body text-sm mt-1">
          Try a different search or category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={onBookClick}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
