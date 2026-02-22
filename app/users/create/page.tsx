import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import CreateUserForm from "@/components/create-user-form";

export default async function CreateUserPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.admin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-bold text-card-foreground font-sans hover:opacity-80 transition-opacity"
          >
            LDH Library
          </Link>
          <nav
            className="flex items-center gap-1"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-card-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              Home
            </Link>
            <Link
              href="/users"
              className="text-sm text-muted-foreground hover:text-card-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              Users
            </Link>
            <span
              className="text-sm text-card-foreground font-medium bg-muted px-3 py-1.5 rounded-lg"
              aria-current="page"
            >
              Create
            </span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-card-foreground">
              {session.username}
            </span>
          </span>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-sans">
              Create User
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new user to the LDH Library system.
            </p>
          </div>
          <Link
            href="/users"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Back to Users
          </Link>
        </div>

        <CreateUserForm />
      </main>
    </div>
  );
}
