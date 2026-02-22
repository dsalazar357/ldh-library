import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/app-header";
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
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="Users"
      />

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
