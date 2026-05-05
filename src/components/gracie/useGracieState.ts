"use client";

import { useCallback, useEffect, useState } from "react";

export type GracieTone = "gentle" | "cheerful" | "quiet";

export type GracieSettings = {
  enabled: boolean;
  dailyAutoOpen: boolean;
  tone: GracieTone;
};

const settingsKey = "next-faithful-step:gracie-settings";
const lastAutoOpenKey = "next-faithful-step:gracie-last-auto-open";
const snoozedUntilKey = "next-faithful-step:gracie-snoozed-until";
const lastMessageKey = "next-faithful-step:gracie-last-message";

export const defaultGracieSettings: GracieSettings = {
  enabled: true,
  dailyAutoOpen: true,
  tone: "gentle"
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readSettings(): GracieSettings {
  if (typeof window === "undefined") return defaultGracieSettings;

  try {
    const raw = window.localStorage.getItem(settingsKey);
    if (!raw) return defaultGracieSettings;
    return { ...defaultGracieSettings, ...JSON.parse(raw) };
  } catch {
    return defaultGracieSettings;
  }
}

export function useGracieState() {
  const [settings, setSettingsState] = useState(defaultGracieSettings);
  const [loaded, setLoaded] = useState(false);
  const [lastMessageId, setLastMessageIdState] = useState<string | null>(null);
  const [snoozedUntil, setSnoozedUntilState] = useState<number>(0);
  const [lastAutoOpenDate, setLastAutoOpenDateState] = useState<string | null>(null);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      setSettingsState(readSettings());
      setLastMessageIdState(window.localStorage.getItem(lastMessageKey));
      setSnoozedUntilState(Number(window.localStorage.getItem(snoozedUntilKey) ?? 0));
      setLastAutoOpenDateState(window.localStorage.getItem(lastAutoOpenKey));
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, []);

  const setSettings = useCallback((nextSettings: GracieSettings) => {
    setSettingsState(nextSettings);
    window.localStorage.setItem(settingsKey, JSON.stringify(nextSettings));
    window.dispatchEvent(new CustomEvent("gracie-settings-changed", { detail: nextSettings }));
  }, []);

  useEffect(() => {
    function handleSettingsChange(event: Event) {
      const detail = (event as CustomEvent<GracieSettings>).detail;
      setSettingsState(detail ?? readSettings());
    }

    window.addEventListener("gracie-settings-changed", handleSettingsChange);
    return () => window.removeEventListener("gracie-settings-changed", handleSettingsChange);
  }, []);

  const setLastMessageId = useCallback((messageId: string) => {
    setLastMessageIdState(messageId);
    window.localStorage.setItem(lastMessageKey, messageId);
  }, []);

  const markAutoOpenedToday = useCallback(() => {
    const date = todayKey();
    setLastAutoOpenDateState(date);
    window.localStorage.setItem(lastAutoOpenKey, date);
  }, []);

  const snoozeForDay = useCallback(() => {
    const until = Date.now() + 24 * 60 * 60 * 1000;
    setSnoozedUntilState(until);
    window.localStorage.setItem(snoozedUntilKey, String(until));
  }, []);

  const canAutoOpen = useCallback(() => {
    if (!loaded || !settings.enabled || !settings.dailyAutoOpen) return false;
    if (snoozedUntil > Date.now()) return false;
    return lastAutoOpenDate !== todayKey();
  }, [lastAutoOpenDate, loaded, settings.dailyAutoOpen, settings.enabled, snoozedUntil]);

  return {
    loaded,
    settings,
    setSettings,
    lastMessageId,
    setLastMessageId,
    canAutoOpen,
    markAutoOpenedToday,
    snoozeForDay
  };
}
