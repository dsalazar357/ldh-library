import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/app-header";
import RitualDeleteButton from "@/components/ritual-delete-button";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function RitualsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const rituals = await prisma.ritual.findMany({
    orderBy: { id: "desc" },
    include: { author: true },
  });

  const t = dict.ritualsPage;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="rituals"
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
            href="/rituals/upload"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
          >
            {t.uploadRitual}
          </Link>
        </div>

        {rituals.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">{t.noRitualsFound}</p>
            <p className="text-sm mt-1">{t.noRitualsYet}</p>
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
                        {dict.common.degree}:{" "}
                        <span className="text-card-foreground">{ritual.degree}</span>
                      </span>
                      <span>
                        {t.country}:{" "}
                        <span className="text-card-foreground">{ritual.country}</span>
                      </span>
                      <span>
                        {t.author}:{" "}
                        <span className="text-card-foreground">{ritual.author.username}</span>
                      </span>
                      <a
                        href={ritual.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                        {dict.common.download}
                      </a>
                    </div>
                  </div>
                  {session.admin && (
                    <div className="shrink-0">
                      <RitualDeleteButton
                        ritualId={ritual.id}
                        ritualTitle={ritual.title}
                        dict={dict.deleteConfirm}
                        commonDict={dict.common}
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
