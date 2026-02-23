"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface StudyDocFiltersProps {
  currentOrganization: string;
  currentQuery: string;
}

export default function StudyDocFilters({
  currentOrganization,
  currentQuery,
}: StudyDocFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      // Keep the tab param
      params.set("tab", "study");
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search by title..."
          defaultValue={currentQuery}
          onChange={(e) => {
            const value = e.target.value;
            const timeout = setTimeout(
              () => updateFilter("sq", value),
              350
            );
            return () => clearTimeout(timeout);
          }}
          className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-sans"
          aria-label="Search study documents by title"
        />
      </div>

      <div>
        <label htmlFor="filter-organization" className="sr-only">
          Filter by organization
        </label>
        <input
          id="filter-organization"
          type="text"
          placeholder="Filter by organization..."
          defaultValue={currentOrganization}
          onChange={(e) => {
            const value = e.target.value;
            const timeout = setTimeout(
              () => updateFilter("org", value),
              350
            );
            return () => clearTimeout(timeout);
          }}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-sans"
          aria-label="Filter by organization"
        />
      </div>
    </div>
  );
}
