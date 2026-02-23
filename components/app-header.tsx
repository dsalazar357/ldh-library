import Link from "next/link";
import LogoutButton from "@/components/logout-button";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  adminOnly?: boolean;
};

interface AppHeaderProps {
  username: string;
  isAdmin: boolean;
  currentPage: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Rituals", href: "/rituals" },
  { label: "Study Docs", href: "/study-documents" },
  { label: "Upload", href: "/rituals/upload", adminOnly: true },
  { label: "Upload Doc", href: "/study-documents/upload", adminOnly: true },
  { label: "Users", href: "/users", adminOnly: true },
];

export default function AppHeader({
  username,
  isAdmin,
  currentPage,
}: AppHeaderProps) {
  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-lg font-bold text-card-foreground font-sans hover:opacity-80 transition-opacity"
        >
          Le Droit Humain Library
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {visibleItems.map((item) => {
            const isActive = item.label === currentPage;
            return isActive ? (
              <span
                key={item.label}
                className="text-sm text-card-foreground font-medium bg-muted px-3 py-1.5 rounded-lg"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-card-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Signed in as{" "}
          <span className="font-medium text-card-foreground">{username}</span>
        </span>
        <LogoutButton />
      </div>
    </header>
  );
}
