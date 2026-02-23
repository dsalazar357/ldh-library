"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocaleAction } from "@/app/actions/locale";
import type { Locale } from "@/lib/i18n";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
  { value: "fr", label: "FR" },
];

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (locale: Locale) => {
    startTransition(async () => {
      await setLocaleAction(locale);
      router.refresh();
    });
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-border bg-card p-0.5"
      role="radiogroup"
      aria-label="Language"
    >
      {LOCALES.map((loc) => (
        <button
          key={loc.value}
          type="button"
          role="radio"
          aria-checked={currentLocale === loc.value}
          disabled={isPending}
          onClick={() => handleChange(loc.value)}
          className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
            currentLocale === loc.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-card-foreground"
          } disabled:opacity-50`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
