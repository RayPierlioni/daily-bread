"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackClientEvent } from "@/lib/client-analytics";

type SpeechStatus = "idle" | "playing" | "paused" | "unsupported";

export function BibleChapterReadAloud({
  reference,
  verses
}: {
  reference: string;
  verses: string[];
}) {
  const [status, setStatus] = useState<SpeechStatus>(() =>
    typeof window !== "undefined" && !("speechSynthesis" in window) ? "unsupported" : "idle"
  );

  const text = useMemo(
    () => [reference, ...verses.map((verse, index) => `Verse ${index + 1}. ${verse}`)].join(" ").trim(),
    [reference, verses]
  );

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    function handleVoicesChanged() {
      window.speechSynthesis.getVoices();
    }

    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
    };
  }, []);

  function chooseVoice() {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((voice) => voice.lang.toLowerCase().startsWith("en") && /female|samantha|victoria|zira|aria|jenny/i.test(voice.name)) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ??
      null
    );
  }

  function play() {
    if (status === "unsupported") return;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus("playing");
      trackClientEvent("bible_read_aloud_resumed", { reference });
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = chooseVoice();
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
    trackClientEvent("bible_read_aloud_started", { reference, verseCount: verses.length });
  }

  function pause() {
    window.speechSynthesis.pause();
    setStatus("paused");
    trackClientEvent("bible_read_aloud_paused", { reference });
  }

  function stop() {
    window.speechSynthesis.cancel();
    setStatus("idle");
    trackClientEvent("bible_read_aloud_stopped", { reference });
  }

  if (status === "unsupported") {
    return <p className="text-sm leading-6 text-[#68706e]">Bible read-aloud is not supported in this browser.</p>;
  }

  return (
    <div className="rounded-xl border border-[#d9cfbd] bg-[#fffdf8] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f0ea] text-[#345d6f]">
            <Volume2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-[#24302f]">Listen to {reference}</p>
            <p className="text-sm text-[#68706e]">Use your browser&apos;s voice to hear this chapter while you move through your day.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {status === "playing" ? (
            <Button type="button" variant="secondary" size="sm" onClick={pause}>
              <Pause className="h-4 w-4" aria-hidden="true" />
              Pause
            </Button>
          ) : (
            <Button type="button" variant="secondary" size="sm" onClick={play}>
              {status === "paused" ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              {status === "paused" ? "Resume" : "Read aloud"}
            </Button>
          )}
          {status !== "idle" ? (
            <Button type="button" variant="ghost" size="sm" onClick={stop}>
              <Square className="h-4 w-4" aria-hidden="true" />
              Stop
            </Button>
          ) : null}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Bible read-aloud status: {status}.
      </p>
    </div>
  );
}
