import { Package, MapPin, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * OrderSummaryCard — compact product + order summary.
 * Shows product image, name, qty, order ID, total,
 * and a "View order details" action button.
 *
 * @param {object} order — order data object
 * @param {function} onViewDetails — called when user taps "View order details"
 */
export default function OrderSummaryCard({ order, onViewDetails }) {
  if (!order) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Product row */}
      <div className="flex gap-4">
        {/* Product image */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-linear-to-br from-blue-50 to-indigo-50">
          {order.productImage ? (
            <img
              src={order.productImage}
              alt={order.productName || "Product"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
            {order.productName || "Product"}
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-700">
            Qty: {order.qty ?? 0}
          </p>
          <p className="mt-0.5 text-base font-bold text-blue-600">
            {order.total || "—"}
          </p>
        </div>
      </div>

      {/* Order meta */}
      <div className="mt-4 space-y-2 border-t border-gray-50 pt-4">
        {/* Order ID */}
        {order.id && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 shrink-0">Order ID</span>
            <span className="font-medium text-gray-900">{order.id}</span>
          </div>
        )}

        {/* Courier */}
        {order.courier && (
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-gray-400 shrink-0" />
            <span className="text-gray-500">Courier:</span>
            <span className="font-medium text-gray-900">{order.courier}</span>
          </div>
        )}

        {/* Current location */}
        {order.currentLocation && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
            <span className="text-gray-500">Current location:</span>
            <span className="font-medium text-gray-900">{order.currentLocation}</span>
          </div>
        )}
      </div>

      {/* View details button */}
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className={cn(
            "mt-4 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-medium",
            "text-gray-700 hover:bg-gray-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          )}
        >
          View order details
        </button>
      )}
    </div>
  );
}
