"use client";

import { useActionState, useRef } from "react";
import { uploadStudyDocumentAction } from "@/app/actions/study-documents";

interface StudyDocUploadFormProps {
  dict: {
    titleLabel: string;
    titlePlaceholder: string;
    organizationLabel: string;
    organizationPlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    fileLabel: string;
    fileHint: string;
    uploading: string;
    uploadDocument: string;
  };
}

export default function StudyDocUploadForm({ dict }: StudyDocUploadFormProps) {
  const [state, formAction, isPending] = useActionState(
    uploadStudyDocumentAction,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

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
            htmlFor="doc-title"
            className="text-xs font-medium text-muted-foreground"
          >
            {dict.titleLabel} <span className="text-destructive">*</span>
          </label>
          <input
            id="doc-title"
            name="title"
            type="text"
            required
            placeholder={dict.titlePlaceholder}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="doc-organization"
            className="text-xs font-medium text-muted-foreground"
          >
            {dict.organizationLabel} <span className="text-destructive">*</span>
          </label>
          <input
            id="doc-organization"
            name="organization"
            type="text"
            required
            placeholder={dict.organizationPlaceholder}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="doc-description"
            className="text-xs font-medium text-muted-foreground"
          >
            {dict.descriptionLabel} <span className="text-destructive">*</span>
          </label>
          <textarea
            id="doc-description"
            name="description"
            required
            rows={3}
            placeholder={dict.descriptionPlaceholder}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-y"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="doc-file"
            className="text-xs font-medium text-muted-foreground"
          >
            {dict.fileLabel} <span className="text-destructive">*</span>
          </label>
          <input
            id="doc-file"
            name="file"
            type="file"
            required
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary-foreground file:cursor-pointer hover:file:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <p className="text-xs text-muted-foreground">
            {dict.fileHint}
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="self-start rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? dict.uploading : dict.uploadDocument}
        </button>
      </div>
    </form>
  );
}
