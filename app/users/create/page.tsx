import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/app-header";
import CreateUserForm from "@/components/create-user-form";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function CreateUserPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.admin) {
    redirect("/");
  }

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const t = dict.createUserPage;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="users"
        dict={dict}
        locale={locale}
      />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-sans">
              {t.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t.subtitle}
            </p>
          </div>
          <Link
            href="/users"
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {t.backToUsers}
          </Link>
        </div>

        <CreateUserForm dict={t} />
      </main>
    </div>
  );
}
