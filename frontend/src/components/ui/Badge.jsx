const variantClasses = {
  count:
    "bg-primary text-dark text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1",
  tag: "bg-primary-light text-primary-dark text-xs px-2 py-0.5 rounded-full font-medium",
  status:
    "text-xs font-semibold px-2.5 py-0.5 rounded-full",
};

const statusColors = {
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-info",
  warning: "bg-primary-light text-primary-dark",
};

export default function Badge({
  children,
  count,
  variant = "count",
  status = "info",
  className = "",
}) {
  if (variant === "count") {
    if (!count) return null;
    return (
      <span className={`${variantClasses.count} ${className}`}>{count}</span>
    );
  }

  if (variant === "status") {
    return (
      <span
        className={`${variantClasses.status} ${statusColors[status] || statusColors.info} ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={`${variantClasses.tag} ${className}`}>{children}</span>
  );
}
