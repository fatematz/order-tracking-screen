// One mock order per scenario so the UI adapts realistically
// All dates are hardcoded so the demo is deterministic

const NOW = new Date("2025-09-24T10:30:00");

// helper — shift date by days
const addDays = (date, days) =>
  new Date(date.getTime() + days * 86400000);
const addHours = (date, hours) =>
  new Date(date.getTime() + hours * 3600000);

export const mockOrders = {
  // ── Scenario A: Normal in-transit ──────────────────────────────
  normal: {
    id: "ORD-2025-0912-0042",
    productName: "iPhone 15 Pro Max 256GB",
    productImage:
      "https://placehold.co/120x120/2563eb/ffffff?text=iPhone+15",
    qty: 1,
    total: "$1,299.00",
    status: "out_for_delivery",
    courier: "SwiftCourier Express",
    currentLocation: "Dhaka Hub, Gulshan-2",
    completedSteps: ["order_confirmed", "processing", "shipped"],
    // Estimated delivery in 1 hour
    eta: addHours(NOW, 1),
    etaLabel: "Today by 11:30 AM",
    deliveryAddress: "House 42, Road 11, Banani, Dhaka-1213",
    paymentMethod: "bKash (Txn: BKS-99887766)",
    trackingHistory: [
      {
        step: "order_confirmed",
        timestamp: addDays(NOW, -3),
        note: "Order placed successfully",
      },
      {
        step: "processing",
        timestamp: addDays(NOW, -2),
        note: "Package is being prepared",
      },
      {
        step: "shipped",
        timestamp: addDays(NOW, -1),
        note: "Package picked up by courier",
      },
      {
        step: "out_for_delivery",
        timestamp: NOW,
        note: "Out for delivery with SwiftCourier Express",
      },
    ],
  },

  // ── Scenario B: Delayed Order ─────────────────────────────────
  delayed: {
    id: "ORD-2025-0908-0187",
    productName: "Sony WH-1000XM5 Headphones",
    productImage:
      "https://placehold.co/120x120/2563eb/ffffff?text=Sony+XM5",
    qty: 1,
    total: "$349.00",
    status: "delayed",
    courier: "SwiftCourier Express",
    currentLocation: "Dhaka Hub, Gulshan-2",
    completedSteps: ["order_confirmed", "processing", "shipped"],
    // ETA was 2 hours ago — now delayed by ~4 hours
    originalEta: addHours(NOW, -2),
    revisedEta: addHours(NOW, 2),
    delayReason:
      "Heavy traffic in Gulshan area due to ongoing construction",
    delayLabel: "Delayed by ~4 hours",
    etaLabel: "Revised delivery: 12:30 PM today",
    deliveryAddress: "Flat 4B, Lake Drive, Mohammadpur, Dhaka-1207",
    paymentMethod: "Credit Card (Visa ending 4242)",
    trackingHistory: [
      {
        step: "order_confirmed",
        timestamp: addDays(NOW, -5),
        note: "Order placed successfully",
      },
      {
        step: "processing",
        timestamp: addDays(NOW, -4),
        note: "Package is being prepared",
      },
      {
        step: "shipped",
        timestamp: addDays(NOW, -1),
        note: "Package picked up by courier",
      },
      {
        step: "out_for_delivery",
        timestamp: addHours(NOW, -4),
        note: "Out for delivery with SwiftCourier Express",
      },
    ],
  },

  // ── Scenario C: Delivered but Not Received ───────────────────
  delivered_not_received: {
    id: "ORD-2025-0905-0061",
    productName: "Samsung Galaxy Watch 6 Classic",
    productImage:
      "https://placehold.co/120x120/2563eb/ffffff?text=Galaxy+Watch",
    qty: 1,
    total: "$429.00",
    status: "delivered_not_received",
    courier: "SwiftCourier Express",
    completedSteps: [
      "order_confirmed",
      "processing",
      "shipped",
      "out_for_delivery",
      "delivered",
    ],
    deliveryTime: addHours(NOW, -3),
    deliveryLocationNote: "Left with building security guard",
    deliveryAddress: "Tower B, 12th Floor, Dhanmondi, Dhaka-1209",
    paymentMethod: "Nagad (Txn: NGD-33445566)",
    trackingHistory: [
      {
        step: "order_confirmed",
        timestamp: addDays(NOW, -7),
        note: "Order placed successfully",
      },
      {
        step: "processing",
        timestamp: addDays(NOW, -6),
        note: "Package is being prepared",
      },
      {
        step: "shipped",
        timestamp: addDays(NOW, -2),
        note: "Package picked up by courier",
      },
      {
        step: "out_for_delivery",
        timestamp: addDays(NOW, -1),
        note: "Out for delivery with SwiftCourier Express",
      },
      {
        step: "delivered",
        timestamp: addHours(NOW, -3),
        note:
          "Delivered — left with building security guard at Tower B",
      },
    ],
  },

  // ── Scenario D: Tracking Not Available ────────────────────────
  tracking_unavailable: {
    id: "ORD-2025-0924-0009",
    productName: "Apple MacBook Air M3 13\"",
    productImage:
      "https://placehold.co/120x120/2563eb/ffffff?text=MacBook+Air",
    qty: 1,
    total: "$1,099.00",
    status: "tracking_unavailable",
    courier: null,
    currentLocation: null,
    completedSteps: ["order_confirmed"],
    dispatchWindowLabel: "Expected dispatch within 24 hours",
    deliveryAddress: "Road 3, Block E, Bashundhara R/A, Dhaka-1229",
    paymentMethod: "Rocket (Txn: RCTK-77889900)",
    trackingHistory: [
      {
        step: "order_confirmed",
        timestamp: NOW,
        note: "Order placed successfully",
      },
    ],
  },

  // ── Scenario E: Loading ───────────────────────────────────────
  loading: {
    id: null,
    productName: null,
    productImage: null,
    qty: null,
    total: null,
    status: "loading",
    courier: null,
    currentLocation: null,
    completedSteps: [],
    eta: null,
    deliveryAddress: null,
    paymentMethod: null,
    trackingHistory: [],
  },

  // ── Scenario F: Error ─────────────────────────────────────────
  error: {
    id: null,
    productName: null,
    productImage: null,
    qty: null,
    total: null,
    status: "error",
    courier: null,
    currentLocation: null,
    completedSteps: [],
    eta: null,
    deliveryAddress: null,
    paymentMethod: null,
    trackingHistory: [],
    errorMessage:
      "We couldn't load your tracking info right now. Please check your connection and try again.",
  },
};
