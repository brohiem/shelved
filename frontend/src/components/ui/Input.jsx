export default function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  id,
  className = "",
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium font-body text-forest-900"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-3 py-2 rounded-lg border font-body
          focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-transparent
          transition-colors
          ${error ? "border-red-500" : "border-gray-300"}
        `}
      />
      {error && (
        <p className="text-sm text-red-500 font-body">{error}</p>
      )}
    </div>
  );
}
