"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";
import { SCENARIOS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * ScenarioSwitcher — demo tool to toggle between scenarios.
 * Collapsed by default as a small gear button; expands into a compact panel.
 * Always visible (not hidden in production).
 *
 * @param {string} currentScenario — currently active scenario id
 * @param {function} onScenarioChange — called when user selects a scenario
 */
export default function ScenarioSwitcher({ currentScenario, onScenarioChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2">
      {/* Expanded panel */}
      {open && (
        <div className="mb-2 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
          <p className="mb-1.5 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Demo: Scenario
          </p>
          <div className="flex flex-col gap-0.5">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  onScenarioChange(scenario.id);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                  currentScenario === scenario.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {scenario.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg",
          "border border-gray-200 text-gray-600 hover:text-gray-900",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        )}
        aria-label="Toggle scenario switcher"
        title="Demo: Scenario Switcher"
      >
        <Settings2 className="h-5 w-5" />
      </button>
    </div>
  );
}
