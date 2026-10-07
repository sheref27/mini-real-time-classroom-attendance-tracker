/**
 * Pure attendance utility functions.
 *
 * All functions are stateless and free of side effects — safe to
 * call from both Server and Client Components.
 */

import type {
  AttendanceSummary,
  AttendanceStatus,
  Student,
} from "./types";

// ---------------------------------------------------------------------------
// Arabic definite-article helper
// ---------------------------------------------------------------------------

/**
 * Strips the Arabic definite article "ال" (al-) from the start of a name
 * so the returned initial reflects the meaningful first letter.
 *
 * Example: "الرشيد" → "ر"
 */
function stripArabicArticle(name: string): string {
  return name.startsWith("ال") ? name.slice(2) : name;
}

// ---------------------------------------------------------------------------
// Initials
// ---------------------------------------------------------------------------

/**
 * Returns a 1–2 character string suitable for an avatar placeholder.
 *
 * Strategy:
 *  - Take the first meaningful character of `lastName` (strips "ال").
 *  - Take the first meaningful character of the first word in `firstName`.
 *
 * @example
 *   getInitials("خليل أحمد", "الرشيد") // → "رخ"
 */
export function getInitials(firstName: string, lastName: string): string {
  const firstWord = firstName.trim().split(/\s+/)[0] ?? "";
  const firstInitial = stripArabicArticle(firstWord)[0] ?? "";
  const lastInitial = stripArabicArticle(lastName.trim())[0] ?? "";
  return `${firstInitial}${lastInitial}`;
}

// ---------------------------------------------------------------------------
// Absence-rate threshold
// ---------------------------------------------------------------------------

/** The percentage above which a student is flagged for follow-up. */
export const ABSENCE_THRESHOLD = 15;

/**
 * Returns `true` when a student's cumulative absence rate exceeds the
 * follow-up threshold (default: 15%).
 */
export function needsFollowUp(
  cumulativeAbsenceRate: number,
  threshold: number = ABSENCE_THRESHOLD,
): boolean {
  return cumulativeAbsenceRate > threshold;
}

// ---------------------------------------------------------------------------
// Session record helpers
// ---------------------------------------------------------------------------

/**
 * Builds the initial `Map<studentId, AttendanceStatus>` for a session
 * from a plain `Record` seed (e.g. `MOCK_INITIAL_STATUSES`).
 *
 * Using a Map gives O(1) lookup and update per student.
 */
export function buildInitialRecords(
  initialStatuses: Record<string, AttendanceStatus>,
): Map<string, AttendanceStatus> {
  return new Map(Object.entries(initialStatuses));
}

/**
 * Returns a new Map with every student set to "present".
 * Used by the "Mark All Present" action without mutating existing state.
 */
export function markAllPresent(
  students: Student[],
): Map<string, AttendanceStatus> {
  return new Map(students.map((s) => [s.id, "present"]));
}

// ---------------------------------------------------------------------------
// Counter derivation
// ---------------------------------------------------------------------------

/**
 * Derives the attendance summary counters from the current session records.
 *
 * Any student ID present in `students` but absent from `records` is
 * counted as neither present, absent, nor late — this should not occur
 * in practice since `buildInitialRecords` always seeds every student,
 * but the guard keeps the function robust.
 */
export function computeCounters(
  students: Student[],
  records: Map<string, AttendanceStatus>,
): AttendanceSummary {
  const summary: AttendanceSummary = {
    total: students.length,
    present: 0,
    absent: 0,
    late: 0,
  };

  for (const student of students) {
    const status = records.get(student.id);
    if (status === "present") summary.present++;
    else if (status === "absent") summary.absent++;
    else if (status === "late") summary.late++;
  }

  return summary;
}

// ---------------------------------------------------------------------------
// Search / filter
// ---------------------------------------------------------------------------

/**
 * Case-insensitive, diacritic-aware student filter.
 *
 * Matches against the student's full name ("firstName lastName")
 * so users can search by any part of the name in either direction.
 *
 * @param students - The full student roster.
 * @param query    - The raw search string from the input element.
 * @returns A filtered subset; returns the original array unchanged when
 *          `query` is empty or whitespace-only.
 */
export function filterStudents(
  students: Student[],
  query: string,
): Student[] {
  const trimmed = query.trim();
  if (!trimmed) return students;

  const lower = trimmed.toLowerCase();

  return students.filter((s) => {
    const firstLast = `${s.firstName} ${s.lastName}`.toLowerCase();
    const lastFirst = `${s.lastName} ${s.firstName}`.toLowerCase();
    return firstLast.includes(lower) || lastFirst.includes(lower);
  });
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable locale
 * string using the Arabic (Saudi Arabia) locale by default.
 *
 * @example
 *   formatSessionDate("2026-10-07") // → "٧ أكتوبر ٢٠٢٦"
 */
export function formatSessionDate(
  isoDate: string,
  locale: string = "ar-SA",
): string {
  try {
    return new Date(isoDate).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    // Gracefully degrade if the locale or date is invalid
    return isoDate;
  }
}
