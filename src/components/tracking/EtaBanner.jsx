import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * EtaBanner — shows estimated delivery date/time.
 * Variants: normal | delayed | info
 *
 * @param {string} label — ETA text (e.g., "Today by 11:30 AM")
 * @param {string} variant — color variant
 * @param {string} icon — which icon to show
 */
export default function EtaBanner({ label, variant = "normal", icon }) {
  const config = {
    normal: {
      bg: "bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
      textColor: "text-blue-900",
      subColor: "text-blue-700/80",
      Icon: Clock,
    },
    delayed: {
      bg: "bg-amber-50 border-amber-100",
      iconColor: "text-amber-600",
      textColor: "text-amber-900",
      subColor: "text-amber-700/80",
      Icon: AlertTriangle,
    },
    info: {
      bg: "bg-gray-50 border-gray-100",
      iconColor: "text-gray-500",
      textColor: "text-gray-900",
      subColor: "text-gray-600",
      Icon: Calendar,
    },
  };

  const c = config[variant] || config.normal;
  const Icon = icon || c.Icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3",
        c.bg
      )}
      role="status"
      aria-live="polite"
    >
      <Icon className={cn("h-5 w-5 shrink-0", c.iconColor)} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-semibold", c.textColor)}>{label}</p>
        {variant === "delayed" && (
          <p className={cn("text-xs", c.subColor)}>We apologize for the inconvenience</p>
        )}
      </div>
    </div>
  );
}
