import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app-header";
import StudyDocUploadForm from "@/components/study-doc-upload-form";

export default async function StudyDocUploadPage() {
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
        currentPage="Upload Doc"
      />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground font-sans">
            Upload Study Document
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload a new study document to the LDH Library.
          </p>
        </div>

        <StudyDocUploadForm />
      </main>
    </div>
  );
}
