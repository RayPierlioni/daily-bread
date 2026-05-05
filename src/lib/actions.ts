"use server";

import {
  BlogStatus,
  DevotionalStatus,
  DevotionalFeedbackResponse,
  GroupPrivacy,
  PostType,
  PrayerStatus,
  PrivacyLevel,
  ReportStatus,
  SourceCategory,
  Visibility
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { determineAssessmentOutcome } from "@/lib/assessment";
import { advanceUserDevotionalProgress, assignUserDevotionalTrack, assignUserFoundationTrack, getCurrentDevotionalForUser } from "@/lib/devotionals";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireUser } from "@/lib/current-user";
import { blogSchema, devotionalSchema, groupSchema, onboardingSchema, postSchema, prayerSchema } from "@/lib/validations";
import { toTagArray } from "@/lib/utils";

function lengthBucket(value: string) {
  const length = value.trim().length;
  if (length === 0) return "empty";
  if (length > 1200) return "very_long";
  if (length > 500) return "long";
  if (length > 120) return "medium";
  return "short";
}

export async function completeOnboarding(formData: FormData) {
  const user = await requireUser();
  const growthAreas = formData.getAll("growthAreas").map(String);
  const struggles = formData.getAll("struggles").map(String);

  const parsed = onboardingSchema.parse({
    faithStage: formData.get("faithStage"),
    biblicalKnowledge: formData.get("biblicalKnowledge"),
    season: formData.get("season"),
    prayerLife: formData.get("prayerLife"),
    bibleReading: formData.get("bibleReading"),
    struggles,
    doubts: formData.get("doubts") || undefined,
    emotionalState: formData.get("emotionalState"),
    growthAreas,
    wantsPersonalization: formData.get("wantsPersonalization") === "on",
    wantsCommunity: formData.get("wantsCommunity") === "on"
  });

  const { generatedProfile, recommendedTopics } = determineAssessmentOutcome(parsed);
  const currentPrivacySettings =
    typeof user.privacySettings === "object" && user.privacySettings && !Array.isArray(user.privacySettings) ? user.privacySettings : null;
  const currentNotificationSettings =
    typeof user.notificationSettings === "object" && user.notificationSettings && !Array.isArray(user.notificationSettings) ? user.notificationSettings : {};

  await prisma.$transaction([
    prisma.spiritualAssessment.create({
      data: {
        userId: user.id,
        answers: parsed,
        generatedProfile,
        recommendedTopics
      }
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        spiritualFocusProfile: generatedProfile,
        onboardingCompleted: true,
        privacySettings: currentPrivacySettings ?? {
          showBio: true,
          showChurch: false,
          showDenomination: false,
          shareAnsweredPrayerCount: false
        },
        notificationSettings: {
          ...currentNotificationSettings,
          dailyDevotional: currentNotificationSettings.dailyDevotional ?? true,
          browserReminders: currentNotificationSettings.browserReminders ?? false,
          reminderTime: currentNotificationSettings.reminderTime ?? "07:00",
          groupPrayer: parsed.wantsCommunity,
          productUpdates: currentNotificationSettings.productUpdates ?? false
        }
      }
    })
  ]);

  const progress = await assignUserDevotionalTrack({
    id: user.id,
    spiritualFocusProfile: generatedProfile
  });

  await recordAnalyticsEvent({
    eventName: "onboarding_choice_selected",
    userId: user.id,
    route: "/onboarding",
    properties: { choice: "personalize" }
  });
  await recordAnalyticsEvent({
    eventName: "assessment_completed",
    userId: user.id,
    route: "/onboarding",
    properties: {
      generatedProfile,
      growthAreaCount: growthAreas.length,
      struggleCount: struggles.length,
      recommendedTopicCount: Array.isArray(recommendedTopics) ? recommendedTopics.length : 0
    }
  });
  await recordAnalyticsEvent({
    eventName: "track_started",
    userId: user.id,
    route: "/onboarding",
    properties: {
      source: "assessment",
      trackSlug: progress?.track.slug ?? "unknown",
      trackTitle: progress?.track.title ?? "Unknown track"
    }
  });

  redirect("/dashboard");
}

export async function startFoundationsPath() {
  const user = await requireUser();
  const currentPrivacySettings =
    typeof user.privacySettings === "object" && user.privacySettings && !Array.isArray(user.privacySettings) ? user.privacySettings : null;
  const currentNotificationSettings =
    typeof user.notificationSettings === "object" && user.notificationSettings && !Array.isArray(user.notificationSettings) ? user.notificationSettings : {};

  await prisma.user.update({
    where: { id: user.id },
    data: {
      spiritualFocusProfile: "Core Foundations",
      onboardingCompleted: true,
      privacySettings: currentPrivacySettings ?? {
        showBio: true,
        showChurch: false,
        showDenomination: false,
        shareAnsweredPrayerCount: false
      },
      notificationSettings: {
        ...currentNotificationSettings,
        dailyDevotional: currentNotificationSettings.dailyDevotional ?? true,
        browserReminders: currentNotificationSettings.browserReminders ?? false,
        reminderTime: currentNotificationSettings.reminderTime ?? "07:00",
        groupPrayer: currentNotificationSettings.groupPrayer ?? false,
        productUpdates: currentNotificationSettings.productUpdates ?? false
      }
    }
  });

  const progress = await assignUserFoundationTrack(user.id);

  await recordAnalyticsEvent({
    eventName: "onboarding_choice_selected",
    userId: user.id,
    route: "/onboarding",
    properties: { choice: "foundations" }
  });
  await recordAnalyticsEvent({
    eventName: "track_started",
    userId: user.id,
    route: "/onboarding",
    properties: {
      source: "foundations",
      trackSlug: progress?.track.slug ?? "unknown",
      trackTitle: progress?.track.title ?? "Unknown track"
    }
  });

  redirect("/dashboard");
}

export async function createQuickPrayer(formData: FormData) {
  const user = await requireUser();
  const text = String(formData.get("text") ?? "").trim();

  if (!text) return;

  await prisma.prayer.create({
    data: {
      userId: user.id,
      title: text.slice(0, 80),
      text,
      tags: ["quick prayer"],
      privacyLevel: PrivacyLevel.PRIVATE
    }
  });

  await recordAnalyticsEvent({
    eventName: "prayer_created",
    userId: user.id,
    route: "/dashboard",
    properties: {
      source: "quick_prayer",
      privacyLevel: "PRIVATE",
      status: "ONGOING",
      tagCount: 1,
      textLengthBucket: lengthBucket(text)
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/prayers");
}

export async function createPrayerAction(input: unknown) {
  const user = await requireUser();
  const parsed = prayerSchema.parse(input);

  await prisma.prayer.create({
    data: {
      userId: user.id,
      title: parsed.title,
      text: parsed.text,
      transcript: parsed.transcript,
      audioUrl: parsed.audioUrl,
      tags: parsed.tags,
      mood: parsed.mood,
      relatedVerse: parsed.relatedVerse,
      status: parsed.status as PrayerStatus,
      privacyLevel: parsed.privacyLevel as PrivacyLevel,
      followUpNotes: parsed.followUpNotes,
      answeredAt: parsed.status === "ANSWERED" ? new Date() : null
    }
  });

  await recordAnalyticsEvent({
    eventName: "prayer_created",
    userId: user.id,
    route: "/prayers",
    properties: {
      source: "prayer_journal",
      privacyLevel: parsed.privacyLevel,
      status: parsed.status,
      tagCount: parsed.tags.length,
      hasAudio: Boolean(parsed.audioUrl),
      hasTranscript: Boolean(parsed.transcript),
      textLengthBucket: lengthBucket(parsed.text)
    }
  });

  revalidatePath("/prayers");
  return { ok: true, message: "Prayer saved privately." };
}

export async function markPrayerAnswered(prayerId: string) {
  const user = await requireUser();

  const prayer = await prisma.prayer.update({
    where: { id: prayerId, userId: user.id },
    data: {
      status: PrayerStatus.ANSWERED,
      answeredAt: new Date()
    }
  });

  await recordAnalyticsEvent({
    eventName: "prayer_marked_answered",
    userId: user.id,
    route: "/prayers",
    properties: {
      daysSinceCreated: Math.max(0, Math.round((Date.now() - prayer.createdAt.getTime()) / 86_400_000)),
      tagCount: Array.isArray(prayer.tags) ? prayer.tags.length : 0
    }
  });

  revalidatePath("/prayers");
}

export async function saveDevotionalNote(devotionalId: string, formData: FormData) {
  const user = await requireUser();
  const notes = String(formData.get("notes") ?? "");

  await prisma.userDevotional.upsert({
    where: { userId_devotionalId: { userId: user.id, devotionalId } },
    update: { notes },
    create: { userId: user.id, devotionalId, notes }
  });

  await recordAnalyticsEvent({
    eventName: "devotional_note_saved",
    userId: user.id,
    route: "/devotional",
    properties: {
      devotionalId,
      noteLengthBucket: lengthBucket(notes)
    }
  });

  revalidatePath("/devotional");
}

export type DevotionalNoteActionState = {
  status: "idle" | "success" | "error";
  message: string;
  savedAt?: string;
};

export async function saveDevotionalNoteWithFeedback(
  devotionalId: string,
  _previousState: DevotionalNoteActionState,
  formData: FormData
): Promise<DevotionalNoteActionState> {
  try {
    await saveDevotionalNote(devotionalId, formData);

    return {
      status: "success",
      message: "Note saved.",
      savedAt: new Date().toISOString()
    };
  } catch {
    return {
      status: "error",
      message: "Your note could not be saved. Please try again."
    };
  }
}

export async function toggleDevotionalComplete(devotionalId?: string) {
  const user = await requireUser();
  const current = await getCurrentDevotionalForUser(user);
  const devotional = devotionalId ? await prisma.devotional.findUnique({ where: { id: devotionalId } }) : current.devotional;
  if (!devotional) return;

  if (current.devotional && devotional.id !== current.devotional.id) {
    revalidatePath("/dashboard");
    revalidatePath("/devotional");
    return;
  }

  if (
    current.progress?.lastAdvancedAt &&
    Date.now() - current.progress.lastAdvancedAt.getTime() < 45_000
  ) {
    revalidatePath("/dashboard");
    revalidatePath("/devotional");
    return;
  }

  const existing = await prisma.userDevotional.findUnique({
    where: { userId_devotionalId: { userId: user.id, devotionalId: devotional.id } }
  });

  if (existing?.completed) {
    revalidatePath("/dashboard");
    revalidatePath("/devotional");
    return;
  }

  await prisma.userDevotional.upsert({
    where: { userId_devotionalId: { userId: user.id, devotionalId: devotional.id } },
    update: {
      completed: true,
      completedAt: new Date()
    },
    create: {
      userId: user.id,
      devotionalId: devotional.id,
      completed: true,
      completedAt: new Date()
    }
  });

  const advanceResult = await advanceUserDevotionalProgress(user.id, devotional.id);
  if (!advanceResult.advanced && advanceResult.reason !== "no-progress") {
    revalidatePath("/dashboard");
    revalidatePath("/devotional");
    return;
  }

  await recordAnalyticsEvent({
    eventName: "devotional_completed",
    userId: user.id,
    route: "/devotional",
    properties: {
      devotionalId: devotional.id,
      trackSlug: current.track?.slug ?? "daily",
      sequence: current.sequence,
      total: current.total
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/devotional");
}

export async function toggleDevotionalSaved(devotionalId: string) {
  const user = await requireUser();
  const existing = await prisma.userDevotional.findUnique({
    where: { userId_devotionalId: { userId: user.id, devotionalId } }
  });

  if (existing?.saved) {
    revalidatePath("/dashboard");
    revalidatePath("/devotional");
    revalidatePath("/profile");
    return;
  }

  await prisma.userDevotional.upsert({
    where: { userId_devotionalId: { userId: user.id, devotionalId } },
    update: { saved: true },
    create: { userId: user.id, devotionalId, saved: true }
  });

  await recordAnalyticsEvent({
    eventName: "devotional_saved",
    userId: user.id,
    route: "/devotional",
    properties: { devotionalId }
  });

  revalidatePath("/dashboard");
  revalidatePath("/devotional");
  revalidatePath("/profile");
}

export async function submitDevotionalFeedback(devotionalId: string, response: DevotionalFeedbackResponse) {
  const user = await requireUser();

  if (!Object.values(DevotionalFeedbackResponse).includes(response)) return;

  await prisma.devotionalFeedback.upsert({
    where: { userId_devotionalId: { userId: user.id, devotionalId } },
    update: { response },
    create: {
      userId: user.id,
      devotionalId,
      response
    }
  });

  await recordAnalyticsEvent({
    eventName: "devotional_feedback_submitted",
    userId: user.id,
    route: "/devotional",
    properties: {
      devotionalId,
      response
    }
  });

  revalidatePath("/devotional");
  revalidatePath("/admin");
}

export async function createCommunityPost(formData: FormData) {
  const user = await requireUser();
  const parsed = postSchema.parse({
    type: formData.get("type"),
    title: formData.get("title"),
    body: formData.get("body"),
    tags: toTagArray(formData.get("tags")),
    visibility: formData.get("visibility"),
    groupId: formData.get("groupId") || undefined
  });

  await prisma.post.create({
    data: {
      userId: user.id,
      type: parsed.type as PostType,
      title: parsed.title,
      body: parsed.body,
      tags: parsed.tags,
      visibility: parsed.visibility as Visibility,
      groupId: parsed.visibility === "GROUP" ? parsed.groupId : undefined
    }
  });

  await recordAnalyticsEvent({
    eventName: "community_post_created",
    userId: user.id,
    route: "/community",
    properties: {
      postType: parsed.type,
      visibility: parsed.visibility,
      tagCount: parsed.tags.length,
      bodyLengthBucket: lengthBucket(parsed.body),
      sharedToGroup: Boolean(parsed.groupId)
    }
  });

  revalidatePath("/community");
}

export async function createComment(postId: string, formData: FormData) {
  const user = await requireUser();
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;

  await prisma.comment.create({
    data: {
      postId,
      userId: user.id,
      body
    }
  });

  await recordAnalyticsEvent({
    eventName: "community_comment_created",
    userId: user.id,
    route: "/community",
    properties: {
      bodyLengthBucket: lengthBucket(body)
    }
  });

  revalidatePath("/community");
  revalidatePath(`/groups/${postId}`);
}

export async function createReport(contentType: string, contentId: string, formData: FormData) {
  const user = await requireUser();
  const reason = String(formData.get("reason") ?? "Needs moderation review").trim();

  await prisma.report.create({
    data: {
      reporterId: user.id,
      contentType,
      contentId,
      reason
    }
  });

  revalidatePath("/admin/reports");
}

export async function createGroup(formData: FormData) {
  const user = await requireUser();
  const parsed = groupSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    privacy: formData.get("privacy")
  });

  const group = await prisma.prayerGroup.create({
    data: {
      name: parsed.name,
      description: parsed.description,
      privacy: parsed.privacy as GroupPrivacy,
      creatorId: user.id,
      members: {
        create: {
          userId: user.id,
          role: "LEADER"
        }
      }
    }
  });

  await recordAnalyticsEvent({
    eventName: "group_created",
    userId: user.id,
    route: "/groups",
    properties: {
      privacy: parsed.privacy
    }
  });

  revalidatePath("/groups");
  redirect(`/groups/${group.id}`);
}

export async function joinGroup(groupId: string) {
  const user = await requireUser();

  await prisma.groupMember.upsert({
    where: { groupId_userId: { groupId, userId: user.id } },
    update: {},
    create: {
      groupId,
      userId: user.id
    }
  });

  await recordAnalyticsEvent({
    eventName: "group_joined",
    userId: user.id,
    route: "/groups",
    properties: { groupId }
  });

  revalidatePath("/groups");
  revalidatePath(`/groups/${groupId}`);
}

export async function createBlogPost(formData: FormData) {
  const user = await requireUser();
  const parsed = blogSchema.parse({
    title: formData.get("title"),
    body: formData.get("body"),
    tags: toTagArray(formData.get("tags")),
    status: formData.get("status")
  });

  const blog = await prisma.blog.create({
    data: {
      authorId: user.id,
      title: parsed.title,
      body: parsed.body,
      tags: parsed.tags,
      status: parsed.status as BlogStatus
    }
  });

  await recordAnalyticsEvent({
    eventName: "blog_post_created",
    userId: user.id,
    route: "/blog",
    properties: {
      status: parsed.status,
      tagCount: parsed.tags.length,
      bodyLengthBucket: lengthBucket(parsed.body)
    }
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${blog.id}`);
  redirect(`/blog/${blog.id}`);
}

export async function updateBlogPost(blogId: string, formData: FormData) {
  const user = await requireUser();
  const blog = await prisma.blog.findUnique({ where: { id: blogId }, select: { authorId: true } });

  if (!blog || (blog.authorId !== user.id && user.role !== "ADMIN")) {
    redirect("/blog");
  }

  const parsed = blogSchema.parse({
    title: formData.get("title"),
    body: formData.get("body"),
    tags: toTagArray(formData.get("tags")),
    status: formData.get("status")
  });

  await prisma.blog.update({
    where: { id: blogId },
    data: {
      title: parsed.title,
      body: parsed.body,
      tags: parsed.tags,
      status: parsed.status as BlogStatus
    }
  });

  await recordAnalyticsEvent({
    eventName: "blog_post_updated",
    userId: user.id,
    route: `/blog/${blogId}/edit`,
    properties: {
      status: parsed.status,
      tagCount: parsed.tags.length,
      bodyLengthBucket: lengthBucket(parsed.body)
    }
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${blogId}`);
  revalidatePath(`/blog/${blogId}/edit`);
  redirect(`/blog/${blogId}`);
}

export async function createBlogComment(blogId: string, formData: FormData) {
  const user = await requireUser();
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;

  await prisma.blogComment.create({
    data: {
      blogId,
      userId: user.id,
      body
    }
  });

  await recordAnalyticsEvent({
    eventName: "blog_comment_created",
    userId: user.id,
    route: `/blog/${blogId}`,
    properties: {
      bodyLengthBucket: lengthBucket(body)
    }
  });

  revalidatePath(`/blog/${blogId}`);
}

export async function updateProfile(formData: FormData) {
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: String(formData.get("name") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      church: String(formData.get("church") ?? "") || null,
      denomination: String(formData.get("denomination") ?? "") || null
    }
  });

  revalidatePath("/profile");
  revalidatePath("/settings");
}

export async function updateSettings(formData: FormData) {
  const user = await requireUser();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      privacySettings: {
        showBio: formData.get("showBio") === "on",
        showChurch: formData.get("showChurch") === "on",
        showDenomination: formData.get("showDenomination") === "on",
        shareAnsweredPrayerCount: formData.get("shareAnsweredPrayerCount") === "on"
      },
      notificationSettings: {
        ...(typeof user.notificationSettings === "object" && user.notificationSettings && !Array.isArray(user.notificationSettings) ? user.notificationSettings : {}),
        groupPrayer: formData.get("groupPrayer") === "on",
        productUpdates: formData.get("productUpdates") === "on"
      },
      spiritualFocusProfile: formData.get("personalization") === "on" ? user.spiritualFocusProfile : null
    }
  });

  revalidatePath("/settings");
}

export type NotificationSettingsActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function updateNotificationSettingsWithFeedback(
  _previousState: NotificationSettingsActionState,
  formData: FormData
): Promise<NotificationSettingsActionState> {
  try {
    const user = await requireUser();
    const reminderTime = String(formData.get("reminderTime") ?? "07:00");
    const currentSettings =
      typeof user.notificationSettings === "object" && user.notificationSettings && !Array.isArray(user.notificationSettings)
        ? user.notificationSettings
        : {};

    await prisma.user.update({
      where: { id: user.id },
      data: {
        notificationSettings: {
          ...currentSettings,
          dailyDevotional: formData.get("dailyDevotional") === "on",
          browserReminders: formData.get("browserReminders") === "on",
          reminderTime: /^\d{2}:\d{2}$/.test(reminderTime) ? reminderTime : "07:00",
          timezone: String(formData.get("timezone") ?? "")
        }
      }
    });

    revalidatePath("/settings");

    return {
      status: "success",
      message: "Daily reminder settings saved."
    };
  } catch {
    return {
      status: "error",
      message: "Reminder settings could not be saved. Please try again."
    };
  }
}

export async function enableDailyBrowserReminder(reminderTime = "07:00", timezone = "") {
  const user = await requireUser();
  const currentSettings =
    typeof user.notificationSettings === "object" && user.notificationSettings && !Array.isArray(user.notificationSettings)
      ? user.notificationSettings
      : {};

  await prisma.user.update({
    where: { id: user.id },
    data: {
      notificationSettings: {
        ...currentSettings,
        dailyDevotional: true,
        browserReminders: true,
        reminderTime: /^\d{2}:\d{2}$/.test(reminderTime) ? reminderTime : "07:00",
        timezone
      }
    }
  });

  revalidatePath("/settings");
}

export async function createDevotional(formData: FormData) {
  const user = await requireAdmin();
  const parsed = devotionalSchema.parse({
    title: formData.get("title"),
    date: formData.get("date"),
    scriptureReference: formData.get("scriptureReference"),
    scriptureText: formData.get("scriptureText"),
    body: formData.get("body"),
    reflectionQuestion: formData.get("reflectionQuestion"),
    prayerPrompt: formData.get("prayerPrompt"),
    actionStep: formData.get("actionStep"),
    tags: toTagArray(formData.get("tags")),
    spiritualFocusCategories: formData.getAll("spiritualFocusCategories").map(String),
    status: formData.get("status")
  });

  const date = new Date(`${parsed.date}T00:00:00`);

  await prisma.devotional.upsert({
    where: { date },
    update: {
      ...parsed,
      date,
      status: parsed.status as DevotionalStatus,
      createdBy: user.id
    },
    create: {
      ...parsed,
      date,
      status: parsed.status as DevotionalStatus,
      createdBy: user.id
    }
  });

  revalidatePath("/admin/devotionals");
  revalidatePath("/devotional");
}

export async function updateReportStatus(reportId: string, status: ReportStatus, formData?: FormData) {
  await requireAdmin();

  await prisma.report.update({
    where: { id: reportId },
    data: {
      status,
      adminNotes: formData ? String(formData.get("adminNotes") ?? "") : undefined
    }
  });

  revalidatePath("/admin/reports");
}

export async function setUserSponsorStatus(userId: string, isSponsor: boolean) {
  await requireAdmin();

  await prisma.user.update({
    where: { id: userId },
    data: {
      isSponsor,
      sponsorSince: isSponsor ? new Date() : null
    }
  });

  await recordAnalyticsEvent({
    eventName: "sponsor_badge_enabled",
    userId,
    route: "/admin",
    properties: {
      enabled: isSponsor
    }
  });

  revalidatePath("/admin");
  revalidatePath("/community");
  revalidatePath("/blog");
}

export async function createSourceLibraryItem(formData: FormData) {
  await requireAdmin();

  await prisma.sourceLibraryItem.create({
    data: {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? "PASTORAL") as SourceCategory,
      summary: String(formData.get("summary") ?? ""),
      content: String(formData.get("content") ?? ""),
      scriptureReferences: toTagArray(formData.get("scriptureReferences")),
      externalReference: String(formData.get("externalReference") ?? "") || null,
      tags: toTagArray(formData.get("tags"))
    }
  });

  revalidatePath("/admin/source-library");
}
