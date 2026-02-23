import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/app-header";
import UserEditCard from "@/components/user-edit-card";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function UsersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.admin) {
    redirect("/");
  }

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
  });

  const t = dict.usersPage;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="users"
        dict={dict}
        locale={locale}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-sans">
              {t.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t.subtitle}
            </p>
          </div>
          <Link
            href="/users/create"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
          >
            {t.createUser}
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {users.map((user) => (
            <UserEditCard key={user.id} user={user} dict={t} commonDict={dict.common} />
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">{t.noUsersFound}</p>
            <p className="text-sm mt-1">{t.noUsersYet}</p>
          </div>
        )}
      </main>
    </div>
  );
}
