import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/login-form";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-2xl font-bold text-card-foreground font-sans tracking-tight">
              LDH Library
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access the library
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
