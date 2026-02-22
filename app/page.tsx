import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app-header";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const users = await prisma.user.findMany();
  const rituals = await prisma.ritual.findMany();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="Home"
      />

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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Download
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
