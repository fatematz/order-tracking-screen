import { Check, Package, Settings, Truck, MapPin, PackageCheck } from "lucide-react";
import { formatDateTime } from "@/lib/format";
import { STATUS_STEPS, STATUS_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * ProgressTimeline — vertical stepper showing all status steps.
 * Completed steps are colored; future steps are grayed out.
 * Each step shows a timestamp.
 *
 * @param {string[]} completedSteps — array of step keys that are done
 * @param {Array} trackingHistory — full history with step, timestamp, note
 * @param {string} currentStatus — current status key
 * @param {string} [variant] — 'delayed' | 'delivered_not_received' | 'tracking_unavailable' | 'normal' — tweaks card accent colors
 */
const VARIANT_STYLES = {
  delayed: {
    card: "border-amber-200 bg-amber-50/40",
    heading: "text-amber-700",
    connectorCompleted: "bg-amber-400",
    connectorPending: "bg-gray-200",
    currentRing: "ring-amber-100",
  },
  delivered_not_received: {
    card: "border-orange-200 bg-orange-50/40",
    heading: "text-orange-700",
    connectorCompleted: "bg-orange-400",
    connectorPending: "bg-gray-200",
    currentRing: "ring-orange-100",
  },
  tracking_unavailable: {
    card: "border-blue-200 bg-blue-50/40",
    heading: "text-blue-700",
    connectorCompleted: "bg-blue-300",
    connectorPending: "bg-gray-200",
    currentRing: "ring-blue-100",
  },
  normal: {
    card: "border-gray-100 bg-white",
    heading: "text-gray-500",
    connectorCompleted: "bg-green-400",
    connectorPending: "bg-gray-200",
    currentRing: "ring-blue-100",
  },
};

const STEP_ICONS = {
  order_confirmed: Package,
  processing: Settings,
  shipped: Truck,
  out_for_delivery: MapPin,
  delivered: PackageCheck,
};

export default function ProgressTimeline({ completedSteps, trackingHistory, currentStatus, variant = "normal" }) {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.normal;
  // Determine the "current" step index
  const currentIndex = STATUS_INDEX[currentStatus] ?? -1;

  return (
    <ol className={cn("rounded-2xl border p-5 shadow-sm list-none", styles.card)} aria-label="Delivery progress">
      <h3 className={cn("mb-4 text-sm font-semibold uppercase tracking-wide", styles.heading)}>
        {variant === "tracking_unavailable" ? "Tracking Pending" : "Tracking History"}
      </h3>

      <div className="space-y-0">
        {STATUS_STEPS.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const historyItem = trackingHistory?.find((h) => h.step === step.key);
          const stepLabel = step.label;
          const StepIcon = STEP_ICONS[step.key];

          return (
            <li key={step.key} className="relative flex gap-4">
              {/* Connector line (not after the last item) */}
              {index < STATUS_STEPS.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[11px] top-6 w-0.5 self-stretch",
                    isCompleted ? styles.connectorCompleted : styles.connectorPending
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Step icon/dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
                {isCompleted ? (
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full",
                      isCurrent
                        ? "bg-blue-600 text-white ring-4"
                        : "bg-green-500 text-white",
                      isCurrent && styles.currentRing
                    )}
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                ) : StepIcon ? (
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2",
                      variant === "delayed" && "border-amber-200 text-amber-300",
                      variant === "delivered_not_received" && "border-orange-200 text-orange-300",
                      variant === "tracking_unavailable" && "border-blue-200 text-blue-300",
                      variant === "normal" && "border-gray-200 text-gray-300"
                    )}
                    aria-hidden="true"
                  >
                    <StepIcon className="h-3 w-3" />
                  </div>
                ) : (
                  <div className="h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white" aria-hidden="true" />
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 pb-5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCompleted ? "text-gray-900" : "text-gray-400",
                      isCurrent && "font-semibold text-blue-700"
                    )}
                  >
                    {stepLabel}
                  </span>
                  {historyItem?.timestamp && (
                    <span
                      className={cn(
                        "text-xs",
                        isCompleted ? "text-gray-600" : "text-gray-300",
                        isCurrent && "font-medium text-blue-700"
                      )}
                    >
                      {formatDateTime(historyItem.timestamp)}
                    </span>
                  )}
                </div>
                {historyItem?.note && (
                  <p
                    className={cn(
                      "mt-0.5 text-xs",
                      isCompleted ? "text-gray-600" : "text-gray-300"
                    )}
                  >
                    {historyItem.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </div>
    </ol>
  );
}
