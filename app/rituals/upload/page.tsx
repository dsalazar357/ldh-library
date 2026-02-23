import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app-header";
import RitualUploadForm from "@/components/ritual-upload-form";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export default async function RitualUploadPage() {
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
        currentPage="upload"
        dict={dict}
        locale={locale}
      />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-sans">
            {dict.uploadRitualPage.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {dict.uploadRitualPage.subtitle}
          </p>
        </div>

        <RitualUploadForm dict={dict.uploadRitualPage} />
      </main>
    </div>
  );
}
