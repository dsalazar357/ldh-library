"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { DEGREES, LANGUAGES } from "@/lib/constants";

interface RitualFiltersProps {
  currentLanguage: string;
  currentDegree: string;
  currentQuery: string;
  dict: {
    searchByTitle: string;
    allLanguages: string;
    allDegrees: string;
  };
}

export default function RitualFilters({
  currentLanguage,
  currentDegree,
  currentQuery,
  dict,
}: RitualFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
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
          placeholder={dict.searchByTitle}
          defaultValue={currentQuery}
          onChange={(e) => {
            const value = e.target.value;
            const timeout = setTimeout(() => updateFilter("q", value), 350);
            return () => clearTimeout(timeout);
          }}
          className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-sans"
          aria-label={dict.searchByTitle}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="filter-language" className="sr-only">
            {dict.allLanguages}
          </label>
          <select
            id="filter-language"
            value={currentLanguage}
            onChange={(e) => updateFilter("language", e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-sans appearance-none cursor-pointer"
          >
            <option value="">{dict.allLanguages}</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="filter-degree" className="sr-only">
            {dict.allDegrees}
          </label>
          <select
            id="filter-degree"
            value={currentDegree}
            onChange={(e) => updateFilter("degree", e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all font-sans appearance-none cursor-pointer"
          >
            <option value="">{dict.allDegrees}</option>
            {DEGREES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label} Degree
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
