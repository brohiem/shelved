export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { book, quantity } = item;
  const lineTotal = (book.price * quantity).toFixed(2);
  const coverUrl = book.isbn
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
    : null;

  return (
    <div className="flex gap-4 py-4">
      {/* Cover image */}
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={book.title}
          className="w-20 h-24 rounded-lg object-cover bg-light-bg flex-shrink-0"
        />
      ) : (
        <div className="w-20 h-24 rounded-lg bg-light-bg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-8 h-8 text-border"
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

      {/* Middle - info */}
      <div className="flex-1 min-w-0">
        <p className="text-dark font-medium text-sm line-clamp-1">
          {book.title}
        </p>
        <p className="text-body text-xs mt-0.5">{book.author}</p>
        <p className="text-primary-dark font-semibold text-sm mt-1">
          ${Number(book.price).toFixed(2)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(book.id, quantity - 1)}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-light-bg transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 12H4"
              />
            </svg>
          </button>
          <span className="text-sm font-medium w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(book.id, quantity + 1)}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-light-bg transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right - total and remove */}
      <div className="flex flex-col items-end">
        <span className="font-semibold text-dark text-sm">${lineTotal}</span>
        <button
          onClick={() => onRemove(book.id)}
          className="text-xs text-danger hover:underline mt-1 cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
