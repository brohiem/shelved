import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useCart } from "../../contexts/CartContext";

export default function BookDetailModal({ book, isOpen, onClose }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!book) return null;

  const coverUrl = book.isbn
    ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
    : null;

  const outOfStock = book.stock <= 0;
  const inStock = book.stock > 0;

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
    <Modal isOpen={isOpen} onClose={onClose} title={book.title} size="lg">
      <div className="md:flex gap-8">
        {/* Left: Cover image */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="aspect-[2/3] w-full md:w-64 rounded-lg object-cover bg-parchment"
            />
          ) : (
            <div className="aspect-[2/3] w-full md:w-64 rounded-lg bg-parchment flex items-center justify-center p-4">
              <span className="font-display text-forest-700 text-center text-xl">
                {book.title}
              </span>
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-2xl font-semibold text-forest-900 mb-1">
            {book.title}
          </h2>

          <p className="text-bark-300 mb-3">by {book.author}</p>

          {/* Category badge */}
          {book.category && (
            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-forest-700/10 text-forest-700 mb-4">
              {book.category}
            </span>
          )}

          {/* Description */}
          {book.description && (
            <p className="text-bark-500 leading-relaxed mb-4">
              {book.description}
            </p>
          )}

          {/* ISBN */}
          {book.isbn && (
            <p className="text-sm text-bark-300 mb-4">ISBN: {book.isbn}</p>
          )}

          {/* Price */}
          <p className="text-2xl font-bold text-forest-700 mb-3">
            ${Number(book.price).toFixed(2)}
          </p>

          {/* Stock status */}
          {inStock ? (
            <p className="text-sm text-green-600 font-medium mb-4">
              In Stock ({book.stock} available)
            </p>
          ) : (
            <p className="text-sm text-red-600 font-medium mb-4">
              Out of Stock
            </p>
          )}

          {/* Quantity selector + Add to Cart */}
          {inStock && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-bark-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
                <span className="text-lg font-medium text-forest-900 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= book.stock}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-bark-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
