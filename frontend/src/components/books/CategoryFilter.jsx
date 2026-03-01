export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onCategoryChange(null)}
        className={`
          px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap
          ${activeCategory === null
            ? "bg-primary text-dark shadow-sm"
            : "bg-light-bg text-body hover:bg-primary-light hover:text-dark"
          }
        `}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap
            ${activeCategory === category
              ? "bg-primary text-dark shadow-sm"
              : "bg-light-bg text-body hover:bg-primary-light hover:text-dark"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
