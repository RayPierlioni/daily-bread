"use client";

import { useState, useTransition } from "react";
import { SendHorizonal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import { trackClientEvent } from "@/lib/client-analytics";

type GracieAnswer = {
  question: string;
  answer: string;
  sources: string[];
};

const starterQuestions = [
  "How do I pray when I feel distracted?",
  "Can I still have faith if I have doubts?",
  "Why does God feel silent sometimes?"
];

function lengthBucket(value: string) {
  const length = value.trim().length;
  if (length < 80) return "short";
  if (length < 260) return "medium";
  return "long";
}

export function GracieChatPanel() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<GracieAnswer | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submitQuestion(value = question) {
    const nextQuestion = value.trim();
    if (!nextQuestion || isPending) return;

    setError("");
    setQuestion(nextQuestion);
    trackClientEvent("gracie_chat_submitted", {
      source: "gracie_chat",
      questionLengthBucket: lengthBucket(nextQuestion)
    });

    startTransition(async () => {
      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: nextQuestion })
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error ?? "Gracie could not answer that yet.");
          trackClientEvent("gracie_chat_error", {
            source: "gracie_chat",
            questionLengthBucket: lengthBucket(nextQuestion)
          });
          return;
        }

        setAnswer({
          question: nextQuestion,
          answer: data.answer,
          sources: Array.isArray(data.sources) ? data.sources.map(String) : []
        });
        setQuestion("");
        trackClientEvent("gracie_chat_answered", {
          source: "gracie_chat",
          questionLengthBucket: lengthBucket(nextQuestion)
        });
      } catch {
        setError("Gracie could not connect right now. Try again in a moment.");
        trackClientEvent("gracie_chat_error", {
          source: "gracie_chat",
          questionLengthBucket: lengthBucket(nextQuestion)
        });
      }
    });
  }

  return (
    <div className="mt-4 rounded-2xl border border-[#e4dccd] bg-white/72 p-3">
      <div className="flex items-start gap-2">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#b38b4d]" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-[#24302f]">Ask Gracie</p>
          <p className="mt-1 text-xs leading-5 text-[#68706e]">
            Gracie uses Ask in Faith to answer and saves questions privately. She is not a pastor, therapist, or replacement for real-world support.
          </p>
        </div>
      </div>

      <label htmlFor="gracie-question" className="sr-only">
        Ask Gracie a faith question
      </label>
      <Textarea
        id="gracie-question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Ask about prayer, Scripture, doubt, anxiety, or today's devotional..."
        className="mt-3 min-h-24 resize-none bg-[#fffdf8]"
      />

      {error ? <p className="mt-2 rounded-lg bg-[#fff4f1] p-2 text-xs leading-5 text-[#9d3b3b]">{error}</p> : null}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] leading-5 text-[#68706e]">Please do not use Gracie for emergencies. Seek immediate human help if you are in danger.</p>
        <Button type="button" size="sm" onClick={() => submitQuestion()} disabled={isPending || !question.trim()}>
          <SendHorizonal className="h-4 w-4" aria-hidden="true" />
          {isPending ? "Answering..." : "Ask Gracie"}
        </Button>
      </div>

      {!answer ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {starterQuestions.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => submitQuestion(starter)}
              disabled={isPending}
              className="rounded-full border border-[#e4dccd] bg-[#fffdf8] px-3 py-1.5 text-left text-xs leading-5 text-[#52605d] transition hover:border-[#345d6f] hover:text-[#24302f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {starter}
            </button>
          ))}
        </div>
      ) : null}

      {answer ? (
        <div className="mt-4 rounded-xl border border-[#eee5d8] bg-[#fffdf8] p-3">
          <p className="text-xs font-semibold text-[#345d6f]">{answer.question}</p>
          <div className="prose-soft mt-3 max-h-72 overflow-y-auto whitespace-pre-line pr-1 text-sm leading-7 text-[#31413f]">{answer.answer}</div>
          {answer.sources.length ? (
            <p className="mt-3 border-t border-[#eee5d8] pt-2 text-[11px] leading-5 text-[#68706e]">Sources/context: {answer.sources.join(", ")}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
