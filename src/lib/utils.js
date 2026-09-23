/**
 * Tiny utility helpers used across components.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely — clsx handles conditionals,
 * tailwind-merge resolves conflicts (e.g., px-2 vs px-4).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
