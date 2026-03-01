import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    required = false,
    id,
    className = "",
    ...rest
  },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-dark mb-1"
        >
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-3 rounded-lg border font-body text-dark
          placeholder:text-body/50
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          transition-all duration-200
          ${error ? "border-danger" : "border-border"}
        `}
        {...rest}
      />
      {error && <p className="text-sm text-danger mt-0.5">{error}</p>}
    </div>
  );
});

export default Input;
