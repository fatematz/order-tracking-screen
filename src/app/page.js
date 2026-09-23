"use client";

import { useState } from "react";
import OrderTrackingScreen from "@/components/tracking/OrderTrackingScreen";
import ScenarioSwitcher from "@/components/dev/ScenarioSwitcher";

/**
 * Main page — renders the OrderTrackingScreen with the Demo ScenarioSwitcher.
 * Scenario state lives here so both the screen and the switcher share it.
 */
export default function Home() {
  const [scenario, setScenario] = useState("normal");

  const handleResetScenario = () => setScenario("normal");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile-width container — centered on desktop */}
      <div className="mx-auto max-w-107.5 px-4 py-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Track Order</h1>
          <p className="mt-1 text-sm text-gray-500">
            Order #ORD-2025-0912-0042
          </p>
        </header>

        {/* Main tracking screen — key forces remount on scenario change */}
        <main>
          <OrderTrackingScreen
            key={scenario}
            scenario={scenario}
            onResetScenario={handleResetScenario}
          />
        </main>
      </div>

      {/* Demo scenario switcher — always visible, collapsed by default */}
      <ScenarioSwitcher
        currentScenario={scenario}
        onScenarioChange={setScenario}
      />
    </div>
  );
}
