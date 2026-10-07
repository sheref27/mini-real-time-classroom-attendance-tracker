"use client";

import type { ClassInfo } from "@/lib/types";
import { formatSessionDate } from "@/lib/attendanceUtils";

export interface DashboardHeaderProps {
  /** Class and subject details. */
  classInfo: ClassInfo;
  /** Action handler to set all students to present. */
  onMarkAllPresent: () => void;
  /** Action handler for saving the attendance session. */
  onSaveSession: () => void;
}

/**
 * DashboardHeader
 *
 * Displays class, subject, teacher name, and session date information,
 * along with the primary session actions (Mark All Present, Save Session).
 *
 * Purely presentational; receives all data and callbacks via props.
 */
export default function DashboardHeader({
  classInfo,
  onMarkAllPresent,
  onSaveSession,
}: DashboardHeaderProps) {
  const formattedDate = formatSessionDate(classInfo.date);

  return (
    <header className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {classInfo.className}
          </h1>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {classInfo.subject}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:text-sm">
          {classInfo.teacherName && (
            <span className="font-medium text-slate-600">
              {classInfo.teacherName}
            </span>
          )}
          {classInfo.teacherName && (
            <span className="text-slate-300" aria-hidden="true">
              •
            </span>
          )}
          <time dateTime={classInfo.date} className="text-slate-500">
            {formattedDate}
          </time>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
        <button
          type="button"
          onClick={onMarkAllPresent}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-[0.98] sm:text-sm"
        >
          Mark All Present
        </button>

        <button
          type="button"
          onClick={onSaveSession}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4.5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.98] sm:text-sm"
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
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Save Session</span>
        </button>
      </div>
    </header>
  );
}
