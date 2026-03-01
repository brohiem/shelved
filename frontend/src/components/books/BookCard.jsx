export default function BookCard({ book, onClick, onAddToCart }) {
  const coverUrl = book.isbn
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
    : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(book);
  };

  return (
    <div
      onClick={() => onClick(book)}
      className="bg-white rounded-xl border border-border overflow-hidden group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image section */}
      <div className="aspect-[3/4] bg-light-bg relative overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-border"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.472.89 6.075 2.356M12 6.042c1.61-1.516 3.755-2.292 6-2.292 1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.331 0-4.472.89-6.075 2.356M12 6.042V20.356"
              />
            </svg>
          </div>
        )}

        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(book);
            }}
            className="bg-white text-dark px-4 py-2 rounded-full text-sm font-medium hover:bg-primary transition-colors cursor-pointer"
          >
            Quick View
          </button>
        </div>

        {/* Category badge */}
        {book.category && (
          <span className="absolute top-3 left-3 bg-primary text-dark text-xs font-semibold px-3 py-1 rounded-full">
            {book.category}
          </span>
        )}

        {/* Out of stock badge */}
        {book.stock <= 0 && (
          <span className="absolute top-3 right-3 bg-danger text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Info section */}
      <div className="p-4">
        <h3 className="text-dark font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-body text-sm mt-1">{book.author}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-dark font-bold text-lg">
            ${Number(book.price).toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-primary-light text-primary-dark hover:bg-primary hover:text-dark flex items-center justify-center transition-all cursor-pointer"
            aria-label="Add to cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
