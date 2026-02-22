"use client";

import { useActionState, useRef } from "react";
import { createUserAction } from "@/app/actions/users";
import { DEGREES } from "@/lib/constants";

export default function CreateUserForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, isPending] = useActionState(
    async (
      prev: { error?: string; success?: string } | null,
      formData: FormData
    ) => {
      const result = await createUserAction(prev, formData);
      if (result?.success) {
        formRef.current?.reset();
      }
      return result;
    },
    null
  );

  return (
    <form
      ref={formRef}
      action={action}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-semibold text-card-foreground font-sans">
          New User Details
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Fill in the information below to create a new user account.
        </p>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="create-username"
              className="text-xs font-medium text-muted-foreground"
            >
              Username <span className="text-destructive">*</span>
            </label>
            <input
              id="create-username"
              name="username"
              type="text"
              required
              placeholder="e.g. jdoe"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="create-email"
              className="text-xs font-medium text-muted-foreground"
            >
              Email <span className="text-destructive">*</span>
            </label>
            <input
              id="create-email"
              name="email"
              type="email"
              required
              placeholder="e.g. jdoe@example.com"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="create-password"
              className="text-xs font-medium text-muted-foreground"
            >
              Password <span className="text-destructive">*</span>
            </label>
            <input
              id="create-password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Minimum 6 characters"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="create-degree"
              className="text-xs font-medium text-muted-foreground"
            >
              Degree <span className="text-destructive">*</span>
            </label>
            <select
              id="create-degree"
              name="degree"
              required
              defaultValue={1}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            >
              {DEGREES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-3 pb-0.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="admin"
                type="checkbox"
                className="w-4 h-4 rounded border-border text-primary focus:ring-ring accent-primary"
              />
              <span className="text-sm text-card-foreground">
                Admin privileges
              </span>
            </label>
          </div>
        </div>

        {state?.error && (
          <p className="text-sm text-destructive font-medium" role="alert">
            {state.error}
          </p>
        )}
        {state?.success && (
          <p className="text-sm text-green-700 font-medium" role="status">
            {state.success}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create User"}
          </button>
          <button
            type="reset"
            disabled={isPending}
            className="rounded-lg border border-border bg-card px-5 py-2 text-sm font-medium text-card-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}
