import { useState, useEffect, useRef } from "react";

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value || "");
  const timerRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue("");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onChange("");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative max-w-xl">
      {/* Search icon */}
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 text-body w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Search books by title or author..."
        className="w-full pl-12 pr-10 py-3 rounded-full bg-light-bg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
      />

      {/* Clear button */}
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-body hover:text-dark transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
