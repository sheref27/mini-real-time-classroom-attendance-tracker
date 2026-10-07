import type { AttendanceStatus } from "@/lib/types";

export interface StatusBadgeProps {
  /** The attendance status to display. */
  status: AttendanceStatus;
  /** Optional class name override. */
  className?: string;
}

const STATUS_CONFIG: Record<
  AttendanceStatus,
  { label: string; bg: string; text: string; ring: string; dot: string }
> = {
  present: {
    label: "Present",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-600/20",
    dot: "bg-emerald-500",
  },
  absent: {
    label: "Absent",
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-600/20",
    dot: "bg-red-500",
  },
  late: {
    label: "Late",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-600/20",
    dot: "bg-amber-500",
  },
};

/**
 * StatusBadge
 *
 * Presentational badge indicating current attendance status.
 * Combines colored text, background, and a colored status dot so
 * it doesn't rely solely on color for accessibility.
 */
export default function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${config.bg} ${config.text} ${config.ring} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </span>
  );
}
