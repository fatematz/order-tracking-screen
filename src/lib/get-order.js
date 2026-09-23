/**
 * Simulates an async API call with configurable delay and optional error.
 * Mirrors a real fetch: returns { data, error } in a consistent shape.
 */
const DEFAULT_DELAY_MS = 1200; // 1.2 seconds — enough to show skeleton

export async function getOrder({ scenario = "normal", simulateError = false }) {
  // Dynamic import avoids circular deps between this file and mock-data
  const { mockOrders } = await import("./mock-data.js");

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, DEFAULT_DELAY_MS));

  // Simulate an error response (e.g., 500)
  if (simulateError) {
    return {
      data: null,
      error: {
        message: "Network error. Please try again.",
        statusCode: 500,
      },
    };
  }

  const data = mockOrders[scenario];
  if (!data) {
    return { data: null, error: { message: "Scenario not found.", statusCode: 404 } };
  }

  return { data, error: null };
}
