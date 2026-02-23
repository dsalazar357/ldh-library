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
  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  const t = dict.nav;

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-lg font-bold text-card-foreground font-sans hover:opacity-80 transition-opacity"
        >
          {dict.common.appName}
        </Link>
        <nav className="flex items-center gap-1 flex-wrap" aria-label="Main navigation">
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
      <div className="flex items-center gap-3">
        <LanguageSwitcher currentLocale={locale} />
        <span className="text-sm text-muted-foreground">
          {dict.common.signedInAs}{" "}
          <span className="font-medium text-card-foreground">{username}</span>
        </span>
        <LogoutButton label={dict.common.signOut} />
      </div>
    </header>
  );
}
