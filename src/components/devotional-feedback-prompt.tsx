import type { DevotionalFeedback } from "@prisma/client";
import { DevotionalFeedbackResponse } from "@prisma/client";
import { MessageSquareHeart, PenLine } from "lucide-react";
import { submitDevotionalFeedback } from "@/lib/actions";
import { Button, LinkButton } from "@/components/ui/button";

const feedbackOptions = [
  {
    response: DevotionalFeedbackResponse.MET_ME,
    label: "Yes",
    description: "This met me where I am."
  },
  {
    response: DevotionalFeedbackResponse.SOMEWHAT,
    label: "Somewhat",
    description: "Part of it helped."
  },
  {
    response: DevotionalFeedbackResponse.NOT_TODAY,
    label: "Not today",
    description: "This one did not connect."
  }
] as const;

function feedbackLabel(response: DevotionalFeedbackResponse) {
  return feedbackOptions.find((option) => option.response === response)?.description ?? "Feedback saved.";
}

function savedMessage(response: DevotionalFeedbackResponse) {
  if (response === DevotionalFeedbackResponse.MET_ME) return "Thank you. That helps identify readings that are connecting with people.";
  if (response === DevotionalFeedbackResponse.SOMEWHAT) return "Thank you. That helps show where a reading helped but may need more care.";
  return "Thank you. That helps identify devotionals that may need rewriting or deeper pastoral attention.";
}

export function DevotionalFeedbackPrompt({
  devotionalId,
  feedback
}: {
  devotionalId: string;
  feedback?: DevotionalFeedback | null;
}) {
  return (
    <section className="rounded-xl border border-[#e4dccd] bg-[#f7fbf8] p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
          <MessageSquareHeart className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#24302f]">Did today&apos;s devotional meet you where you are?</p>
          <p className="mt-1 text-sm leading-6 text-[#68706e]">
            This quick response helps shape better readings. It stores only this button choice, not journal text, notes, prayer content, or private questions.
          </p>
          {feedback ? (
            <div className="mt-4 rounded-lg bg-white/72 p-3">
              <p className="text-sm font-medium text-[#345d6f]">Saved: {feedbackLabel(feedback.response)}</p>
              <p className="mt-1 text-xs leading-5 text-[#68706e]">{savedMessage(feedback.response)}</p>
              <div className="mt-3">
                <LinkButton href="/prayers" variant="ghost" size="sm">
                  <PenLine className="h-4 w-4" aria-hidden="true" />
                  Turn this into a prayer
                </LinkButton>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {feedbackOptions.map((option) => (
                <form key={option.response} action={submitDevotionalFeedback.bind(null, devotionalId, option.response)}>
                  <Button type="submit" variant={option.response === DevotionalFeedbackResponse.MET_ME ? "secondary" : "ghost"} className="h-auto w-full flex-col items-start gap-1 whitespace-normal text-left">
                    <span>{option.label}</span>
                    <span className="text-xs font-normal leading-5 opacity-80">{option.description}</span>
                  </Button>
                </form>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
