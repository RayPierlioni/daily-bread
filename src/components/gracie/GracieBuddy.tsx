"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { GracieButton } from "@/components/gracie/GracieButton";
import { GraciePopover } from "@/components/gracie/GraciePopover";
import type { GracieMessage } from "@/components/gracie/gracieMessages";
import { useGracieMessage } from "@/components/gracie/useGracieMessage";
import { useGracieState } from "@/components/gracie/useGracieState";
import { trackClientEvent } from "@/lib/client-analytics";

const eligibleRoutes = [
  "/dashboard",
  "/devotional",
  "/prayers",
  "/ask",
  "/community",
  "/groups",
  "/blog",
  "/profile",
  "/settings",
  "/support"
];

const autoOpenRoutes = ["/dashboard", "/devotional"];

function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function canShowOnRoute(pathname: string) {
  if (pathname.startsWith("/admin")) return false;
  return eligibleRoutes.some((route) => matchesRoute(pathname, route));
}

function canAutoOpenOnRoute(pathname: string) {
  return autoOpenRoutes.some((route) => matchesRoute(pathname, route));
}

export function GracieBuddy() {
  const pathname = usePathname();
  const { loaded, settings, lastMessageId, setLastMessageId, canAutoOpen, markAutoOpenedToday, snoozeForDay } = useGracieState();
  const candidateMessage = useGracieMessage(pathname, lastMessageId);
  const [open, setOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState<GracieMessage | null>(null);
  const allowed = loaded && settings.enabled && canShowOnRoute(pathname);

  const message = activeMessage ?? candidateMessage;
  const pose = message.pose ?? "default";

  const showMessage = useCallback(
    (source: "auto" | "manual") => {
      setActiveMessage(candidateMessage);
      setOpen(true);
      setLastMessageId(candidateMessage.id);
      trackClientEvent("gracie_message_shown", {
        messageId: candidateMessage.id,
        messageCategory: candidateMessage.category,
        ctaType: candidateMessage.ctaType ?? "none",
        source,
        tone: settings.tone
      });
    },
    [candidateMessage, setLastMessageId, settings.tone]
  );

  useEffect(() => {
    if (!allowed || open || !canAutoOpen() || !canAutoOpenOnRoute(pathname)) return;
    const autoOpenTimer = window.setTimeout(() => {
      markAutoOpenedToday();
      showMessage("auto");
    }, 650);

    return () => window.clearTimeout(autoOpenTimer);
  }, [allowed, canAutoOpen, markAutoOpenedToday, open, pathname, showMessage]);

  useEffect(() => {
    const routeChangeTimer = window.setTimeout(() => {
      setOpen(false);
      setActiveMessage(null);
    }, 0);

    return () => window.clearTimeout(routeChangeTimer);
  }, [pathname]);

  const handleButtonClick = useCallback(() => {
    trackClientEvent("gracie_button_clicked", {
      messageId: candidateMessage.id,
      messageCategory: candidateMessage.category,
      ctaType: candidateMessage.ctaType ?? "none",
      source: "floating_button",
      tone: settings.tone
    });
    if (open) {
      setOpen(false);
      return;
    }
    showMessage("manual");
  }, [candidateMessage, open, settings.tone, showMessage]);

  const handleDismiss = useCallback(() => {
    markAutoOpenedToday();
    setOpen(false);
    trackClientEvent("gracie_dismissed", {
      messageId: message.id,
      messageCategory: message.category,
      ctaType: message.ctaType ?? "none",
      source: "popover",
      tone: settings.tone
    });
  }, [markAutoOpenedToday, message, settings.tone]);

  const handleSnooze = useCallback(() => {
    snoozeForDay();
    setOpen(false);
    trackClientEvent("gracie_snoozed", {
      messageId: message.id,
      messageCategory: message.category,
      ctaType: message.ctaType ?? "none",
      source: "popover",
      tone: settings.tone
    });
  }, [message, settings.tone, snoozeForDay]);

  const handleCtaClick = useCallback(() => {
    trackClientEvent("gracie_cta_clicked", {
      messageId: message.id,
      messageCategory: message.category,
      ctaType: message.ctaType ?? "none",
      source: "popover",
      tone: settings.tone
    });
    setOpen(false);
  }, [message, settings.tone]);

  const handleClose = useCallback(() => {
    setOpen(false);
    trackClientEvent("gracie_dismissed", {
      messageId: message.id,
      messageCategory: message.category,
      ctaType: message.ctaType ?? "none",
      source: "close_button",
      tone: settings.tone
    });
  }, [message, settings.tone]);

  const positionClass = useMemo(
    () => "fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:right-5 lg:bottom-6 lg:right-6",
    []
  );

  if (!allowed) return null;

  return (
    <div className={positionClass}>
      {open ? (
        <GraciePopover
          message={message}
          pose={pose}
          onClose={handleClose}
          onDismissToday={handleDismiss}
          onSnooze={handleSnooze}
          onCtaClick={handleCtaClick}
        />
      ) : null}
      <GracieButton open={open} pose={pose} onClick={handleButtonClick} />
    </div>
  );
}
