import { useState, useEffect } from "react";
import HeroSection from "../components/books/HeroSection";
import SearchBar from "../components/books/SearchBar";
import CategoryFilter from "../components/books/CategoryFilter";
import BookGrid from "../components/books/BookGrid";
import BookDetailModal from "../components/books/BookDetailModal";
import { useBooks } from "../hooks/useBooks";
import { useCart } from "../contexts/CartContext";

const CATEGORIES = ["Technology", "Sci-Fi", "Psychology", "History"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const { addItem } = useCart();

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { books, loading } = useBooks({
    search: debouncedSearch,
    category: category || "",
  });

  return (
    <>
      <HeroSection />

      <section id="book-grid" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-dark">Our Books</h2>
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={category}
              onCategoryChange={setCategory}
            />
          </div>

          {/* Search bar */}
          <div className="mb-8">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Book grid */}
          <BookGrid
            books={books}
            loading={loading}
            onBookClick={setSelectedBook}
            onAddToCart={addItem}
          />
        </div>
      </section>

      {/* Book detail modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
}
