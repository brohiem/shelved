export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { book, quantity } = item;
  const lineTotal = (book.price * quantity).toFixed(2);
  const coverUrl = book.isbn
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
    : null;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      {/* Cover thumbnail */}
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.title}
          className="w-16 h-20 rounded object-cover bg-parchment"
        />
      ) : (
        <div className="w-16 h-20 rounded bg-parchment flex items-center justify-center">
          <svg
            className="h-8 w-8 text-bark-300"
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
        </div>
      )}

      {/* Info column */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-forest-900 truncate">{book.title}</p>
        <p className="text-sm text-bark-300">{book.author}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(book.id, quantity - 1)}
          className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-forest-900 transition-colors cursor-pointer"
          aria-label="Decrease quantity"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <span className="w-6 text-center text-sm font-medium text-forest-900">
          {quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(book.id, quantity + 1)}
          className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-forest-900 transition-colors cursor-pointer"
          aria-label="Increase quantity"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Line total */}
      <span className="font-semibold text-forest-700 w-16 text-right">
        ${lineTotal}
      </span>

      {/* Remove button */}
      <button
        onClick={() => onRemove(book.id)}
        className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
        aria-label="Remove item"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
