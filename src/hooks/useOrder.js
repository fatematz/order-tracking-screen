import { useState, useEffect, useCallback } from "react";
import { getOrder } from "@/lib/get-order";

/**
 * Custom hook to fetch and manage order tracking state.
 *
 * @param {object} options
 * @param {string} options.scenario  — which mock scenario to load
 * @param {boolean} options.autoFetch — fetch immediately on mount (default: true)
 * @returns {object} { data, loading, error, refetch, setScenario }
 */
export function useOrder({ scenario = "normal", autoFetch = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const [currentScenario, setCurrentScenario] = useState(scenario);

  const fetchOrder = useCallback(async (scenarioOverride) => {
    const key = scenarioOverride || currentScenario;
    // Skip async fetch for "loading" scenario — show skeleton immediately
    if (key === "loading") {
      setData(null);
      setLoading(true);
      setError(null);
      return;
    }
    // Skip async fetch for "error" scenario — show friendly error immediately
    if (key === "error") {
      const { mockOrders } = await import("../lib/mock-data.js");
      setData(null);
      setLoading(false);
      setError({ message: mockOrders.error.errorMessage || "Failed to load order." });
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error } = await getOrder({ scenario: key });
    setData(data);
    setError(error);
    setLoading(false);
  }, [currentScenario]);

  // Fetch on mount and when scenario changes
  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScenario]);

  // Allow parent to switch scenarios without remounting the hook
  const switchScenario = useCallback((newScenario) => {
    setCurrentScenario(newScenario);
  }, []);

  return { data, loading, error, refetch: fetchOrder, setScenario: switchScenario, currentScenario };
}
