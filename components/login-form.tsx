"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";

interface LoginFormProps {
  dict: {
    username: string;
    password: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    signIn: string;
    signingIn: string;
  };
}

export default function LoginForm({ dict }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-foreground"
        >
          {dict.username}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          placeholder={dict.usernamePlaceholder}
          className="rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          {dict.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder={dict.passwordPlaceholder}
          className="rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-destructive font-medium" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? dict.signingIn : dict.signIn}
      </button>
    </form>
  );
}
