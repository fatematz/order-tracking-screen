import { cn } from "@/lib/utils";

/**
 * Status badge — color + icon + text together (never color alone).
 * Default variant: neutral gray. Use `status` for colored variants.
 */
const STATUS_CONFIG = {
  delivered: {
    color: "bg-green-100 text-green-800 border-green-200",
    iconColor: "text-green-600",
  },
  delayed: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    iconColor: "text-amber-600",
  },
  error: {
    color: "bg-red-100 text-red-800 border-red-200",
    iconColor: "text-red-600",
  },
  warning: {
    color: "bg-orange-100 text-orange-800 border-orange-200",
    iconColor: "text-orange-600",
  },
  info: {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    iconColor: "text-blue-600",
  },
  neutral: {
    color: "bg-gray-100 text-gray-700 border-gray-200",
    iconColor: "text-gray-500",
  },
};

export default function Badge({
  children,
  status = "neutral",
  icon: Icon,
  className,
}) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.neutral;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        config.color,
        className
      )}
      role="status"
      aria-live="polite"
    >
      {Icon && <Icon className={cn("h-3.5 w-3.5", config.iconColor)} />}
      {children}
    </span>
  );
}
