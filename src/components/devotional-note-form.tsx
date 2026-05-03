"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveDevotionalNoteWithFeedback, type DevotionalNoteActionState } from "@/lib/actions";

const initialState: DevotionalNoteActionState = {
  status: "idle",
  message: ""
};

function SaveNoteButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="secondary" type="submit" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
      {pending ? "Saving..." : "Save note"}
    </Button>
  );
}

export function DevotionalNoteForm({ devotionalId, initialNotes }: { devotionalId: string; initialNotes: string }) {
  const [state, formAction] = useActionState(saveDevotionalNoteWithFeedback.bind(null, devotionalId), initialState);
  const noteId = `notes-${devotionalId}`;

  return (
    <form action={formAction} className="space-y-2">
      <label htmlFor={noteId} className="text-sm font-medium text-[#31413f]">
        Personal note
      </label>
      <textarea
        id={noteId}
        name="notes"
        defaultValue={initialNotes}
        placeholder="What stood out from today's Scripture?"
        className="min-h-24 w-full rounded-lg border border-[#d9cfbd] bg-white/85 px-3 py-3 text-sm outline-none focus:border-[#345d6f] focus:ring-2 focus:ring-[#345d6f]/15"
      />
      <div className="flex flex-wrap items-center gap-3">
        <SaveNoteButton />
        {state.status !== "idle" ? (
          <p className={state.status === "success" ? "text-sm font-medium text-[#52633f]" : "text-sm font-medium text-[#9d3b3b]"} role="status">
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
