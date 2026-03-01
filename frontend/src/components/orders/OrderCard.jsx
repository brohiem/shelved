import { useState } from "react";

const statusColors = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
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

  const statusClass = statusColors[order.status] || "bg-gray-100 text-gray-700";

  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Collapsed header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-medium text-forest-900">
            Order #{order.id}
          </span>
          <span className="text-sm text-bark-300">
            {formatDate(order.created_at)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-semibold text-forest-700">
            ${Number(order.total).toFixed(2)}
          </span>

          {/* Status badge */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusClass}`}
          >
            {order.status}
          </span>

          {/* Chevron */}
          <svg
            className={`h-5 w-5 text-bark-300 transition-transform duration-200 ${
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

      {/* Expanded line items */}
      {expanded && order.items && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-bark-300">
                <th className="pb-2 font-medium">Title</th>
                <th className="pb-2 font-medium">Author</th>
                <th className="pb-2 font-medium text-center">Qty</th>
                <th className="pb-2 font-medium text-right">Price</th>
                <th className="pb-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-t border-gray-50">
                  <td className="py-2 text-forest-900">{item.title}</td>
                  <td className="py-2 text-bark-300">{item.author}</td>
                  <td className="py-2 text-center text-forest-900">
                    {item.quantity}
                  </td>
                  <td className="py-2 text-right text-bark-300">
                    ${Number(item.price).toFixed(2)}
                  </td>
                  <td className="py-2 text-right font-medium text-forest-700">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
