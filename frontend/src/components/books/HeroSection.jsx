export default function HeroSection() {
  const scrollToGrid = () => {
    const el = document.getElementById("book-grid");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-gradient-to-r from-forest-900 to-forest-700 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Decorative book icon */}
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-amber-400"
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

        <h1 className="text-4xl md:text-6xl font-display text-white mb-4">
          Your Next Great Read Awaits
        </h1>

        <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Discover handpicked books across every genre
        </p>

        <button
          onClick={scrollToGrid}
          className="inline-flex items-center gap-2 bg-amber-400 text-forest-900 px-8 py-3 rounded-lg font-body font-semibold text-lg hover:bg-amber-500 transition-colors duration-200 cursor-pointer"
        >
          Browse Collection
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
