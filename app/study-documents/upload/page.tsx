import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app-header";
import StudyDocUploadForm from "@/components/study-doc-upload-form";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function StudyDocUploadPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="uploadDoc"
        dict={{ common: dict.common, nav: dict.nav }}
        locale={locale}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-sans">
            {dict.uploadDocPage.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {dict.uploadDocPage.subtitle}
          </p>
        </div>

        <StudyDocUploadForm dict={dict.uploadDocPage} />
      </main>
    </div>
  );
}
