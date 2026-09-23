"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Minimal toast notification system.
 * Use `addToast({ type, message })` from anywhere in the app.
 *
 * Types: success | error | warning | info
 */
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = "info", message, duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Toast container — fixed top-right */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-[360px]">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/** Hook to use toast anywhere */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/** Single toast item */
function Toast({ type, message, onClose }) {
  const config = {
    success: {
      bg: "bg-green-50 border-green-200",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "text-green-800",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      text: "text-red-800",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
      text: "text-amber-800",
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      icon: <AlertCircle className="h-5 w-5 text-blue-600" />,
      text: "text-blue-800",
    },
  };

  const c = config[type] || config.info;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg " +
          "animate-in slide-in-from-right duration-300 ease-out",
        c.bg
      )}
      role="alert"
      aria-live="assertive"
    >
      <span className="mt-0.5 flex-shrink-0">{c.icon}</span>
      <p className={cn("flex-1 text-sm font-medium", c.text)}>{message}</p>
      <button
        onClick={onClose}
        className={cn(
          "flex-shrink-0 rounded-lg p-1 text-gray-400 hover:bg-white/50 hover:text-gray-600",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        )}
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
