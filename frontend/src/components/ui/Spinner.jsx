const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function Spinner({ size = "md" }) {
  return (
    <div
      className={`
        animate-spin rounded-full border-2 border-forest-700 border-t-transparent
        ${sizeClasses[size]}
      `}
      role="status"
      aria-label="Loading"
    />
  );
}
