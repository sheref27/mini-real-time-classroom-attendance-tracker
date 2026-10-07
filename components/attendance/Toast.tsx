"use client";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ToastProps {
  /** Whether the toast is currently visible. */
  visible: boolean;
  /** The message string to display inside the toast. */
  message: string;
  /** Called when the user clicks the dismiss (×) button. */
  onDismiss: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Toast — optimistic success notification.
 *
 * Renders fixed to the viewport so it overlays all page content without
 * disturbing document layout or blocking dashboard interaction.
 *
 * Accessibility:
 *  - `role="status"` + `aria-live="polite"` announces the message to
 *    screen readers without interrupting current reading flow.
 *  - `aria-atomic="true"` ensures the entire message is announced.
 *  - The dismiss button has an `aria-label` for screen reader users.
 *
 * The component is purely presentational — visibility and auto-dismiss
 * timing are owned by the `useToast` hook in AttendanceDashboard.
 */
export default function Toast({ visible, message, onDismiss }: ToastProps) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 left-5 z-50 flex max-w-md items-center justify-between gap-3 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-medium text-white shadow-xl ring-1 ring-emerald-700/50 sm:left-auto sm:right-6 sm:bottom-6 sm:justify-start"
    >
      <div className="flex items-center gap-2.5">
        {/* Success checkmark */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0 text-emerald-100"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>

        <span className="leading-snug">{message}</span>
      </div>

      {/* Manual dismiss button */}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="ml-auto inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-emerald-100 transition-colors hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-emerald-600 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
