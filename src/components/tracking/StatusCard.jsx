import { Package, Truck, AlertTriangle, PackageCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StatusCard — prominent current-status card at the top.
 * Shows icon + plain-language headline + sub-message.
 * Color + icon + text together (never color alone).
 *
 * @param {string} status — current order status
 * @param {string} headline — main status text
 * @param {string} subMessage — supporting text
 * @param {ReactNode} customIcon — optional override icon
 */
const STATUS_CONFIG = {
  order_confirmed: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    headlineColor: "text-blue-900",
    subColor: "text-blue-700/80",
    Icon: Package,
  },
  processing: {
    bg: "bg-gray-50",
    border: "border-gray-100",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
    headlineColor: "text-gray-900",
    subColor: "text-gray-600",
    Icon: Package,
  },
  shipped: {
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    headlineColor: "text-indigo-900",
    subColor: "text-indigo-700/80",
    Icon: Truck,
  },
  out_for_delivery: {
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    headlineColor: "text-green-900",
    subColor: "text-green-700/80",
    Icon: Truck,
  },
  delivered: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    headlineColor: "text-emerald-900",
    subColor: "text-emerald-700/80",
    Icon: PackageCheck,
  },
  delayed: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    headlineColor: "text-amber-900",
    subColor: "text-amber-700/80",
    Icon: AlertTriangle,
  },
  delivered_not_received: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    headlineColor: "text-orange-900",
    subColor: "text-orange-700/80",
    Icon: AlertTriangle,
  },
  tracking_unavailable: {
    bg: "bg-gray-50",
    border: "border-gray-100",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    headlineColor: "text-gray-900",
    subColor: "text-gray-600",
    Icon: Clock,
  },
};

export default function StatusCard({ status, headline, subMessage, customIcon }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.processing;
  const Icon = customIcon || config.Icon;

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl border p-5 shadow-sm",
        config.bg,
        config.border
      )}
      role="status"
      aria-live="polite"
      aria-label={`Order status: ${headline}`}
    >
      {/* Icon circle */}
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
          config.iconBg
        )}
        aria-hidden="true"
      >
        <Icon className={cn("h-6 w-6", config.iconColor)} />
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <h2 className={cn("text-lg font-bold leading-tight", config.headlineColor)}>
          {headline}
        </h2>
        {subMessage && (
          <p className={cn("mt-1 text-sm leading-relaxed", config.subColor)}>
            {subMessage}
          </p>
        )}
      </div>
    </div>
  );
}
