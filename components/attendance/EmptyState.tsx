export interface EmptyStateProps {
  /** Optional search query that yielded no results. */
  searchQuery?: string;
}

/**
 * EmptyState
 *
 * Rendered when the student list filter produces zero matches.
 * Strictly presentational and does not mutate any state.
 */
export default function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-200/80"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-base font-semibold text-slate-800">
        No students found
      </h2>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {searchQuery && searchQuery.trim().length > 0 ? (
          <>
            No student name matches &ldquo;
            <span className="font-medium text-slate-700">{searchQuery}</span>
            &rdquo;. Try searching with a different name or spelling.
          </>
        ) : (
          "There are no students to display in this list."
        )}
      </p>
    </div>
  );
}
