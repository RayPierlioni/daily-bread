"use client";

type ClientAnalyticsProperties = Record<string, string | number | boolean | null>;

type ClientAnalyticsEvent =
  | "signin_started"
  | "support_cta_clicked"
  | "gracie_button_clicked"
  | "gracie_message_shown"
  | "gracie_cta_clicked"
  | "gracie_dismissed"
  | "gracie_snoozed"
  | "gracie_settings_changed"
  | "gracie_chat_submitted"
  | "gracie_chat_answered"
  | "gracie_chat_error";

export function trackClientEvent(eventName: ClientAnalyticsEvent, properties: ClientAnalyticsProperties = {}) {
  const payload = JSON.stringify({
    eventName,
    route: window.location.pathname,
    properties
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true
  });
}
