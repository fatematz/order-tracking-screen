import { cn } from "@/lib/utils";

/**
 * Skeleton loader — mimics the real tracking screen layout so the user
 * sees something familiar while waiting for the API.
 */
export default function TrackingSkeleton() {
  return (
    <div className="flex flex-col gap-5 animate-pulse" aria-label="Loading order details">
      {/* Status card skeleton */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          {/* Icon circle */}
          <div className={cn("h-12 w-12 rounded-full skeleton-shimmer")} />
          <div className="flex-1 space-y-2">
            {/* Headline */}
            <div className={cn("h-5 w-3/4 rounded-lg skeleton-shimmer")} />
            {/* Sub message */}
            <div className={cn("h-4 w-1/2 rounded-lg skeleton-shimmer")} />
          </div>
        </div>
      </div>

      {/* ETA banner skeleton */}
      <div className={cn("h-14 rounded-xl skeleton-shimmer")} />

      {/* Progress timeline skeleton */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              {/* Dot */}
              <div className={cn("mt-1.5 h-3 w-3 rounded-full skeleton-shimmer")} />
              {/* Line */}
              <div className="flex-1 space-y-1.5">
                <div className={cn("h-4 w-1/3 rounded-lg skeleton-shimmer")} />
                <div className={cn("h-3 w-2/3 rounded-lg skeleton-shimmer")} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary skeleton */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          {/* Product image */}
          <div className={cn("h-20 w-20 rounded-xl skeleton-shimmer")} />
          <div className="flex-1 space-y-2">
            <div className={cn("h-4 w-3/4 rounded-lg skeleton-shimmer")} />
            <div className={cn("h-4 w-1/4 rounded-lg skeleton-shimmer")} />
          </div>
        </div>
      </div>

      {/* Action button skeleton */}
      <div className={cn("h-12 w-full rounded-xl skeleton-shimmer")} />
    </div>
  );
}
