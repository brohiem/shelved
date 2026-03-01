// ISBNs from seed data for decorative book covers
const HERO_ISBNS = ["9780441013593", "9780593135204", "9780062316110"];

export default function HeroSection() {
  const scrollToGrid = () => {
    const el = document.getElementById("book-grid");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side: Text content */}
          <div>
            {/* Badge */}
            <span className="inline-block bg-primary-light text-primary-dark px-4 py-1 rounded-full text-sm font-medium mb-6">
              Best Book Collection
            </span>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-dark leading-tight mb-4">
              Discover Your
              <br />
              Next Great Read
            </h1>

            {/* Subtitle */}
            <p className="text-body text-lg mt-4 mb-8 max-w-lg leading-relaxed">
              Browse our curated collection of bestsellers, classics, and hidden
              gems. From sci-fi to psychology, find your perfect book.
            </p>

            {/* CTA Button */}
            <button
              onClick={scrollToGrid}
              className="inline-flex items-center gap-2 bg-primary text-dark font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Shop Now
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
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-8 text-sm text-body">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <svg
                    className="w-4 h-4 text-primary-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </span>
                <span className="font-medium text-dark">6+ Books</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <svg
                    className="w-4 h-4 text-primary-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                    />
                  </svg>
                </span>
                <span className="font-medium text-dark">4 Categories</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <svg
                    className="w-4 h-4 text-primary-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </span>
                <span className="font-medium text-dark">Free Shipping</span>
              </div>
            </div>
          </div>

          {/* Right side: Decorative book covers */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-80 h-96">
              {/* Book 1 - back left */}
              <div className="absolute top-8 left-0 w-48 h-72 rounded-lg shadow-xl overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${HERO_ISBNS[0]}-L.jpg`}
                  alt="Featured book"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book 2 - middle front */}
              <div className="absolute top-0 left-16 w-48 h-72 rounded-lg shadow-2xl overflow-hidden z-10 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${HERO_ISBNS[1]}-L.jpg`}
                  alt="Featured book"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book 3 - back right */}
              <div className="absolute top-12 right-0 w-48 h-72 rounded-lg shadow-xl overflow-hidden transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${HERO_ISBNS[2]}-L.jpg`}
                  alt="Featured book"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative yellow circle */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-primary/20 -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
