/**
 * Mock data for the classroom attendance session.
 *
 * Exactly the 8 students specified in the technical assessment.
 * Displayed in natural Arabic name order (First, Middle, Family):
 *   1. أحمد خليل الرشيد
 *   2. سارة محمد العتيبي
 *   3. عمر خالد الدوسري
 *   4. مريم عبدهللا الغامدي
 *   5. ياسين طارق القحطاني
 *   6. فاطمة حسن الشهراني
 *   7. زياد فهد المطيري
 *   8. نورة سعد السبيعي
 *
 * MOCK_INITIAL_STATUSES seeds the first render of the session —
 * it is intentionally kept separate from the Student model so
 * that Student remains a pure data-domain type.
 */

import type { AttendanceStatus, ClassInfo, Student } from "./types";

// ---------------------------------------------------------------------------
// Class metadata
// ---------------------------------------------------------------------------

export const MOCK_CLASS_INFO: ClassInfo = {
  className: "الصف العاشر — ب",
  subject: "الرياضيات",
  date: new Date().toISOString().split("T")[0], // YYYY-MM-DD (today)
  teacherName: "أ. محمد الأنصاري",
};

// ---------------------------------------------------------------------------
// Students — 8 entries, order matches the assessment list
// ---------------------------------------------------------------------------

export const MOCK_STUDENTS: Student[] = [
  {
    id: "1",
    firstName: "أحمد خليل",
    lastName: "الرشيد",
    cumulativeAbsenceRate: 5,
  },
  {
    id: "2",
    firstName: "سارة محمد",
    lastName: "العتيبي",
    cumulativeAbsenceRate: 20,
  },
  {
    id: "3",
    firstName: "عمر خالد",
    lastName: "الدوسري",
    cumulativeAbsenceRate: 0,
  },
  {
    id: "4",
    firstName: "مريم عبدهللا",
    lastName: "الغامدي",
    cumulativeAbsenceRate: 18,
  },
  {
    id: "5",
    firstName: "ياسين طارق",
    lastName: "القحطاني",
    cumulativeAbsenceRate: 8,
  },
  {
    id: "6",
    firstName: "فاطمة حسن",
    lastName: "الشهراني",
    cumulativeAbsenceRate: 25,
  },
  {
    id: "7",
    firstName: "زياد فهد",
    lastName: "المطيري",
    cumulativeAbsenceRate: 2,
  },
  {
    id: "8",
    firstName: "نورة سعد",
    lastName: "السبيعي",
    cumulativeAbsenceRate: 12,
  },
];

// ---------------------------------------------------------------------------
// Session seed — initial attendance status for each student
// Keys are student IDs; values match the assessment's specified statuses.
// ---------------------------------------------------------------------------

export const MOCK_INITIAL_STATUSES: Record<string, AttendanceStatus> = {
  "1": "present", // أحمد خليل الرشيد
  "2": "absent",  // سارة محمد العتيبي
  "3": "present", // عمر خالد الدوسري
  "4": "late",    // مريم عبدهللا الغامدي
  "5": "present", // ياسين طارق القحطاني
  "6": "absent",  // فاطمة حسن الشهراني
  "7": "present", // زياد فهد المطيري
  "8": "present", // نورة سعد السبيعي
};
