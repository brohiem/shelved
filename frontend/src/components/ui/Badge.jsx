export default function Badge({ count, className = "" }) {
  if (!count) return null;

  return (
    <span
      className={`
        bg-amber-500 text-white text-xs font-bold
        min-w-[1.25rem] h-5 flex items-center justify-center rounded-full
        px-1
        ${className}
      `}
    >
      {count}
    </span>
  );
}
