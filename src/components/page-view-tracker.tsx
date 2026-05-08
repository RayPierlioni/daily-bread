"use client";

import { useEffect } from "react";
import { trackClientEvent, type ClientAnalyticsEvent, type ClientAnalyticsProperties } from "@/lib/client-analytics";

export function PageViewTracker({
  eventName,
  properties = {}
}: {
  eventName: ClientAnalyticsEvent;
  properties?: ClientAnalyticsProperties;
}) {
  const propertiesKey = JSON.stringify(properties);

  useEffect(() => {
    trackClientEvent(eventName, JSON.parse(propertiesKey) as ClientAnalyticsProperties);
  }, [eventName, propertiesKey]);

  return null;
}
