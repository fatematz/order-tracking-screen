import { Package, MapPin, CreditCard, Truck, Copy, Check } from "lucide-react";
import { useState } from "react";
import { formatDateTime } from "@/lib/format";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";

/**
 * OrderDetailsSheet — shows full order details in a bottom sheet.
 * Items, address, payment, courier info.
 *
 * @param {boolean} open — controlled open/close
 * @param {function} onClose — close callback
 * @param {object} order — order data
 */
export default function OrderDetailsSheet({ open, onClose, order }) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const copyOrderId = () => {
    if (order.id) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Order Details">
      <div className="space-y-5">
        {/* Order ID */}
        {order.id && (
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="text-sm font-semibold text-gray-900">{order.id}</p>
            </div>
            <button
              onClick={copyOrderId}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {/* Product item */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Item</h4>
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-linear-to-br from-blue-50 to-indigo-50">
              {order.productImage ? (
                <img src={order.productImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{order.productName}</p>
              <p className="mt-0.5 text-sm text-gray-500">Qty: {order.qty}</p>
              <p className="mt-0.5 text-sm font-semibold text-blue-600">{order.total}</p>
            </div>
          </div>
        </div>

        {/* Delivery address */}
        {order.deliveryAddress && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Delivery Address</h4>
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gray-400 shrink-0" />
              <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
            </div>
          </div>
        )}

        {/* Payment method */}
        {order.paymentMethod && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Payment</h4>
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
              <CreditCard className="mt-0.5 h-4 w-4 text-gray-400 shrink-0" />
              <p className="text-sm text-gray-700">{order.paymentMethod}</p>
            </div>
          </div>
        )}

        {/* Courier info */}
        {order.courier && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Courier</h4>
            <div className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
              <Truck className="mt-0.5 h-4 w-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{order.courier}</p>
                {order.currentLocation && (
                  <p className="mt-0.5 text-xs text-gray-500">{order.currentLocation}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tracking history */}
        {order.trackingHistory?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Tracking History</h4>
            <div className="space-y-2">
              {order.trackingHistory.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.note}</p>
                    {item.timestamp && (
                      <p className="mt-0.5 text-xs text-gray-500">{formatDateTime(item.timestamp)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close button */}
        <Button variant="secondary" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </BottomSheet>
  );
}
