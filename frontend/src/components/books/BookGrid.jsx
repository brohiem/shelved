import BookCard from "./BookCard";

export default function BookGrid({ books, loading, onBookClick, onAddToCart }) {
  if (loading) {
    return (
      <div
        id="book-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-xl h-80"
          />
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div id="book-grid" className="text-center py-12">
        <svg
          className="mx-auto h-16 w-16 text-bark-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <p className="text-bark-500 text-lg font-body">No books found</p>
        <p className="text-bark-300 text-sm mt-1">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div
      id="book-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
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
