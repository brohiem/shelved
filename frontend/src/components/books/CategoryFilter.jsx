export default function CategoryFilter({
  categories = [],
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
          activeCategory === null
            ? "bg-forest-700 text-white shadow-md"
            : "bg-white text-bark-500 border border-gray-200 hover:border-forest-600 hover:text-forest-700"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
            activeCategory === cat
              ? "bg-forest-700 text-white shadow-md"
              : "bg-white text-bark-500 border border-gray-200 hover:border-forest-600 hover:text-forest-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
