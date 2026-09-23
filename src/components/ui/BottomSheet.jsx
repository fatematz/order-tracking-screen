"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible bottom sheet — slides up from bottom on mobile,
 * centered modal on desktop. Closes on backdrop click, Escape key,
 * or via the onClose callback. Locks body scroll and traps focus.
 *
 * @param {boolean} open — controlled open/close
 * @param {function} onClose — called when sheet closes
 * @param {string} title — optional header title
 * @param {ReactNode} children — sheet body content
 * @param {string} className — extra classes for the sheet panel
 */
export default function BottomSheet({ open, onClose, title, children, className }) {
  const sheetRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Lock body scroll and save previous focus when sheet opens
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Basic focus trap: keep focus inside the sheet while open
  useEffect(() => {
    if (!open || !sheetRef.current) return;
    const sheet = sheetRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      const focusable = Array.from(sheet.querySelectorAll(focusableSelector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // Focus the close button or first focusable element on open
    const closeBtn = sheet.querySelector('[aria-label="Close"]');
    (closeBtn || sheet.querySelector(focusableSelector))?.focus();

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Sheet panel */}
      <div
        ref={sheetRef}
        className={cn(
          "relative z-10 w-full max-w-107.5 max-h-[90dvh] overflow-y-auto",
          "rounded-t-2xl md:rounded-2xl bg-white shadow-2xl",
          "animate-in slide-in-from-bottom duration-300 ease-out",
          "pb-[env(safe-area-inset-bottom)]",
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 px-5 py-4 bg-white">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className={cn(
                "rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              )}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
