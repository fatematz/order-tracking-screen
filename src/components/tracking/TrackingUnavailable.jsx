import { Package, Bell, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/**
 * TrackingUnavailable — shown when order exists but no tracking info yet.
 * Friendly "being prepared" state with what to expect.
 * Must NOT look empty or broken.
 *
 * @param {object} order — order with basic info
 * @param {function} onNotifyMe — subscribe to notifications
 */
export default function TrackingUnavailable({ order, onNotifyMe }) {
  if (!order) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Order confirmed badge */}
      <div className="flex items-center justify-between">
        <Badge status="info">
          <Package className="h-3.5 w-3.5" />
          Order Confirmed
        </Badge>
        <span className="text-xs text-gray-500">{order.id}</span>
      </div>

      {/* Product summary */}
      <div className="mt-4 flex gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-linear-to-br from-blue-50 to-indigo-50">
          {order.productImage ? (
            <img
              src={order.productImage}
              alt={order.productName || "Product"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-6 w-6 text-blue-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
            {order.productName || "Product"}
          </h3>
          <p className="mt-1 text-sm font-medium text-blue-600">{order.total || "—"}</p>
        </div>
      </div>

      {/* Dispatch window */}
      {order.dispatchWindowLabel && (
        <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-900">What's next:</span>{" "}
            {order.dispatchWindowLabel}
          </p>
        </div>
      )}

      {/* Delivery address */}
      {order.deliveryAddress && (
        <div className="mt-3 text-xs text-gray-500">
          Delivering to: {order.deliveryAddress}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4">
        <Button variant="primary" onClick={onNotifyMe} className="w-full">
          <Bell className="h-4 w-4" />
          Notify Me
        </Button>
      </div>
    </div>
  );
}
