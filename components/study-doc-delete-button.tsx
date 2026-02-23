"use client";

import { useActionState, useState } from "react";
import { deleteStudyDocumentAction } from "@/app/actions/study-documents";

interface StudyDocDeleteButtonProps {
  documentId: number;
  documentTitle: string;
  dict: {
    deleteDoc: (title: string) => string;
    deleting: string;
  };
  commonDict: {
    delete: string;
    confirm: string;
    cancel: string;
  };
}

export default function StudyDocDeleteButton({
  documentId,
  documentTitle,
  dict,
  commonDict,
}: StudyDocDeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, isPending] = useActionState(
    deleteStudyDocumentAction,
    null
  );

  if (state?.success) {
    return (
      <span className="text-xs text-green-700 font-medium">
        {state.success}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {state?.error && (
        <span className="text-xs text-destructive">{state.error}</span>
      )}

      {!showConfirm ? (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive/50 transition-all"
        >
          {commonDict.delete}
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {dict.deleteDoc(documentTitle)}
          </span>
          <form action={formAction}>
            <input type="hidden" name="documentId" value={documentId} />
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-destructive/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? dict.deleting : commonDict.confirm}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setShowConfirm(false)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-card-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          >
            {commonDict.cancel}
          </button>
        </div>
      )}
    </div>
  );
}
