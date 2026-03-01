import { useState } from "react";
import Modal from "../ui/Modal";
import { useCart } from "../../contexts/CartContext";

export default function BookDetailModal({ book, isOpen, onClose }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!book) return null;

  const coverUrl = book.isbn
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
    : null;

  const outOfStock = book.stock <= 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(book);
    }
    setQuantity(1);
    onClose();
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(book.stock, prev + 1));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Cover image */}
        <div>
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="w-full rounded-xl bg-light-bg object-cover"
            />
          ) : (
            <div className="w-full aspect-[3/4] rounded-xl bg-light-bg flex items-center justify-center">
              <svg
                className="w-20 h-20 text-border"
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
        </div>

        {/* Right column - Details */}
        <div>
          {/* Category badge */}
          {book.category && (
            <span className="bg-primary-light text-primary-dark inline-block px-3 py-1 rounded-full text-sm">
              {book.category}
            </span>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-dark mt-2">{book.title}</h2>

          {/* Author */}
          <p className="text-body text-lg mt-1">by {book.author}</p>

          {/* Star rating placeholder */}
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-dark mt-4">
            ${Number(book.price).toFixed(2)}
          </p>

          {/* Divider */}
          <div className="border-t border-border my-4" />

          {/* Description */}
          {book.description && (
            <p className="text-body leading-relaxed">{book.description}</p>
          )}

          {/* Stock info */}
          <div className="mt-4">
            {outOfStock ? (
              <span className="inline-block bg-danger/10 text-danger text-sm font-medium px-3 py-1 rounded-full">
                Out of Stock
              </span>
            ) : (
              <span className="inline-block bg-success/10 text-success text-sm font-medium px-3 py-1 rounded-full">
                In Stock
              </span>
            )}
          </div>

          {/* Quantity selector */}
          {!outOfStock && (
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-light-bg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              </button>
              <span className="w-12 text-center font-semibold text-dark">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= book.stock}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-light-bg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="bg-primary text-dark font-semibold px-8 py-3 rounded-full hover:bg-primary-dark w-full mt-4 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* ISBN info */}
          {book.isbn && (
            <p className="text-sm text-body mt-4">ISBN: {book.isbn}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
