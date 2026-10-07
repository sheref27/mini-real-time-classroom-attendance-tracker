import type { AttendanceStatus, Student } from "@/lib/types";
import StudentRow from "./StudentRow";
import EmptyState from "./EmptyState";

export interface StudentListProps {
  /** Filtered list of students to render. */
  students: Student[];
  /** Session attendance records mapping student ID to current status. */
  records: Map<string, AttendanceStatus>;
  /** Callback to update a student's attendance status. */
  onStatusChange: (studentId: string, newStatus: AttendanceStatus) => void;
  /** Current search query string (used for EmptyState context). */
  searchQuery?: string;
}

/**
 * StudentList
 *
 * Renders the roster of students for the attendance session.
 * If the list is empty (e.g., due to filtering), delegates to EmptyState.
 * Otherwise, maps each student into a StudentRow keyed by stable student ID.
 *
 * Strictly presentational: receives filtered students and records via props.
 */
export default function StudentList({
  students,
  records,
  onStatusChange,
  searchQuery,
}: StudentListProps) {
  if (students.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  return (
    <section aria-label="Student attendance list" className="w-full">
      <ul className="flex flex-col gap-3" role="list">
        {students.map((student) => {
          const currentStatus = records.get(student.id) ?? "present";

          return (
            <StudentRow
              key={student.id}
              student={student}
              status={currentStatus}
              onStatusChange={onStatusChange}
            />
          );
        })}
      </ul>
    </section>
  );
}
