import { Clock, AlertTriangle, Phone, MessageCircle } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/**
 * DelayNotice — shown for delayed orders.
 * Clearly communicates the delay, revised ETA, and next steps.
 *
 * @param {object} order — order with delay info
 * @param {function} onContactSupport — opens ContactSupportSheet
 * @param {function} onGetNotified — called when user taps "Get Notified"
 */
export default function DelayNotice({ order, onContactSupport, onGetNotified }) {
  if (!order) return null;

  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 shadow-sm" role="alert">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-amber-900">Delivery Delayed</h3>
            <Badge status="warning">{order.delayLabel || "Delayed"}</Badge>
          </div>
          {order.delayReason && (
            <p className="mt-1 text-sm text-amber-700">{order.delayReason}</p>
          )}
        </div>
      </div>

      {/* Timing info */}
      <div className="mt-4 space-y-2 rounded-lg bg-white/60 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-amber-700">Original ETA</span>
          <span className="font-medium text-amber-900 line-through">
            {order.originalEta ? formatDateTime(order.originalEta) : "—"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-amber-700">Revised ETA</span>
          <span className="font-bold text-amber-900">{order.etaLabel || "—"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" onClick={onContactSupport} className="flex-1">
          <Phone className="h-4 w-4" />
          Contact Support
        </Button>
        <Button variant="ghost" onClick={onGetNotified} className="flex-1">
          <MessageCircle className="h-4 w-4" />
          Get Notified
        </Button>
      </div>
    </div>
  );
}
