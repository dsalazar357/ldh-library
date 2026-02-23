import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import LoginForm from "@/components/login-form";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import LanguageSwitcher from "@/components/language-switcher";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <div className="w-full min-h-screen bg-background flex-col items-center center justify-center px-4">
      <div className="flex items-center justify-center pt-4">
        <LanguageSwitcher currentLocale={locale} />
      </div>
      <div className="flex items-center justify-center p-4">
        <Image src={"./logo-negro.svg"} alt={"Escudo LDH"} width={300} height={300}/>
      </div>
      <div className="flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-2xl font-bold text-card-foreground font-sans tracking-tight">
              {dict.login.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {dict.login.subtitle}
            </p>
          </div>
          <LoginForm dict={dict.login} />
        </div>
      </div>
    </div>
  );
}
