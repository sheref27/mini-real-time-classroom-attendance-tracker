import { needsFollowUp } from "@/lib/attendanceUtils";

export interface AbsenceWarningProps {
  /** The student's cumulative absence rate percentage (0–100). */
  cumulativeAbsenceRate: number;
}

/**
 * AbsenceWarning
 *
 * Displays a "Needs Follow-up" alert badge when the cumulative absence rate
 * exceeds the defined threshold (> 15%).
 * Reuses the pure needsFollowUp() domain utility without duplicating logic.
 * Returns null if the rate is within the acceptable threshold.
 */
export default function AbsenceWarning({
  cumulativeAbsenceRate,
}: AbsenceWarningProps) {
  if (!needsFollowUp(cumulativeAbsenceRate)) {
    return null;
  }

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/30"
      title={`Cumulative absence rate (${cumulativeAbsenceRate}%) exceeds the 15% threshold`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5 text-amber-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span>Needs Follow-up</span>
    </span>
  );
}
