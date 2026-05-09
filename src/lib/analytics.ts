import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const analyticsEventNames = [
  "landing_page_viewed",
  "signin_embedded_browser_detected",
  "signin_link_copied",
  "signin_started",
  "signin_completed",
  "path_resumed_after_gap",
  "onboarding_choice_selected",
  "assessment_completed",
  "track_started",
  "dashboard_viewed",
  "devotional_viewed",
  "day_one_devotional_viewed",
  "devotional_completed",
  "day_one_devotional_completed",
  "devotional_saved",
  "devotional_note_saved",
  "devotional_feedback_submitted",
  "devotional_read_aloud_started",
  "devotional_read_aloud_paused",
  "devotional_read_aloud_resumed",
  "devotional_read_aloud_stopped",
  "bible_read_aloud_started",
  "bible_read_aloud_paused",
  "bible_read_aloud_resumed",
  "bible_read_aloud_stopped",
  "prayer_created",
  "prayer_marked_answered",
  "prayer_audio_recording_started",
  "prayer_audio_recording_stopped",
  "prayer_audio_playback_started",
  "faith_question_submitted",
  "faith_answer_served",
  "community_post_created",
  "community_comment_created",
  "blog_post_created",
  "blog_post_updated",
  "blog_comment_created",
  "group_created",
  "group_joined",
  "sponsor_badge_enabled",
  "gracie_button_clicked",
  "gracie_message_shown",
  "gracie_cta_clicked",
  "gracie_dismissed",
  "gracie_snoozed",
  "gracie_settings_changed",
  "gracie_chat_submitted",
  "gracie_chat_answered",
  "gracie_chat_error",
  "support_page_viewed",
  "support_cta_clicked",
  "pwa_install_clicked",
  "pwa_install_prompt_result",
  "pwa_install_completed",
  "pwa_install_dismissed"
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
export type AnalyticsProperties = Record<string, string | number | boolean | null>;

const clientEventNames = [
  "landing_page_viewed",
  "signin_embedded_browser_detected",
  "signin_link_copied",
  "signin_started",
  "support_cta_clicked",
  "pwa_install_clicked",
  "pwa_install_prompt_result",
  "pwa_install_completed",
  "pwa_install_dismissed",
  "devotional_read_aloud_started",
  "devotional_read_aloud_paused",
  "devotional_read_aloud_resumed",
  "devotional_read_aloud_stopped",
  "bible_read_aloud_started",
  "bible_read_aloud_paused",
  "bible_read_aloud_resumed",
  "bible_read_aloud_stopped",
  "prayer_audio_recording_started",
  "prayer_audio_recording_stopped",
  "prayer_audio_playback_started",
  "gracie_button_clicked",
  "gracie_message_shown",
  "gracie_cta_clicked",
  "gracie_dismissed",
  "gracie_snoozed",
  "gracie_settings_changed",
  "gracie_chat_submitted",
  "gracie_chat_answered",
  "gracie_chat_error"
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

function safeNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : fallback;
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

  if (body.eventName === "landing_page_viewed") {
    return {
      eventName: body.eventName,
      route,
      properties: {
        source: safeString(rawProperties.source, "homepage")
      }
    };
  }

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

  if (body.eventName === "signin_embedded_browser_detected" || body.eventName === "signin_link_copied") {
    return {
      eventName: body.eventName,
      route,
      properties: {
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

  if (body.eventName.startsWith("pwa_install")) {
    return {
      eventName: body.eventName,
      route,
      properties: {
        source: safeString(rawProperties.source, "install_button"),
        platform: safeString(rawProperties.platform, "unknown"),
        outcome: safeString(rawProperties.outcome, "unknown"),
        hasNativePrompt: safeBoolean(rawProperties.hasNativePrompt)
      }
    };
  }

  if (body.eventName.startsWith("devotional_read_aloud")) {
    return {
      eventName: body.eventName,
      route,
      properties: {
        textLength: safeNumber(rawProperties.textLength)
      }
    };
  }

  if (body.eventName.startsWith("bible_read_aloud")) {
    return {
      eventName: body.eventName,
      route,
      properties: {
        reference: safeString(rawProperties.reference, "unknown"),
        verseCount: safeNumber(rawProperties.verseCount)
      }
    };
  }

  if (body.eventName.startsWith("prayer_audio")) {
    return {
      eventName: body.eventName,
      route,
      properties: {
        durationSeconds: safeNumber(rawProperties.durationSeconds)
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
        questionLengthBucket: safeString(rawProperties.questionLengthBucket, "unknown"),
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
