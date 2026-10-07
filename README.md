# Mini Real-Time Classroom Attendance Tracker

A responsive classroom attendance tracking dashboard built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. Designed for teachers and instructors to take, update, and manage student attendance during an active class session with instant UI feedback and zero page reloads.

---

## 1. Project Overview

The **Mini Real-Time Classroom Attendance Tracker** allows educators to record session attendance smoothly across mobile, tablet, and desktop devices. The application presents class information, live dynamic counters (Total, Present, Absent, Late), an instant student search filter, individual status controls, an automated absence threshold alert, and an optimistic session-save action with toast confirmation.

All attendance state and derivations operate client-side in React state, providing instant interaction without requiring an active backend or server synchronization.

---

## 2. Key Features

- **Class & Subject Header**: Displays class name, subject title, teacher name, and session date.
- **Dynamic Attendance Counters**: Four dynamic cards showing **Total**, **Present**, **Absent**, and **Late** counts that update instantly upon any status change.
- **Immediate Status Controls**: Quick-switch student attendance between **Present**, **Absent**, and **Late** with dedicated, touch-friendly buttons.
- **"Mark All Present" Action**: One-click action to set every student in the session to Present simultaneously.
- **Live Search & Filter**: Filter students by full name immediately as you type without page reloads.
- **Cumulative Absence Warning**: Highlights students with a cumulative absence rate greater than **15%** with a clear `"Needs Follow-up"` warning badge.
- **Optimistic "Save Session" Toast**: Triggers an instant, accessible success toast notification confirming `"Attendance recorded successfully."` with automatic 3-second dismissal.
- **Empty State**: Friendly visual fallback when a search query yields no matching students.
- **Responsive & Touch-Friendly**: Clean, modern interface optimized for mobile viewports, tablets, and desktop screens with $\ge 40\text{--}44\text{px}$ touch targets and no horizontal scrolling.
- **Accessible Design**: Semantic HTML5 landmarks, explicit ARIA pressed/labels states, polite screen-reader announcements, and status indicators that do not rely solely on color.

---

## 3. Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16.4.0 — App Router)
- **Library**: [React](https://react.dev/) (v19.3.0)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, v5)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4 with Turbopack)
- **Icons**: Handcrafted accessible inline SVG icons (zero third-party icon bundle bloat)
- **State Management**: Native React Hooks (`useState`, `useMemo`, `useCallback`, `useRef`, `useEffect`)
- **Linting & Code Quality**: [ESLint](https://eslint.org/) (v9 with `eslint-config-next`)

---

## 4. Architecture & Project Structure

The project separates concerns cleanly across page routing, presentational components, domain types, pure utilities, and custom hooks:

```text
mini_real-time_classroom_attendance_tracker/
├── app/
│   ├── favicon.ico
│   ├── globals.css              # Global styles & Tailwind v4 theme configuration
│   ├── layout.tsx               # Root layout & page metadata
│   └── page.tsx                 # Server Component shell passing mock data to dashboard
├── components/
│   └── attendance/
│       ├── AbsenceWarning.tsx   # "Needs Follow-up" badge (> 15% cumulative absence)
│       ├── AttendanceDashboard.tsx # Client Component orchestrator (state, handlers, derivations)
│       ├── DashboardHeader.tsx  # Header info, "Mark All Present", and "Save Session" actions
│       ├── EmptyState.tsx       # Zero-search-results display
│       ├── SearchBar.tsx        # Controlled search input with clear action
│       ├── StatusBadge.tsx      # Color-coded attendance status badge
│       ├── StudentList.tsx      # Presentational list mapping students to rows
│       ├── StudentRow.tsx       # Individual student row/card with avatar & status switcher
│       ├── SummaryCounters.tsx  # Four metric cards with status color coding
│       └── Toast.tsx            # Accessible, fixed optimistic notification toast
├── hooks/
│   └── useToast.ts              # Lightweight toast lifecycle hook (auto-dismiss & timer reset)
├── lib/
│   ├── attendanceUtils.ts       # Pure stateless utility functions (counters, filters, initials)
│   ├── mockData.ts              # Assessment mock roster & initial attendance statuses
│   └── types.ts                 # Domain TypeScript interfaces and union types
├── public/                      # Static assets
├── eslint.config.mjs            # ESLint 9 configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies and run scripts
├── tsconfig.json                # TypeScript strict configuration
└── README.md                    # Project documentation
```

### Architectural Principles

1. **Server/Client Boundary Separation**: `app/page.tsx` is a lightweight Server Component that imports initial mock data and passes it to `<AttendanceDashboard />`.
2. **Single Source of Truth**: All session attendance state lives exclusively in `AttendanceDashboard` (`records: Map<string, AttendanceStatus>`).
3. **Synchronous Derivations**: Counters and filtered lists are computed synchronously via `useMemo` from the raw state, preventing desynchronization bugs.
4. **Pure Utility Extraction**: Business rules such as threshold checks (`needsFollowUp`), counter summaries (`computeCounters`), and searching (`filterStudents`) are isolated in `lib/attendanceUtils.ts` without side effects.
5. **No Duplicate State**: Child components receive data and callback props strictly without copying them into local state.

---

## 5. Attendance Data

For the technical assessment, the application utilizes mock student data (`lib/mockData.ts`) consisting of exactly the **8 students** specified in the assessment requirements.

| # | Student Full Name | Cumulative Absence | Initial Status |
|---|---|:---:|:---:|
| 1 | أحمد خليل الرشيد | 5% | Present |
| 2 | سارة محمد العتيبي | 20% | Absent |
| 3 | عمر خالد الدوسري | 0% | Present |
| 4 | مريم عبدهللا الغامدي | 18% | Late |
| 5 | ياسين طارق القحطاني | 8% | Present |
| 6 | فاطمة حسن الشهراني | 25% | Absent |
| 7 | زياد فهد المطيري | 2% | Present |
| 8 | نورة سعد السبيعي | 12% | Present |

*Note: Since no backend or persistent database is required for this version, the attendance state is managed entirely in client-side memory using React state.*

---

## 6. Attendance Statuses

The session status is strictly constrained to the three required states:

| Status | Color Cue | Description |
|---|---|---|
| `present` | **Green** (`emerald`) | Student is present and attending the session |
| `absent` | **Red** (`red`) | Student is absent from the session |
| `late` | **Amber** (`amber`) | Student arrived late to the session |

*(No fourth or unmarked status is included, in adherence to the assessment scope.)*

---

## 7. Absence Warning Logic

The cumulative absence rate threshold is configured as:

$$\text{Absence Rate} > 15\% \implies \text{Warning Triggered}$$

- If a student's cumulative absence exceeds **15%**, the row displays a `"Needs Follow-up"` warning badge with an alert icon.
- If the rate is **15% or below**, no warning is rendered.
- Calculated via the reusable domain utility function `needsFollowUp(rate: number)` in `lib/attendanceUtils.ts`.

---

## 8. Getting Started

### Prerequisites

- Node.js 18.18+ or 20+ installed on your system
- npm, pnpm, or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd mini_real-time_classroom_attendance_tracker
npm install
```

### Running Locally

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

---

## 9. Available Scripts

The following scripts are defined in `package.json`:

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js local development server with Fast Refresh. |
| `npm run build` | Runs TypeScript checks and creates an optimized production build. |
| `npm run start` | Starts the production server after a build has completed. |
| `npm run lint` | Runs ESLint across the codebase using Next.js core web vitals and TypeScript rules. |

---

## 10. Validation & Quality Checks

The application has been verified against strict type-checking, linting, and build standards:

- **TypeScript Strict Validation**:
  ```bash
  npx tsc --noEmit
  ```
  *(Result: 0 errors — fully typed without `any` escapes.)*

- **ESLint Code Quality**:
  ```bash
  npm run lint
  ```
  *(Result: 0 errors, 0 warnings across all app, component, and utility files.)*

- **Next.js Production Build**:
  ```bash
  npm run build
  ```
  *(Result: Compiled successfully; static pages optimized and prerendered.)*

---

## 11. Git Workflow

This project adheres to a clean, phased Git commit strategy with descriptive commit messages covering domain models, UI components, interaction flows, responsive polish, and documentation.

---

## 12. Deployment

The application is fully compatible with standard Next.js deployment platforms:

- **Vercel** (Recommended): Connect the Git repository to Vercel for zero-configuration continuous deployments.
- **Node.js Server**: Build with `npm run build` and run with `npm run start`.
- **Docker**: Containerize with standard standalone Next.js Docker configuration.

---

## 13. Assessment Requirements Verification

| Requirement | Implementation Details | Status |
|---|---|:---:|
| **Next.js & React** | App Router (`app/`), Server Component page shell, Client Component dashboard. | ✅ PASS |
| **TypeScript** | Strict interfaces (`Student`, `ClassInfo`, `AttendanceSummary`) and union types. | ✅ PASS |
| **Tailwind CSS** | Tailwind CSS v4 styling with clean semantic utility classes. | ✅ PASS |
| **Responsive Design** | Tested and verified on mobile, tablet, and desktop screens without horizontal scroll. | ✅ PASS |
| **Search & Filtering** | Instant, case-insensitive, client-side name search in both token directions. | ✅ PASS |
| **Attendance Status Updates** | One-click status toggling (Present / Absent / Late) updating state immediately. | ✅ PASS |
| **Dynamic Counters** | Synchronous derivation of Total, Present, Absent, and Late metrics on every frame. | ✅ PASS |
| **Absence Warning** | Clear `"Needs Follow-up"` badge for cumulative absence rate $> 15\%$. | ✅ PASS |
| **Save Session Toast** | Optimistic toast message: `"Attendance recorded successfully."` with auto-dismiss. | ✅ PASS |
| **Empty State** | Friendly empty-result indicator shown when search returns 0 matching students. | ✅ PASS |
| **Mock Student Data** | Exactly the 8 assessment students loaded with authentic natural Arabic name ordering. | ✅ PASS |
| **Clean Modular Components** | Decomposed into 10 single-responsibility components and pure utilities. | ✅ PASS |

---

## 14. Author

**Sheref Serag**  
Senior Frontend Engineer
