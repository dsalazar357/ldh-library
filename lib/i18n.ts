import { cookies } from "next/headers";

export type Locale = "en" | "es" | "fr";

export const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

const LOCALE_COOKIE = "ldh-locale";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (locale === "es" || locale === "fr") return locale;
  return "en";
}
