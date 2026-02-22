import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const users = await prisma.user.findMany();
  const rituals = await prisma.ritual.findMany();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold text-card-foreground font-sans">
            LDH Library
          </h1>
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            <span
              className="text-sm text-card-foreground font-medium bg-muted px-3 py-1.5 rounded-lg"
              aria-current="page"
            >
              Home
            </span>
            {session.admin && (
              <Link
                href="/users"
                className="text-sm text-muted-foreground hover:text-card-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                Users
              </Link>
            )}
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
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground font-sans mb-4">
            Users
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <ol className="divide-y divide-border">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="px-5 py-3 text-card-foreground font-sans"
                >
                  {user.username}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground font-sans mb-4">
            Rituals
          </h2>
          <div className="flex flex-col gap-4">
            {rituals.map((ritual) => (
              <div
                key={ritual.id}
                className="bg-card rounded-xl border border-border p-5"
              >
                <h3 className="font-semibold text-card-foreground font-sans mb-2">
                  {ritual.title}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                  <span>
                    Degree: <span className="text-card-foreground">{ritual.degree}</span>
                  </span>
                  <span>
                    Country: <span className="text-card-foreground">{ritual.country}</span>
                  </span>
                  <a
                    href={ritual.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    View Resource
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
