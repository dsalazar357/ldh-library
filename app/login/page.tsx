import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LoginForm from "@/components/login-form";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full min-h-screen bg-background flex-col items-center center justify-center px-4">
      <div className="flex items-center justify-center p-4">
        <Image src={"./logo-negro.svg"} alt={"Escudo LDH"} width={300} height={"300"}/>
      </div>
      <div className="flex items-center justify-center p-4">
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
