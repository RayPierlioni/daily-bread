import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const analyticsEventNames = [
  "signin_started",
  "signin_completed",
  "onboarding_choice_selected",
  "assessment_completed",
  "track_started",
  "dashboard_viewed",
  "devotional_viewed",
  "devotional_completed",
  "devotional_note_saved",
  "devotional_feedback_submitted",
  "gracie_button_clicked",
  "gracie_message_shown",
  "gracie_cta_clicked",
  "gracie_dismissed",
  "gracie_snoozed",
  "gracie_settings_changed",
  "support_page_viewed",
  "support_cta_clicked"
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
export type AnalyticsProperties = Record<string, string | number | boolean | null>;

const clientEventNames = [
  "signin_started",
  "support_cta_clicked",
  "gracie_button_clicked",
  "gracie_message_shown",
  "gracie_cta_clicked",
  "gracie_dismissed",
  "gracie_snoozed",
  "gracie_settings_changed"
] as const;
type ClientAnalyticsEventName = (typeof clientEventNames)[number];

function isAnalyticsEventName(value: unknown): value is AnalyticsEventName {
  return typeof value === "string" && analyticsEventNames.includes(value as AnalyticsEventName);
}

function isClientAnalyticsEventName(value: unknown): value is ClientAnalyticsEventName {
  return typeof value === "string" && clientEventNames.includes(value as ClientAnalyticsEventName);
}

function safeString(value: unknown, fallback = "unknown") {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 120) : fallback;
}

function safeBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

export function sanitizeClientAnalyticsEvent(input: unknown):
  | {
      eventName: AnalyticsEventName;
      route?: string;
      properties: AnalyticsProperties;
    }
  | null {
  if (!input || typeof input !== "object") return null;

  const body = input as { eventName?: unknown; route?: unknown; properties?: unknown };
  if (!isAnalyticsEventName(body.eventName) || !isClientAnalyticsEventName(body.eventName)) return null;

  const rawProperties = body.properties && typeof body.properties === "object" ? (body.properties as Record<string, unknown>) : {};
  const route = typeof body.route === "string" ? body.route.slice(0, 180) : undefined;

  if (body.eventName === "signin_started") {
    return {
      eventName: body.eventName,
      route,
      properties: {
        provider: safeString(rawProperties.provider, "google"),
        source: safeString(rawProperties.source, "signin_page")
      }
    };
  }

  if (body.eventName === "support_cta_clicked") {
    return {
      eventName: body.eventName,
      route,
      properties: {
        amount: safeString(rawProperties.amount, "custom"),
        supportType: safeString(rawProperties.supportType, "custom"),
        source: safeString(rawProperties.source, "support_link"),
        signedIn: safeBoolean(rawProperties.signedIn)
      }
    };
  }

  if (body.eventName.startsWith("gracie_")) {
    return {
      eventName: body.eventName,
      route,
      properties: {
        messageId: safeString(rawProperties.messageId, "none"),
        messageCategory: safeString(rawProperties.messageCategory, "general"),
        ctaType: safeString(rawProperties.ctaType, "none"),
        tone: safeString(rawProperties.tone, "gentle"),
        source: safeString(rawProperties.source, "gracie"),
        enabled: safeBoolean(rawProperties.enabled),
        dailyAutoOpen: safeBoolean(rawProperties.dailyAutoOpen)
      }
    };
  }

  return null;
}

export async function recordAnalyticsEvent({
  eventName,
  userId,
  route,
  properties
}: {
  eventName: AnalyticsEventName;
  userId?: string | null;
  route?: string | null;
  properties?: AnalyticsProperties;
}) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        userId: userId || undefined,
        eventName,
        route: route || undefined,
        eventProperties: properties ? (properties as Prisma.InputJsonObject) : undefined
      }
    });
  } catch (error) {
    console.error(`Unable to record analytics event: ${eventName}`, error);
  }
}
