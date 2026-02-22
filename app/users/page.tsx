import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/app-header";
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
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="Users"
      />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-sans">
              Manage Users
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Edit user details, change passwords, and manage admin access.
            </p>
          </div>
          <Link
            href="/users/create"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
          >
            + Create User
          </Link>
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
