"use server";

import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function setLocaleAction(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set("ldh-locale", locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}
