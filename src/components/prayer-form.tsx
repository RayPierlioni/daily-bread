"use client";

import { useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mic, Square, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { createPrayerAction } from "@/lib/actions";
import { prayerSchema } from "@/lib/validations";

const prayerFormSchema = prayerSchema.extend({
  tagsText: z.string().optional()
});

type PrayerFormInput = z.input<typeof prayerFormSchema>;
type PrayerFormValues = z.output<typeof prayerFormSchema>;

export function PrayerForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const chunks = useRef<BlobPart[]>([]);
  const supported = typeof window !== "undefined" && "MediaRecorder" in window && navigator.mediaDevices;

  const form = useForm<PrayerFormInput, unknown, PrayerFormValues>({
    resolver: zodResolver(prayerFormSchema),
    defaultValues: {
      title: "",
      text: "",
      transcript: "",
      tags: [],
      tagsText: "",
      status: "ONGOING",
      privacyLevel: "PRIVATE"
    }
  });

  async function startRecording() {
    if (!supported) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    chunks.current = [];
    mediaRecorder.ondataavailable = (event) => chunks.current.push(event.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.start();
    setRecorder(mediaRecorder);
  }

  function stopRecording() {
    recorder?.stop();
    setRecorder(null);
  }

  function onSubmit(values: PrayerFormValues) {
    startTransition(async () => {
      await createPrayerAction({
        ...values,
        audioUrl,
        tags: String(values.tagsText ?? "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      });
      form.reset();
      setAudioUrl("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="A short title" {...form.register("title")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mood">Mood</Label>
          <Input id="mood" placeholder="peaceful, anxious, grateful..." {...form.register("mood")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="text">Prayer</Label>
        <Textarea id="text" placeholder="God, today I feel... This is private by default." {...form.register("text")} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select id="status" {...form.register("status")}>
            <option value="ONGOING">Ongoing</option>
            <option value="WAITING">Waiting</option>
            <option value="ANSWERED">Answered</option>
            <option value="PRAISE_REPORT">Praise report</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="privacyLevel">Privacy</Label>
          <Select id="privacyLevel" {...form.register("privacyLevel")}>
            <option value="PRIVATE">Private</option>
            <option value="GROUP">Share with group intentionally</option>
            <option value="ANONYMOUS">Anonymous sharing placeholder</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagsText">Tags</Label>
          <Input id="tagsText" placeholder="family, healing, work" {...form.register("tagsText")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="relatedVerse">Related verse</Label>
          <Input id="relatedVerse" placeholder="Psalm 23" {...form.register("relatedVerse")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transcript">Audio transcript or notes</Label>
          <Input id="transcript" placeholder="Add transcript text manually for now" {...form.register("transcript")} />
        </div>
      </div>
      <div className="rounded-lg border border-[#e4dccd] bg-[#fbf7ef] p-4">
        <div className="flex flex-wrap items-center gap-2">
          {supported ? (
            recorder ? (
              <Button type="button" variant="danger" onClick={stopRecording}>
                <Square className="h-4 w-4" aria-hidden="true" />
                Stop recording
              </Button>
            ) : (
              <Button type="button" variant="secondary" onClick={startRecording}>
                <Mic className="h-4 w-4" aria-hidden="true" />
                Record audio prayer
              </Button>
            )
          ) : (
            <p className="text-sm text-[#68706e]">Audio recording is not supported in this browser. You can still save transcript text.</p>
          )}
          {audioUrl ? <audio src={audioUrl} controls className="h-10" /> : null}
        </div>
      </div>
      <Button type="submit" disabled={isPending}>
        <Save className="h-4 w-4" aria-hidden="true" />
        {isPending ? "Saving..." : "Save prayer privately"}
      </Button>
    </form>
  );
}
