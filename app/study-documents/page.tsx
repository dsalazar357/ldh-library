import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/components/app-header";
import StudyDocDeleteButton from "@/components/study-doc-delete-button";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function StudyDocumentsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const documents = await prisma.studyDocument.findMany({
    orderBy: { id: "desc" },
    include: { author: true },
  });

  const t = dict.studyDocsPage;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="studyDocs"
        dict={{ common: dict.common, nav: dict.nav }}
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
            href="/study-documents/upload"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
          >
            {t.uploadDocument}
          </Link>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium text-foreground">{t.noDocsFound}</p>
            <p className="text-sm mt-1">{t.noDocsYet}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-card rounded-xl border border-border p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground font-sans mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <span>
                        {t.organization}:{" "}
                        <span className="text-card-foreground">{doc.organization}</span>
                      </span>
                      <span>
                        {t.author}:{" "}
                        <span className="text-card-foreground">{doc.author.username}</span>
                      </span>
                      <a
                        href={doc.url}
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
                      <StudyDocDeleteButton
                        documentId={doc.id}
                        documentTitle={doc.title}
                        dict={{
                          deleteDoc: dict.deleteConfirm.deleteDoc(doc.title),
                          deleting: dict.deleteConfirm.deleting,
                        }}
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
