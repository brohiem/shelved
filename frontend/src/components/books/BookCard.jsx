export default function BookCard({ book, onClick, onAddToCart }) {
  const coverUrl = book.isbn
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
    : null;

  const outOfStock = book.stock <= 0;

  return (
    <div
      onClick={() => onClick(book)}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
    >
      {/* Cover image */}
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.title}
          className="aspect-[2/3] w-full object-cover bg-parchment"
        />
      ) : (
        <div className="aspect-[2/3] w-full bg-parchment flex items-center justify-center p-4">
          <span className="font-display text-forest-700 text-center text-lg">
            {book.title}
          </span>
        </div>
      )}

      {/* Details */}
      <div className="p-4">
        {/* Category badge */}
        {book.category && (
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-forest-700/10 text-forest-700 mb-2">
            {book.category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-forest-900 line-clamp-1">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-bark-300 mb-3">{book.author}</p>

        {/* Out of stock badge */}
        {outOfStock && (
          <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600 font-medium mb-2">
            Out of Stock
          </span>
        )}

        {/* Bottom row */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-forest-700">
            ${Number(book.price).toFixed(2)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!outOfStock) onAddToCart(book);
            }}
            disabled={outOfStock}
            className={`opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg text-sm inline-flex items-center gap-1 cursor-pointer ${
              outOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-forest-700 text-white hover:bg-forest-800"
            }`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-5.98.572L2.25 3m5.25 11.25h9m-9 0a3 3 0 105.98.572M7.5 14.25L5.106 5.272M15.5 14.25a3 3 0 105.98.572m-5.98-.572L17.25 7.5H7.5m0 0l-.394-1.728"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
