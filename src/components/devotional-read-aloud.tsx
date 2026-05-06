"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackClientEvent } from "@/lib/client-analytics";

type SpeechStatus = "idle" | "playing" | "paused" | "unsupported";

export function DevotionalReadAloud({
  title,
  scriptureReference,
  scriptureText,
  body,
  reflectionQuestion,
  prayerPrompt,
  actionStep
}: {
  title: string;
  scriptureReference: string;
  scriptureText: string;
  body: string;
  reflectionQuestion: string;
  prayerPrompt: string;
  actionStep: string;
}) {
  const [status, setStatus] = useState<SpeechStatus>(() =>
    typeof window !== "undefined" && !("speechSynthesis" in window) ? "unsupported" : "idle"
  );

  const readAloudText = useMemo(
    () =>
      [
        title,
        `Scripture. ${scriptureReference}.`,
        scriptureText,
        body,
        `Reflection question. ${reflectionQuestion}`,
        `Prayer prompt. ${prayerPrompt}`,
        `Practice. ${actionStep}`
      ]
        .join("\n\n")
        .replace(/\s+/g, " ")
        .trim(),
    [actionStep, body, prayerPrompt, reflectionQuestion, scriptureReference, scriptureText, title]
  );

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return;
    }

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
      trackClientEvent("devotional_read_aloud_resumed");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readAloudText);
    utterance.voice = chooseVoice();
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
    trackClientEvent("devotional_read_aloud_started", { textLength: readAloudText.length });
  }

  function pause() {
    window.speechSynthesis.pause();
    setStatus("paused");
    trackClientEvent("devotional_read_aloud_paused");
  }

  function stop() {
    window.speechSynthesis.cancel();
    setStatus("idle");
    trackClientEvent("devotional_read_aloud_stopped");
  }

  if (status === "unsupported") {
    return (
      <div className="rounded-xl border border-[#e4dccd] bg-[#fffdf8] p-4 text-sm leading-6 text-[#68706e]">
        Read aloud is not supported in this browser, but you can still read and save today&apos;s devotional.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#d9cfbd] bg-[#fffdf8] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f0ea] text-[#345d6f]">
            <Volume2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-[#24302f]">Listen to today&apos;s devotional</p>
            <p className="text-sm text-[#68706e]">A simple browser voice can read this while you walk, drive, or get ready.</p>
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
        Devotional read aloud status: {status}.
      </p>
    </div>
  );
}
