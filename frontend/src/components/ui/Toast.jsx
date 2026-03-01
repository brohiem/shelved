import { useToast } from "../../contexts/ToastContext";

const barColors = {
  success: "bg-success",
  error: "bg-danger",
  info: "bg-primary",
};

const icons = {
  success: (
    <svg
      className="h-5 w-5 text-success"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5 text-danger"
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
  ),
  info: (
    <svg
      className="h-5 w-5 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
      />
    </svg>
  ),
};

function ToastItem({ toast, onDismiss }) {
  return (
    <div
      className="
        flex items-stretch bg-white rounded-xl shadow-lg border border-border
        animate-slide-up overflow-hidden
      "
    >
      {/* Left color bar */}
      <div
        className={`w-[3px] shrink-0 ${barColors[toast.type] || barColors.info}`}
      />

      <div className="flex items-center gap-3 p-4 flex-1 min-w-0">
        <span className="shrink-0">{icons[toast.type] || icons.info}</span>
        <p className="flex-1 text-sm text-dark">{toast.message}</p>
        <button
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 text-body hover:text-dark transition-colors cursor-pointer"
          aria-label="Dismiss toast"
        >
          <svg
            className="h-4 w-4"
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
      </div>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
}
