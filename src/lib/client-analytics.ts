"use client";

type ClientAnalyticsProperties = Record<string, string | number | boolean | null>;

export function trackClientEvent(eventName: "signin_started" | "support_cta_clicked", properties: ClientAnalyticsProperties = {}) {
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
