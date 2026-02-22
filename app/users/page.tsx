import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import UserEditCard from "@/components/user-edit-card";

export default async function UsersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.admin) {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
  });

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
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-card-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              Home
            </Link>
            <span
              className="text-sm text-card-foreground font-medium bg-muted px-3 py-1.5 rounded-lg"
              aria-current="page"
            >
              Users
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-sans">
            Manage Users
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit user details, change passwords, and manage admin access.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {users.map((user) => (
            <UserEditCard key={user.id} user={user} />
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm mt-1">
              There are no users in the database yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
