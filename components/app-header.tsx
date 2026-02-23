"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import LanguageSwitcher from "@/components/language-switcher";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";

type NavItem = {
  key: string;
  href: string;
  adminOnly?: boolean;
};

interface AppHeaderProps {
  username: string;
  isAdmin: boolean;
  currentPage: string;
  dict: Dictionary;
  locale: Locale;
}

const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "rituals", href: "/rituals" },
  { key: "studyDocs", href: "/study-documents" },
  { key: "upload", href: "/rituals/upload" },
  { key: "uploadDoc", href: "/study-documents/upload" },
  { key: "users", href: "/users", adminOnly: true },
];

export default function AppHeader({
  username,
  isAdmin,
  currentPage,
  dict,
  locale,
}: AppHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  const t = dict.nav;

  return (
    <header className="border-b border-border bg-card">
      {/* Desktop header */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="text-lg font-bold text-card-foreground font-sans hover:opacity-80 transition-opacity"
          >
            {dict.common.appName}
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {visibleItems.map((item) => {
              const label = t[item.key as keyof typeof t] || item.key;
              const isActive = item.key === currentPage;
              return isActive ? (
                <span
                  key={item.key}
                  className="text-sm text-card-foreground font-medium bg-muted px-3 py-1.5 rounded-lg"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-card-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} />
          <span className="text-sm text-muted-foreground">
            {dict.common.signedInAs}{" "}
            <span className="font-medium text-card-foreground">{username}</span>
          </span>
          <LogoutButton label={dict.common.signOut} />
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted transition-colors"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="flex flex-col px-4 py-3" aria-label="Mobile navigation">
            {visibleItems.map((item) => {
              const label = t[item.key as keyof typeof t] || item.key;
              const isActive = item.key === currentPage;
              return isActive ? (
                <span
                  key={item.key}
                  className="text-sm text-card-foreground font-medium bg-muted px-3 py-2.5 rounded-lg"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-card-foreground px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <div className="flex items-center gap-3">
              <LanguageSwitcher currentLocale={locale} />
              <span className="text-sm text-muted-foreground">
                {dict.common.signedInAs}{" "}
                <span className="font-medium text-card-foreground">{username}</span>
              </span>
            </div>
            <LogoutButton label={dict.common.signOut} />
          </div>
        </div>
      )}
    </header>
  );
}
