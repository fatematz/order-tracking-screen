import { Package } from "lucide-react";

/**
 * Empty state — shown when there is no data to display
 * (fallback; shouldn't normally be reached with our mock data).
 */
export default function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <Package className="h-7 w-7 text-gray-400" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-gray-700">
          No tracking info yet
        </h3>
        <p className="text-sm text-gray-500">
          Your order details will appear here soon.
        </p>
      </div>
    </div>
  );
}
