import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * Error state — shown when the API call fails.
 * Provides a clear message and a retry button.
 *
 * @param {string} message — error message to display
 * @param {function} onRetry — called when user taps retry
 */
export default function ErrorState({ message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-8 text-center"
      role="alert"
      aria-live="assertive"
    >
      {/* Error icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-7 w-7 text-red-600" aria-hidden="true" />
      </div>

      {/* Message */}
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-gray-900">
          Something went wrong
        </h3>
        <p className="text-sm text-gray-600">{message || "We couldn't load your tracking info."}</p>
      </div>

      {/* Retry button */}
      <Button variant="outline" onClick={onRetry} className="mt-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
