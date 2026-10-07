import type { AttendanceStatus, Student } from "@/lib/types";
import { getInitials } from "@/lib/attendanceUtils";
import StatusBadge from "./StatusBadge";
import AbsenceWarning from "./AbsenceWarning";

export interface StudentRowProps {
  /** Student data object. */
  student: Student;
  /** Current attendance status for this student in the session. */
  status: AttendanceStatus;
  /** Callback fired immediately when a new status is selected. */
  onStatusChange: (studentId: string, newStatus: AttendanceStatus) => void;
}

const STATUS_BUTTONS: {
  status: AttendanceStatus;
  label: string;
  activeClasses: string;
  hoverClasses: string;
}[] = [
  {
    status: "present",
    label: "Present",
    activeClasses:
      "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600 font-bold",
    hoverClasses:
      "bg-emerald-50/70 text-emerald-700 hover:bg-emerald-100/90 ring-1 ring-inset ring-emerald-300/80 font-medium",
  },
  {
    status: "absent",
    label: "Absent",
    activeClasses:
      "bg-red-600 text-white shadow-sm ring-1 ring-red-600 font-bold",
    hoverClasses:
      "bg-red-50/70 text-red-700 hover:bg-red-100/90 ring-1 ring-inset ring-red-300/80 font-medium",
  },
  {
    status: "late",
    label: "Late",
    activeClasses:
      "bg-amber-500 text-white shadow-sm ring-1 ring-amber-500 font-bold",
    hoverClasses:
      "bg-amber-50/70 text-amber-800 hover:bg-amber-100/90 ring-1 ring-inset ring-amber-300/80 font-medium",
  },
];

/**
 * StudentRow
 *
 * Renders an individual student's card/row with:
 * - Avatar or initials fallback (solid, clean background)
 * - Full name (matching assessment order)
 * - Cumulative absence rate
 * - "Needs Follow-up" warning badge when absence rate > 15%
 * - Current StatusBadge
 * - Interactive, touch-friendly 3-option status switcher with explicit ARIA labels
 *
 * Purely presentational; receives status and onStatusChange from parent.
 */
export default function StudentRow({
  student,
  status,
  onStatusChange,
}: StudentRowProps) {
  const initials = getInitials(student.firstName, student.lastName);
  const fullName = `${student.firstName} ${student.lastName}`;

  return (
    <li className="flex flex-col gap-3.5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
      {/* Student Details */}
      <div className="flex min-w-0 items-center gap-3.5">
        {/* Avatar or Initials */}
        {student.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={student.avatarUrl}
            alt=""
            aria-hidden="true"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 select-none items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700 ring-1 ring-slate-200"
          >
            {initials}
          </div>
        )}

        {/* Student Name & Attendance Stats */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {fullName}
            </h3>
            <AbsenceWarning
              cumulativeAbsenceRate={student.cumulativeAbsenceRate}
            />
          </div>

          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>
              Cumulative absence:{" "}
              <span className="font-semibold text-slate-700">
                {student.cumulativeAbsenceRate}%
              </span>
            </span>
            <span className="text-slate-300" aria-hidden="true">
              •
            </span>
            <div className="flex items-center gap-1.5">
              <span>Status:</span>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </div>

      {/* Touch-Friendly Status Switcher Controls */}
      <div
        role="group"
        aria-label={`Attendance status options for ${fullName}`}
        className="flex w-full items-center justify-between gap-1.5 border-t border-slate-100 pt-3 sm:w-auto sm:justify-end sm:border-0 sm:pt-0"
      >
        {STATUS_BUTTONS.map((btn) => {
          const isSelected = status === btn.status;

          return (
            <button
              key={btn.status}
              type="button"
              onClick={() => onStatusChange(student.id, btn.status)}
              aria-pressed={isSelected}
              aria-label={`Mark ${fullName} as ${btn.label}`}
              className={`flex-1 min-w-[76px] min-h-[40px] rounded-xl px-3 py-2 text-xs tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 sm:flex-none sm:py-2.5 sm:text-xs ${
                isSelected ? btn.activeClasses : btn.hoverClasses
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </li>
  );
}
