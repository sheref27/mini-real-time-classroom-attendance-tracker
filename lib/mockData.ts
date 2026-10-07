/**
 * Mock data for the classroom attendance session.
 *
 * Exactly the 8 students specified in the technical assessment.
 * Names are preserved as provided; "عبدهللا" in student 4 is
 * corrected to the standard spelling "عبدالله".
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
    firstName: "خليل أحمد",
    lastName: "الرشيد",
    cumulativeAbsenceRate: 5,
  },
  {
    id: "2",
    firstName: "محمد سارة",
    lastName: "العتيبي",
    cumulativeAbsenceRate: 20,
  },
  {
    id: "3",
    firstName: "خالد عمر",
    lastName: "الدوسري",
    cumulativeAbsenceRate: 0,
  },
  {
    id: "4",
    firstName: "عبدالله مريم",
    lastName: "الغامدي",
    cumulativeAbsenceRate: 18,
  },
  {
    id: "5",
    firstName: "طارق ياسين",
    lastName: "القحطاني",
    cumulativeAbsenceRate: 8,
  },
  {
    id: "6",
    firstName: "حسن فاطمة",
    lastName: "الشهراني",
    cumulativeAbsenceRate: 25,
  },
  {
    id: "7",
    firstName: "فهد زياد",
    lastName: "المطيري",
    cumulativeAbsenceRate: 2,
  },
  {
    id: "8",
    firstName: "سعد نورة",
    lastName: "السبيعي",
    cumulativeAbsenceRate: 12,
  },
];

// ---------------------------------------------------------------------------
// Session seed — initial attendance status for each student
// Keys are student IDs; values match the assessment's specified statuses.
// ---------------------------------------------------------------------------

export const MOCK_INITIAL_STATUSES: Record<string, AttendanceStatus> = {
  "1": "present", // الرشيد خليل أحمد
  "2": "absent",  // العتيبي محمد سارة
  "3": "present", // الدوسري خالد عمر
  "4": "late",    // الغامدي عبدالله مريم
  "5": "present", // القحطاني طارق ياسين
  "6": "absent",  // الشهراني حسن فاطمة
  "7": "present", // المطيري فهد زياد
  "8": "present", // السبيعي سعد نورة
};
