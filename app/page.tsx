import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app-header";
import RitualFilters from "@/components/ritual-filters";

interface HomeProps {
  searchParams: Promise<{ country?: string; degree?: string; q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const countryFilter = params.country || "";
  const degreeFilter = params.degree || "";
  const searchQuery = params.q || "";

  const where: Record<string, unknown> = {};

  if (countryFilter) {
    where.country = countryFilter;
  }

  if (degreeFilter) {
    const degreeNum = Number(degreeFilter);
    if (!isNaN(degreeNum)) {
      where.degree = degreeNum;
    }
  }

  if (searchQuery) {
    where.title = { contains: searchQuery, mode: "insensitive" };
  }

  const rituals = await prisma.ritual.findMany({
    where,
    orderBy: { id: "desc" },
    include: { author: true },
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="Home"
      />

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-sans text-balance">
            Ritual Library
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search and filter rituals by title, country, or degree.
          </p>
        </div>

        <RitualFilters
          currentCountry={countryFilter}
          currentDegree={degreeFilter}
          currentQuery={searchQuery}
        />

        <div className="mt-6 mb-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {rituals.length === 0
              ? "No rituals found"
              : `${rituals.length} ritual${rituals.length !== 1 ? "s" : ""} found`}
          </p>
          {(countryFilter || degreeFilter || searchQuery) && (
            <a
              href="/"
              className="text-xs text-primary font-medium hover:underline underline-offset-2"
            >
              Clear all filters
            </a>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {rituals.map((ritual) => (
            <div
              key={ritual.id}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground font-sans mb-1 text-pretty">
                    {ritual.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Uploaded by {ritual.author?.username ?? "Unknown"}
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
                      Degree
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
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
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

          {rituals.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 opacity-40"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="font-medium text-foreground mb-1">No rituals match your filters</p>
              <p className="text-sm">
                Try adjusting the country, degree, or search term.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
