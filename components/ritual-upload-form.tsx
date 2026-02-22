"use client";

import { useActionState, useRef } from "react";
import { uploadRitualAction } from "@/app/actions/rituals";

export default function RitualUploadForm() {
  const [state, formAction, isPending] = useActionState(
    uploadRitualAction,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on success
  if (state?.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="bg-card rounded-xl border border-border p-6"
    >
      {state?.error && (
        <div
          className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {state.error}
        </div>
      )}
      {state?.success && (
        <div
          className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
          role="status"
        >
          {state.success}
        </div>
      )}

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="upload-title"
            className="text-xs font-medium text-muted-foreground"
          >
            Title <span className="text-destructive">*</span>
          </label>
          <input
            id="upload-title"
            name="title"
            type="text"
            required
            placeholder="e.g. Emulation Lodge of Improvement"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5 flex-1">
            <label
              htmlFor="upload-degree"
              className="text-xs font-medium text-muted-foreground"
            >
              Degree <span className="text-destructive">*</span>
            </label>
            <input
              id="upload-degree"
              name="degree"
              type="number"
              required
              min={0}
              defaultValue={1}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label
              htmlFor="upload-country"
              className="text-xs font-medium text-muted-foreground"
            >
              Country <span className="text-destructive">*</span>
            </label>
            <input
              id="upload-country"
              name="country"
              type="text"
              required
              placeholder="e.g. Mexico"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="upload-file"
            className="text-xs font-medium text-muted-foreground"
          >
            File <span className="text-destructive">*</span>
          </label>
          <input
            id="upload-file"
            name="file"
            type="file"
            required
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary-foreground file:cursor-pointer hover:file:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <p className="text-xs text-muted-foreground">
            Max file size: 50MB. Supports PDF, images, and other document
            formats.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="self-start rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Uploading..." : "Upload Ritual"}
        </button>
      </div>
    </form>
  );
}
