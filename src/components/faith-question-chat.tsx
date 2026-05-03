"use client";

import { useState, useTransition } from "react";
import { SendHorizonal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/form-fields";

const suggestions = [
  "Why are we here?",
  "Is there a God?",
  "How do I know God exists?",
  "What proof is there that Jesus lived?",
  "Why does suffering exist?",
  "Can I be a Christian and still have doubts?",
  "Is the Bible historically reliable?",
  "What archaeological evidence supports biblical history?",
  "Why does God feel silent?",
  "How do I pray when I do not know what to say?"
];

type Answer = {
  question: string;
  answer: string;
  sources: string[];
};

export function FaithQuestionChat({ previous }: { previous: Answer[] }) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(previous);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submitQuestion(value = question) {
    const nextQuestion = value.trim();
    if (!nextQuestion) return;
    setError("");
    setQuestion(nextQuestion);

    startTransition(async () => {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: nextQuestion })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setAnswers((current) => [{ question: nextQuestion, answer: data.answer, sources: data.sources ?? [] }, ...current]);
      setQuestion("");
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <section className="space-y-4">
        <Card className="p-4">
          <label htmlFor="faith-question" className="text-sm font-medium text-[#31413f]">
            Ask honestly
          </label>
          <Textarea
            id="faith-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about God, Jesus, Scripture, doubt, theology, history, archaeology, or prayer."
            className="mt-2 min-h-32"
          />
          {error ? <p className="mt-2 text-sm text-[#9d3b3b]">{error}</p> : null}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs leading-5 text-[#68706e]">Answers are saved privately for later. Doubt is treated with care here.</p>
            <Button type="button" onClick={() => submitQuestion()} disabled={isPending}>
              <SendHorizonal className="h-4 w-4" aria-hidden="true" />
              {isPending ? "Answering..." : "Ask in Faith"}
            </Button>
          </div>
        </Card>

        {answers.map((item, index) => (
          <Card key={`${item.question}-${index}`} className="p-5">
            <p className="text-sm font-semibold text-[#345d6f]">{item.question}</p>
            <div className="prose-soft mt-4 whitespace-pre-line text-sm leading-7 text-[#31413f]">{item.answer}</div>
            {item.sources.length ? (
              <div className="mt-4 border-t border-[#eee5d8] pt-3 text-xs text-[#68706e]">Sources/context: {item.sources.join(", ")}</div>
            ) : null}
          </Card>
        ))}
      </section>

      <aside className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#24302f]">
          <Sparkles className="h-4 w-4 text-[#b38b4d]" aria-hidden="true" />
          Suggested questions
        </div>
        <p className="text-xs leading-5 text-[#68706e]">
          These starter questions use curated Daily Bread Hub answers first, which helps keep early launch costs low.
        </p>
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => submitQuestion(suggestion)}
              className="w-full rounded-lg border border-[#e4dccd] bg-white/78 px-3 py-2 text-left text-sm leading-5 text-[#31413f] transition hover:border-[#345d6f] hover:bg-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
