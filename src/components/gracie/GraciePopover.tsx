"use client";

import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { graciePoseSources, type GracieMessage, type GraciePose } from "@/components/gracie/gracieMessages";
import { Button, LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GraciePopover({
  message,
  pose = "default",
  onClose,
  onDismissToday,
  onSnooze,
  onCtaClick
}: {
  message: GracieMessage;
  pose?: GraciePose;
  onClose: () => void;
  onDismissToday: () => void;
  onSnooze: () => void;
  onCtaClick: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const poseSource = graciePoseSources[pose] ?? graciePoseSources.default;
  const mascotMotionClass =
    pose === "wave" || pose === "happy" ? "gracie-wave-motion" : pose === "thoughtful" ? "gracie-thinking-motion" : "gracie-popover-mascot";

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="gracie-title"
      className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-[#e4dccd] bg-[#fffdf8] p-4 text-left shadow-[0_24px_70px_rgba(36,48,47,0.18)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
    >
      <div className="flex items-start gap-3">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#e4dccd] bg-[#f7fbf8]">
          {imageFailed ? (
            <Heart className="h-7 w-7 text-[#345d6f]" aria-hidden="true" />
          ) : (
            <Image
              src={poseSource}
              alt=""
              fill
              sizes="80px"
              className={cn("object-contain object-center p-1.5", mascotMotionClass)}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p id="gracie-title" className="text-sm font-semibold text-[#24302f]">
                Gracie
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#b38b4d]">Gentle helper</p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close Gracie helper"
              onClick={onClose}
              className="rounded-full p-2 text-[#52605d] transition hover:bg-[#f3eee4] hover:text-[#24302f] focus:outline-none focus:ring-2 focus:ring-[#345d6f]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-4 text-base leading-7 text-[#31413f]">{message.text}</p>
          <p className="mt-3 text-xs leading-5 text-[#68706e]">Gracie offers app guidance only. Scripture, prayer, pastors, counselors, and trusted support matter most.</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {message.ctaHref && message.ctaLabel ? (
          <LinkButton href={message.ctaHref} size="sm" onClick={onCtaClick}>
            {message.ctaLabel}
          </LinkButton>
        ) : null}
        <Button type="button" variant="secondary" size="sm" onClick={onDismissToday}>
          Not today
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onSnooze}>
          Snooze Gracie
        </Button>
      </div>
    </section>
  );
}
