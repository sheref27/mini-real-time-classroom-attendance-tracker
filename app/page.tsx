/**
 * Home — Server Component (no 'use client' directive).
 *
 * Responsibility: data sourcing only.
 *   - Imports the mock student roster, class metadata, and session-seed
 *     statuses from lib/mockData.
 *   - Passes them as serialisable props to AttendanceDashboard, which is
 *     the Client Component boundary (owns all interactive state).
 *
 * Why a Server Component?
 *   Next.js 16 App Router renders pages on the server by default.
 *   All state (attendance records, search query, toast) belongs inside
 *   AttendanceDashboard. Keeping this page as a Server Component avoids
 *   unnecessary client JavaScript and aligns with Next.js 16 guidance.
 */

import AttendanceDashboard from "@/components/attendance/AttendanceDashboard";
import {
  MOCK_CLASS_INFO,
  MOCK_INITIAL_STATUSES,
  MOCK_STUDENTS,
} from "@/lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <AttendanceDashboard
        students={MOCK_STUDENTS}
        classInfo={MOCK_CLASS_INFO}
        initialStatuses={MOCK_INITIAL_STATUSES}
      />
    </main>
  );
}
