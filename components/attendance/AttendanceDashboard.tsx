"use client";

import { useCallback, useMemo, useState } from "react";

import {
  buildInitialRecords,
  computeCounters,
  filterStudents,
  markAllPresent,
} from "@/lib/attendanceUtils";
import type {
  AttendanceSummary,
  AttendanceStatus,
  ClassInfo,
  Student,
} from "@/lib/types";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/attendance/Toast";
import DashboardHeader from "@/components/attendance/DashboardHeader";
import SummaryCounters from "@/components/attendance/SummaryCounters";
import SearchBar from "@/components/attendance/SearchBar";
import StudentList from "@/components/attendance/StudentList";

// ── Constants ─────────────────────────────────────────────────────────────────

const SAVE_SUCCESS_MESSAGE = "Attendance recorded successfully.";

// ── Prop contract ─────────────────────────────────────────────────────────────

export interface AttendanceDashboardProps {
  /** Full student roster — sourced from the Server Component in app/page.tsx. */
  students: Student[];
  /** Class and subject metadata displayed in the dashboard header. */
  classInfo: ClassInfo;
  /**
   * Initial attendance status per student ID for this session.
   * Seeded from MOCK_INITIAL_STATUSES; will come from a real API in future versions.
   */
  initialStatuses: Record<string, AttendanceStatus>;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * AttendanceDashboard — Client Component.
 *
 * ## State owned here
 * - `records`: Map<studentId, AttendanceStatus> — single source of truth for session attendance
 * - `searchQuery`: string — controlled live search input
 * - `toast`: managed by useToast() — optimistic confirmation messages
 *
 * ## Derived values
 * - `filteredStudents`: filtered client-side by search query
 * - `counters`: AttendanceSummary derived synchronously from records on every render
 *
 * ## Child Components Architecture
 * - DashboardHeader: class information, subject, date, and actions
 * - SummaryCounters: dynamic counters with visual status colors
 * - SearchBar: live filter input
 * - StudentList: renders student rows and empty state
 * - Toast: feedback toast
 */
export default function AttendanceDashboard({
  students,
  classInfo,
  initialStatuses,
}: AttendanceDashboardProps) {
  // ── Session records ─────────────────────────────────────────────────────────
  const [records, setRecords] = useState<Map<string, AttendanceStatus>>(
    () => buildInitialRecords(initialStatuses),
  );

  // ── Search / filter ─────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ── Toast ───────────────────────────────────────────────────────────────────
  const { toast, showToast, hideToast } = useToast();

  // ── Derived: filtered student list ──────────────────────────────────────────
  const filteredStudents: Student[] = useMemo(
    () => filterStudents(students, searchQuery),
    [students, searchQuery],
  );

  // ── Derived: attendance counters ────────────────────────────────────────────
  // Calculated over the full student list to ensure counters reflect total class state
  const counters: AttendanceSummary = useMemo(
    () => computeCounters(students, records),
    [students, records],
  );

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleStatusChange = useCallback(
    (studentId: string, status: AttendanceStatus): void => {
      setRecords((prev) => {
        const next = new Map(prev);
        next.set(studentId, status);
        return next;
      });
    },
    [],
  );

  const handleMarkAllPresent = useCallback((): void => {
    setRecords(markAllPresent(students));
  }, [students]);

  const handleSaveSession = useCallback((): void => {
    showToast(SAVE_SUCCESS_MESSAGE);
  }, [showToast]);

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Header: Class info, subject, date & primary actions */}
      <DashboardHeader
        classInfo={classInfo}
        onMarkAllPresent={handleMarkAllPresent}
        onSaveSession={handleSaveSession}
      />

      {/* Summary counters: Total, Present, Absent, Late */}
      <SummaryCounters counters={counters} />

      {/* Controlled live search bar */}
      <div className="w-full">
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Student List (and Empty State if zero results) */}
      <StudentList
        students={filteredStudents}
        records={records}
        onStatusChange={handleStatusChange}
        searchQuery={searchQuery}
      />

      {/* Optimistic Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        onDismiss={hideToast}
      />
    </div>
  );
}
