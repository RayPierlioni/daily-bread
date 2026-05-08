"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form-fields";
import { trackClientEvent } from "@/lib/client-analytics";

type SpeechStatus = "idle" | "playing" | "paused" | "unsupported";
const VOICE_STORAGE_KEY = "next-faithful-step-bible-read-aloud-voice";

function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function voiceScore(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = lang.startsWith("en") ? 20 : 0;

  if (/natural|neural|online|premium/i.test(name)) score += 40;
  if (/google.*english|english.*google/i.test(name)) score += 30;
  if (/jenny|aria|ava|emma|brian|guy|samantha|victoria/i.test(name)) score += 20;
  if (/david|zira|desktop|compact/i.test(name)) score -= 8;
  if (voice.localService) score += 2;
  if (voice.default) score += 1;

  return score;
}

function sortedReadableVoices() {
  if (!isSpeechSupported()) return [];

  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
  return [...(englishVoices.length ? englishVoices : voices)].sort((a, b) => voiceScore(b) - voiceScore(a));
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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(() =>
    typeof window !== "undefined" ? (window.localStorage.getItem(VOICE_STORAGE_KEY) ?? "") : ""
  );
  const stoppedRef = useRef(true);

  const chunks = useMemo(() => verses.map((verse) => verse.replace(/\s+/g, " ").trim()), [verses]);

  useEffect(() => {
    if (!isSpeechSupported()) {
      return;
    }

    function updateVoices() {
      setVoices(sortedReadableVoices());
    }

    const updateTimer = window.setTimeout(updateVoices, 0);
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

    return () => {
      window.clearTimeout(updateTimer);
      window.speechSynthesis.cancel();
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  function chooseVoice() {
    const availableVoices = sortedReadableVoices();
    return availableVoices.find((voice) => voice.voiceURI === selectedVoiceURI) ?? availableVoices[0] ?? null;
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

  function handleVoiceChange(voiceURI: string) {
    setSelectedVoiceURI(voiceURI);

    if (voiceURI) {
      window.localStorage.setItem(VOICE_STORAGE_KEY, voiceURI);
    } else {
      window.localStorage.removeItem(VOICE_STORAGE_KEY);
    }

    if (status !== "idle") {
      stoppedRef.current = true;
      window.speechSynthesis.cancel();
      finish();
    }
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
      {voices.length > 1 ? (
        <div className="mt-4 grid gap-2 sm:max-w-sm">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#68706e]" htmlFor="bible-read-aloud-voice">
            Voice
          </label>
          <Select id="bible-read-aloud-voice" value={selectedVoiceURI} onChange={(event) => handleVoiceChange(event.target.value)} className="h-10">
            <option value="">Best available voice</option>
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </Select>
        </div>
      ) : null}
      <p className="sr-only" aria-live="polite">
        Bible read-aloud status: {status}
        {currentVerse > 0 ? `, verse ${currentVerse} of ${verses.length}` : ""}.
      </p>
    </div>
  );
}
