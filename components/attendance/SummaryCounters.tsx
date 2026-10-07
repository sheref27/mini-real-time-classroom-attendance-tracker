import type { AttendanceSummary } from "@/lib/types";

export interface SummaryCountersProps {
  /** Derived counters passed from the parent state manager. */
  counters: AttendanceSummary;
}

interface CounterCardConfig {
  key: keyof AttendanceSummary;
  label: string;
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  textColor: string;
}

const COUNTER_CONFIGS: CounterCardConfig[] = [
  {
    key: "total",
    label: "Total",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-600",
    cardBorder: "ring-slate-200/80",
    textColor: "text-slate-800",
  },
  {
    key: "present",
    label: "Present",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    cardBorder: "ring-emerald-200/70",
    textColor: "text-emerald-600",
  },
  {
    key: "absent",
    label: "Absent",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    cardBorder: "ring-red-200/70",
    textColor: "text-red-600",
  },
  {
    key: "late",
    label: "Late",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    cardBorder: "ring-amber-200/70",
    textColor: "text-amber-600",
  },
];

/**
 * SummaryCounters
 *
 * Renders the 4 dynamic attendance counter cards (Total, Present, Absent, Late).
 * Strictly presentational and stateless: displays whatever AttendanceSummary
 * values are passed down from AttendanceDashboard.
 */
export default function SummaryCounters({ counters }: SummaryCountersProps) {
  return (
    <section aria-label="Attendance statistics" className="w-full">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {COUNTER_CONFIGS.map((config) => {
          const value = counters[config.key];

          return (
            <div
              key={config.key}
              className={`flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 sm:p-5 ${config.cardBorder} transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-sm">
                  {config.label}
                </span>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:text-xs ${config.badgeBg} ${config.badgeText}`}
                >
                  {config.label}
                </span>
              </div>
              <p
                className={`mt-3 text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl ${config.textColor}`}
              >
                {value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
