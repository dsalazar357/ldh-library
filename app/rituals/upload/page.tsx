import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app-header";
import RitualUploadForm from "@/components/ritual-upload-form";

export default async function RitualUploadPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!session.admin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        username={session.username}
        isAdmin={session.admin}
        currentPage="Upload"
      />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-sans">
            Upload Ritual
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload a new ritual document to the LDH Library.
          </p>
        </div>

        <RitualUploadForm />
      </main>
    </div>
  );
}
