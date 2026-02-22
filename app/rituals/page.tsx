import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/app-header";
import RitualDeleteButton from "@/components/ritual-delete-button";

export default async function RitualsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const rituals = await prisma.ritual.findMany({
    orderBy: { id: "desc" },
    include: { author: true },
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="Rituals"
      />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-sans">
              Rituals
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and manage ritual documents.
            </p>
          </div>
          {session.admin && (
            <Link
              href="/rituals/upload"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
            >
              + Upload Ritual
            </Link>
          )}
        </div>

        {rituals.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No rituals found</p>
            <p className="text-sm mt-1">
              There are no rituals in the library yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {rituals.map((ritual) => (
              <div
                key={ritual.id}
                className="bg-card rounded-xl border border-border p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground font-sans mb-2">
                      {ritual.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <span>
                        Degree:{" "}
                        <span className="text-card-foreground">
                          {ritual.degree}
                        </span>
                      </span>
                      <span>
                        Country:{" "}
                        <span className="text-card-foreground">
                          {ritual.country}
                        </span>
                      </span>
                      <span>
                        Author:{" "}
                        <span className="text-card-foreground">
                          {ritual.author.username}
                        </span>
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
                  {session.admin && (
                    <div className="shrink-0">
                      <RitualDeleteButton
                        ritualId={ritual.id}
                        ritualTitle={ritual.title}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
