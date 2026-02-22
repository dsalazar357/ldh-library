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
                    href={`/api/rituals/${ritual.id}/view`}
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
