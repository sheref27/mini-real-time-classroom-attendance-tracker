export interface SearchBarProps {
  /** The current search query string from state. */
  query: string;
  /** Callback fired immediately on change. */
  onChange: (query: string) => void;
  /** Optional placeholder text. Defaults to "Search students...". */
  placeholder?: string;
}

/**
 * SearchBar
 *
 * Controlled live search input component.
 * Allows filtering students immediately as user types without page reloads.
 * Provides accessible labels and clear indicators.
 */
export default function SearchBar({
  query,
  onChange,
  placeholder = "Search students...",
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <label htmlFor="student-search-input" className="sr-only">
        Search students by full name
      </label>

      {/* Search icon */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        id="student-search-input"
        type="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[44px] rounded-xl border-0 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-800 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
        autoComplete="off"
        spellCheck={false}
      />

      {/* Clear query button if query has content */}
      {query.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
          aria-label="Clear search query"
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
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
