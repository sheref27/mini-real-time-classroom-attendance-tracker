/**
 * Core domain types for the Classroom Attendance Tracker.
 *
 * AttendanceStatus is intentionally kept to exactly three values
 * as specified by the technical assessment — no "unmarked" state.
 */

// ---------------------------------------------------------------------------
// Attendance status
// ---------------------------------------------------------------------------

export type AttendanceStatus = "present" | "absent" | "late";

// ---------------------------------------------------------------------------
// Student
// ---------------------------------------------------------------------------

export interface Student {
  /** Unique, stable identifier (used as Map key for the session records). */
  id: string;
  /** Given name(s). For Arabic names the first meaningful name part. */
  firstName: string;
  /** Family / tribal name (e.g. "الرشيد"). */
  lastName: string;
  /** Remote URL for an avatar image. Falls back to initials when absent. */
  avatarUrl?: string;
  /**
   * Cumulative absence rate expressed as a percentage (0–100).
   * Values above 15 trigger the "Needs Follow-up" warning badge.
   */
  cumulativeAbsenceRate: number;
}

// ---------------------------------------------------------------------------
// Session records
// ---------------------------------------------------------------------------

/** One attendance entry for the current session. */
export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
}

// ---------------------------------------------------------------------------
// Class information (displayed in the dashboard header)
// ---------------------------------------------------------------------------

export interface ClassInfo {
  /** Human-readable class label, e.g. "Grade 10-B". */
  className: string;
  /** Subject being taught in this session, e.g. "Mathematics". */
  subject: string;
  /** ISO 8601 date string (YYYY-MM-DD). */
  date: string;
  /** Optional teacher name shown in the header. */
  teacherName?: string;
}

// ---------------------------------------------------------------------------
// Derived counter shape (result of computeCounters)
// ---------------------------------------------------------------------------

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  late: number;
}
