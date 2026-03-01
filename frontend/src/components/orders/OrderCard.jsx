import { useState } from "react";

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  confirmed: "bg-blue-50 text-blue-600 border border-blue-200",
  shipped: "bg-purple-50 text-purple-600 border border-purple-200",
  delivered: "bg-green-50 text-green-600 border border-green-200",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const statusClass =
    statusStyles[order.status] || "bg-gray-50 text-gray-600 border border-gray-200";

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      {/* Header row */}
      <div
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-light-bg/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <span className="font-semibold text-dark">Order #{order.id}</span>
          <span className="text-sm text-body">
            {formatDate(order.created_at)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-bold text-dark">
            ${Number(order.total).toFixed(2)}
          </span>

          {/* Status badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusClass}`}
          >
            {order.status}
          </span>

          {/* Chevron */}
          <svg
            className={`w-5 h-5 text-body transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Expanded section */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {order.items && (
          <div className="bg-light-bg p-4">
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-dark font-medium">{item.title}</span>
                    {item.author && (
                      <span className="text-body ml-2">by {item.author}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 ml-4">
                    <span className="text-body">x{item.quantity}</span>
                    <span className="text-body w-20 text-right">
                      ${Number(item.price).toFixed(2)}
                    </span>
                    <span className="text-dark font-medium w-20 text-right">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
