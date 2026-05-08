"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackClientEvent } from "@/lib/client-analytics";

type SpeechStatus = "idle" | "playing" | "paused" | "unsupported";

function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function BibleChapterReadAloud({
  reference,
  verses
}: {
  reference: string;
  verses: string[];
}) {
  const [status, setStatus] = useState<SpeechStatus>(() => (typeof window !== "undefined" && !isSpeechSupported() ? "unsupported" : "idle"));
  const [currentVerse, setCurrentVerse] = useState(0);
  const stoppedRef = useRef(true);

  const chunks = useMemo(
    () => verses.map((verse, index) => `${index === 0 ? `${reference}. ` : ""}Verse ${index + 1}. ${verse}`.replace(/\s+/g, " ").trim()),
    [reference, verses]
  );

  useEffect(() => {
    if (!isSpeechSupported()) {
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

  function finish() {
    stoppedRef.current = true;
    setCurrentVerse(0);
    setStatus("idle");
  }

  function speakChunk(index: number) {
    if (stoppedRef.current || index >= chunks.length) {
      finish();
      return;
    }

    setCurrentVerse(index + 1);

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.voice = chooseVoice();
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.onend = () => {
      window.setTimeout(() => speakChunk(index + 1), 0);
    };
    utterance.onerror = () => {
      window.setTimeout(() => speakChunk(index + 1), 0);
    };

    window.speechSynthesis.speak(utterance);
  }

  function play() {
    if (status === "unsupported" || !chunks.length) return;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus("playing");
      trackClientEvent("bible_read_aloud_resumed", { reference });
      return;
    }

    window.speechSynthesis.cancel();
    stoppedRef.current = false;
    setStatus("playing");
    speakChunk(0);
    trackClientEvent("bible_read_aloud_started", { reference, verseCount: verses.length });
  }

  function pause() {
    if (status !== "playing") return;

    window.speechSynthesis.pause();
    setStatus("paused");
    trackClientEvent("bible_read_aloud_paused", { reference });
  }

  function stop() {
    stoppedRef.current = true;
    window.speechSynthesis.cancel();
    finish();
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
            <p className="text-sm text-[#68706e]">
              {currentVerse > 0 ? `Reading verse ${currentVerse} of ${verses.length}.` : "Use your browser's voice to hear this chapter while you move through your day."}
            </p>
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
        Bible read-aloud status: {status}
        {currentVerse > 0 ? `, verse ${currentVerse} of ${verses.length}` : ""}.
      </p>
    </div>
  );
}
