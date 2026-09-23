import { CheckCircle, AlertTriangle, Home, Phone, MessageSquare } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/**
 * DeliveredNotReceived — shown when the system says delivered
 * but the customer hasn't received the package.
 * Empathetic tone, delivery proof info, and clear actions.
 *
 * @param {object} order — order with delivery info
 * @param {function} onReportIssue — opens ReportIssueSheet
 * @param {function} onContactSupport — opens ContactSupportSheet
 */
export default function DeliveredNotReceived({ order, onReportIssue, onContactSupport }) {
  if (!order) return null;

  return (
    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 shadow-sm" role="alert">
      {/* Header with empathetic tone */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-orange-900">
            We marked this as delivered — but you haven't received it?
          </h3>
          <p className="mt-1 text-sm text-orange-700">
            We're sorry to hear that. Let us help you right away.
          </p>
        </div>
      </div>

      {/* Delivery proof info */}
      {order.deliveryTime && (
        <div className="mt-4 space-y-2 rounded-lg bg-white/60 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-orange-700">Delivered at</span>
            <span className="font-medium text-orange-900">
              {formatDateTime(order.deliveryTime)}
            </span>
          </div>
          {order.deliveryLocationNote && (
            <div className="flex items-start gap-2 text-sm">
              <Home className="mt-0.5 h-4 w-4 text-orange-500 shrink-0" />
              <span className="text-orange-700">Location note:</span>
              <span className="font-medium text-orange-900">{order.deliveryLocationNote}</span>
            </div>
          )}
          <Badge status="info" className="mt-1">
            <CheckCircle className="h-3.5 w-3.5" />
            Delivery confirmed by courier
          </Badge>
        </div>
      )}

      {/* Helpful tips */}
      <div className="mt-4 rounded-lg border border-orange-200 bg-white/40 p-3">
        <p className="text-xs font-medium text-orange-800">Before reporting:</p>
        <ul className="mt-1 space-y-1 text-xs text-orange-700">
          <li>• Check with neighbors or building security</li>
          <li>• Look for a delivery notice card</li>
          <li>• Check your delivery address is correct</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button variant="primary" onClick={onReportIssue} className="flex-1">
          <MessageSquare className="h-4 w-4" />
          Report Issue
        </Button>
        <Button variant="outline" onClick={onContactSupport} className="flex-1">
          <Phone className="h-4 w-4" />
          Contact Support
        </Button>
      </div>
    </div>
  );
}
