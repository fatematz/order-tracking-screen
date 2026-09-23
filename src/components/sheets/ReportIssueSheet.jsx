"use client";

import { useState } from "react";
import { AlertTriangle, Send, CheckCircle } from "lucide-react";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/**
 * ReportIssueSheet — simple form flow for reporting delivery issues.
 * Step 1: Reason select
 * Step 2: Note textarea
 * Step 3: Submit + success confirmation
 *
 * @param {boolean} open — controlled open/close
 * @param {function} onClose — close callback
 * @param {string} initialReason — optional preset reason (jumps to step 2)
 */
const REASONS = [
  { value: "not_received", label: "I haven't received my order" },
  { value: "wrong_item", label: "Wrong item received" },
  { value: "damaged", label: "Item is damaged" },
  { value: "missing_parts", label: "Missing parts or accessories" },
  { value: "other", label: "Other issue" },
];

export default function ReportIssueSheet({ open, onClose, initialReason }) {
  const [step, setStep] = useState(initialReason ? 2 : 1); // 1 | 2 | 3
  const [reason, setReason] = useState(initialReason || "");
  const [note, setNote] = useState("");

  const reset = () => {
    setStep(initialReason ? 2 : 1);
    setReason(initialReason || "");
    setNote("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    // Simulate submit — in real app this would call an API
    setStep(3);
  };

  return (
    <BottomSheet open={open} onClose={handleClose} title="Report a Delivery Issue">
      <div className="space-y-5">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                s === step ? "bg-blue-600" : s < step ? "bg-green-500" : "bg-gray-200"
              )}
            />
          ))}
        </div>

        {/* Step 1: Select reason */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">What's the issue?</p>
            <div className="space-y-2">
              {REASONS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => {
                    setReason(r.value);
                    setStep(2);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-4 text-left",
                    "transition-colors",
                    reason === r.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  )}
                >
                  <AlertTriangle className="h-5 w-5 shrink-0 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Add note */}
        {step === 2 && (
          <div className="space-y-4">
            <button
              onClick={() => setStep(1)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              ← Back
            </button>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">Selected issue:</p>
              <Badge status="warning">
                {REASONS.find((r) => r.value === reason)?.label || reason}
              </Badge>
            </div>

            <div className="space-y-2">
              <label htmlFor="issue-note" className="text-sm font-medium text-gray-900">
                Add more details (optional)
              </label>
              <textarea
                id="issue-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe the issue in detail..."
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button variant="primary" onClick={handleSubmit} className="w-full">
              <Send className="h-4 w-4" />
              Submit Report
            </Button>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Report Submitted</h3>
              <p className="text-sm text-gray-600">
                We've received your report. Our support team will get back to you within 24 hours.
              </p>
            </div>
            <Badge status="success" className="text-xs">
              Ticket #TKT-{Math.floor(Math.random() * 90000) + 10000}
            </Badge>
            <Button variant="secondary" onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
