import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app-header";
import RitualFilters from "@/components/ritual-filters";
import StudyDocFilters from "@/components/study-doc-filters";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface HomeProps {
  searchParams: Promise<{
    tab?: string;
    country?: string;
    degree?: string;
    q?: string;
    org?: string;
    sq?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const params = await searchParams;
  const activeTab = params.tab === "study" ? "study" : "rituals";

  const countryFilter = params.country || "";
  const degreeFilter = params.degree || "";
  const searchQuery = params.q || "";
  const orgFilter = params.org || "";
  const studyQuery = params.sq || "";

  const ritualWhere: Record<string, unknown> = {};
  if (countryFilter) ritualWhere.country = countryFilter;
  if (degreeFilter) {
    const degreeNum = Number(degreeFilter);
    if (!isNaN(degreeNum)) ritualWhere.degree = degreeNum;
  }
  if (searchQuery) {
    ritualWhere.title = { contains: searchQuery, mode: "insensitive" };
  }

  const docWhere: Record<string, unknown> = {};
  if (orgFilter) {
    docWhere.organization = { contains: orgFilter, mode: "insensitive" };
  }
  if (studyQuery) {
    docWhere.title = { contains: studyQuery, mode: "insensitive" };
  }

  const [rituals, studyDocs] = await Promise.all([
    prisma.ritual.findMany({
      where: ritualWhere,
      orderBy: { id: "desc" },
      include: { author: true },
    }),
    prisma.studyDocument.findMany({
      where: docWhere,
      orderBy: { id: "desc" },
      include: { author: true },
    }),
  ]);

  const hasRitualFilters = !!(countryFilter || degreeFilter || searchQuery);
  const hasStudyFilters = !!(orgFilter || studyQuery);
  const t = dict.home;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="home"
        dict={dict}
        locale={locale}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-sans text-balance">
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t.subtitle}
          </p>
        </div>

        <div className="flex gap-1 mb-6 border-b border-border" role="tablist" aria-label="Content type">
          <a
            href="/?tab=rituals"
            role="tab"
            aria-selected={activeTab === "rituals"}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "rituals"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {t.ritualsTab}
          </a>
          <a
            href="/?tab=study"
            role="tab"
            aria-selected={activeTab === "study"}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "study"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {t.studyDocsTab}
          </a>
        </div>

        {activeTab === "rituals" && (
          <>
            <RitualFilters
              currentCountry={countryFilter}
              currentDegree={degreeFilter}
              currentQuery={searchQuery}
              dict={{
                searchByTitle: t.searchByTitle,
                allCountries: t.allCountries,
                allDegrees: t.allDegrees,
              }}
            />

            <div className="mt-6 mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {rituals.length === 0
                  ? t.noRitualsFound
                  : t.ritualsFound(rituals.length)}
              </p>
              {hasRitualFilters && (
                <a
                  href="/?tab=rituals"
                  className="text-xs text-primary font-medium hover:underline underline-offset-2"
                >
                  {dict.common.clearAllFilters}
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {rituals.map((ritual) => (
                <div
                  key={ritual.id}
                  className="bg-card rounded-xl border border-border p-4 sm:p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground font-sans mb-1 text-pretty">
                        {ritual.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {dict.common.uploadedBy} {ritual.author?.username ?? dict.common.unknown}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-card-foreground">
                          {ritual.degree}
                          {ritual.degree === 1
                            ? "st"
                            : ritual.degree === 2
                              ? "nd"
                              : ritual.degree === 3
                                ? "rd"
                                : "th"}{" "}
                          {dict.common.degree}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-card-foreground">
                          {ritual.country}
                        </span>
                      </div>
                    </div>
                    <a
                      href={ritual.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex self-start shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
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
              ))}

              {rituals.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-40" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <p className="font-medium text-foreground mb-1">{t.noRitualsMatch}</p>
                  <p className="text-sm">{t.tryAdjustingRituals}</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "study" && (
          <>
            <StudyDocFilters
              currentOrganization={orgFilter}
              currentQuery={studyQuery}
              dict={{
                searchByTitle: t.searchByTitle,
                filterByOrganization: t.filterByOrganization,
              }}
            />

            <div className="mt-6 mb-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {studyDocs.length === 0
                  ? t.noDocsFound
                  : t.docsFound(studyDocs.length)}
              </p>
              {hasStudyFilters && (
                <a
                  href="/?tab=study"
                  className="text-xs text-primary font-medium hover:underline underline-offset-2"
                >
                  {dict.common.clearAllFilters}
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {studyDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-card rounded-xl border border-border p-4 sm:p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground font-sans mb-1 text-pretty">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {doc.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-card-foreground">
                          {doc.organization}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {dict.common.uploadedBy} {doc.author?.username ?? dict.common.unknown}
                      </p>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex self-start shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
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
              ))}

              {studyDocs.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-40" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <p className="font-medium text-foreground mb-1">{t.noDocsMatch}</p>
                  <p className="text-sm">{t.tryAdjustingDocs}</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
