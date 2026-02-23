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
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="flex items-center justify-center mb-4">
        <LanguageSwitcher currentLocale={locale} />
      </div>
      <div className="flex items-center justify-center mb-4">
        <Image src={"./logo-negro.svg"} alt={"Escudo LDH"} width={200} height={200} className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72"/>
      </div>
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
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
