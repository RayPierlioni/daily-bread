"use server";

import {
  BlogStatus,
  DevotionalStatus,
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
import { advanceUserDevotionalProgress, assignUserDevotionalTrack, getCurrentDevotionalForUser } from "@/lib/devotionals";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireUser } from "@/lib/current-user";
import { blogSchema, devotionalSchema, focusCategories, groupSchema, onboardingSchema, postSchema, prayerSchema } from "@/lib/validations";
import { toTagArray } from "@/lib/utils";

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

  const generatedProfile = parsed.growthAreas.find((area) => focusCategories.includes(area as (typeof focusCategories)[number])) ?? "Strengthening Faith";
  const recommendedTopics = [...new Set([generatedProfile, ...parsed.growthAreas, ...parsed.struggles])].filter(Boolean);

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
        privacySettings: {
          showBio: true,
          showChurch: false,
          showDenomination: false,
          shareAnsweredPrayerCount: false
        },
        notificationSettings: {
          dailyDevotional: true,
          browserReminders: false,
          reminderTime: "07:00",
          groupPrayer: parsed.wantsCommunity,
          productUpdates: false
        }
      }
    })
  ]);

  await assignUserDevotionalTrack({
    id: user.id,
    spiritualFocusProfile: generatedProfile
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

  revalidatePath("/prayers");
  return { ok: true, message: "Prayer saved privately." };
}

export async function markPrayerAnswered(prayerId: string) {
  const user = await requireUser();

  await prisma.prayer.update({
    where: { id: prayerId, userId: user.id },
    data: {
      status: PrayerStatus.ANSWERED,
      answeredAt: new Date()
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

  await advanceUserDevotionalProgress(user.id, devotional.id);

  revalidatePath("/dashboard");
  revalidatePath("/devotional");
}

export async function toggleDevotionalSaved(devotionalId: string) {
  const user = await requireUser();
  const existing = await prisma.userDevotional.findUnique({
    where: { userId_devotionalId: { userId: user.id, devotionalId } }
  });

  await prisma.userDevotional.upsert({
    where: { userId_devotionalId: { userId: user.id, devotionalId } },
    update: { saved: !existing?.saved },
    create: { userId: user.id, devotionalId, saved: true }
  });

  revalidatePath("/devotional");
  revalidatePath("/profile");
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

  revalidatePath("/blog");
  redirect(`/blog/${blog.id}`);
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
