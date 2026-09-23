/**
 * Small, focused date/time helpers — no external deps needed.
 * All functions accept a Date object or a value that `new Date()` can parse.
 */

/** "Sep 24, 10:30 AM" */
export function formatDateTime(date) {
  const d = new Date(date);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) +
    ", " +
    d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
}

/** "10:30 AM" */
export function formatTime(date) {
  const d = new Date(date);
  if (isNaN(d)) return "—";
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/** "Today at 10:30 AM" / "Tomorrow at 9:00 AM" / "Sep 26 at 9:00 AM" */
export function formatRelativeDate(date) {
  const d = new Date(date);
  if (isNaN(d)) return "—";
  const now = new Date();
  const isSameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isSameDay) return `Today at ${formatTime(d)}`;

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear();
  if (isTomorrow) return `Tomorrow at ${formatTime(d)}`;

  // Otherwise show short date
  const shortDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${shortDate} at ${formatTime(d)}`;
}

/** "Delayed by 3 hrs 22 min" */
export function formatDelayMinutes(minutes) {
  if (minutes < 60) return `${minutes} min delay`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0
    ? `${hrs} hr${hrs > 1 ? "s" : ""}${mins > 0 ? ` ${mins} min` : ""} delay`
    : `${mins} min delay`;
}
