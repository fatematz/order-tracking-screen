// Order status lifecycle steps — plain English for stepper + screen readers
export const STATUS_STEPS = [
  { key: "order_confirmed", label: "Order Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

// Map each status step (and special statuses) to its index (0-based)
// so we know which steps are completed in the timeline.
// Special statuses: delivered_not_received ≡ delivered (all steps done),
// tracking_unavailable ≡ order_confirmed (first step only).
export const STATUS_INDEX = Object.fromEntries(
  STATUS_STEPS.map((s, i) => [s.key, i])
);
STATUS_INDEX.delivered_not_received = STATUS_INDEX.delivered;
STATUS_INDEX.tracking_unavailable = STATUS_INDEX.order_confirmed;

// Scenario names for the dev switcher
export const SCENARIOS = [
  { id: "normal", label: "Normal (Out for Delivery)" },
  { id: "delayed", label: "Delayed Order" },
  { id: "delivered_not_received", label: "Delivered but Not Received" },
  { id: "tracking_unavailable", label: "Tracking Not Available" },
  { id: "loading", label: "Loading" },
  { id: "error", label: "Error" },
];

// Scenario → display status mapping
export const SCENARIO_STATUS = {
  normal: "out_for_delivery",
  delayed: "delayed",
  delivered_not_received: "delivered_not_received",
  tracking_unavailable: "tracking_unavailable",
  loading: "loading",
  error: "error",
};
