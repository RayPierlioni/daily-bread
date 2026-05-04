import { DevotionalStatus, type User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { todayAtMidnight } from "@/lib/utils";

const fallbackFocus = "Strengthening Faith";
const foundationTrackSlug = "daily-bread-foundations";

export async function getTodayDevotional() {
  const today = todayAtMidnight();

  const devotional =
    (await prisma.devotional.findFirst({
      where: {
        date: today,
        status: DevotionalStatus.PUBLISHED
      }
    })) ??
    (await prisma.devotional.findFirst({
      where: {
        date: { lte: today },
        status: DevotionalStatus.PUBLISHED
      },
      orderBy: { date: "desc" }
    })) ??
    (await prisma.devotional.findFirst({
      where: { status: DevotionalStatus.PUBLISHED },
      orderBy: { date: "asc" }
    }));

  return devotional;
}

export function jsonArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

export function publicDevotionalTags(value: unknown) {
  return jsonArray(value).filter((tag) => tag !== "daily-bread-foundations" && !/^day-\d{3}$/i.test(tag));
}

export function formatTrackStepTitle(title: string, sequence?: number | null) {
  if (!sequence) return title;

  const paddedSequence = String(sequence).padStart(3, "0");
  return title.replace(/^Day\s+\d{3}:/i, `Step ${paddedSequence}:`);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function chooseTrackForUser(user: Pick<User, "spiritualFocusProfile">) {
  const focus = user.spiritualFocusProfile ?? fallbackFocus;

  return (
    (await prisma.devotionalTrack.findFirst({
      where: { focusCategory: focus },
      orderBy: { createdAt: "asc" }
    })) ??
    (await prisma.devotionalTrack.findUnique({
      where: { slug: slugify(focus) }
    })) ??
    (await prisma.devotionalTrack.findUnique({
      where: { slug: foundationTrackSlug }
    })) ??
    (await prisma.devotionalTrack.findFirst({
      orderBy: { createdAt: "asc" }
    }))
  );
}

async function getProgressWithTrack(userId: string) {
  return prisma.userDevotionalProgress.findUnique({
    where: { userId },
    include: {
      track: {
        include: {
          items: {
            orderBy: { sequence: "asc" },
            include: { devotional: true }
          }
        }
      }
    }
  });
}

export async function ensureUserDevotionalProgress(user: Pick<User, "id" | "spiritualFocusProfile">) {
  const existing = await getProgressWithTrack(user.id);
  if (existing) return existing;

  const track = await chooseTrackForUser(user);
  if (!track) return null;

  await prisma.userDevotionalProgress.create({
    data: {
      userId: user.id,
      trackId: track.id,
      currentSequence: 1
    }
  });

  return getProgressWithTrack(user.id);
}

export async function assignUserDevotionalTrack(user: Pick<User, "id" | "spiritualFocusProfile">) {
  const track = await chooseTrackForUser(user);
  if (!track) return null;

  await prisma.userDevotionalProgress.upsert({
    where: { userId: user.id },
    update: {
      trackId: track.id,
      currentSequence: 1,
      startedAt: new Date(),
      lastAdvancedAt: null,
      completedTrackAt: null
    },
    create: {
      userId: user.id,
      trackId: track.id,
      currentSequence: 1
    }
  });

  return getProgressWithTrack(user.id);
}

export async function assignUserFoundationTrack(userId: string) {
  const track =
    (await prisma.devotionalTrack.findUnique({
      where: { slug: foundationTrackSlug }
    })) ??
    (await prisma.devotionalTrack.findFirst({
      where: { focusCategory: "Core Foundations" },
      orderBy: { createdAt: "asc" }
    })) ??
    (await prisma.devotionalTrack.findFirst({
      orderBy: { createdAt: "asc" }
    }));

  if (!track) return null;

  await prisma.userDevotionalProgress.upsert({
    where: { userId },
    update: {
      trackId: track.id,
      currentSequence: 1,
      startedAt: new Date(),
      lastAdvancedAt: null,
      completedTrackAt: null
    },
    create: {
      userId,
      trackId: track.id,
      currentSequence: 1
    }
  });

  return getProgressWithTrack(userId);
}

export async function getCurrentDevotionalForUser(user: Pick<User, "id" | "spiritualFocusProfile">) {
  const progress = await ensureUserDevotionalProgress(user);

  if (!progress) {
    const devotional = await getTodayDevotional();
    const state = devotional
      ? await prisma.userDevotional.findUnique({
          where: { userId_devotionalId: { userId: user.id, devotionalId: devotional.id } }
        })
      : null;

    return {
      devotional,
      state,
      progress: null,
      track: null,
      sequence: 1,
      total: devotional ? 1 : 0,
      isLast: true
    };
  }

  const publishedItems = progress.track.items.filter((item) => item.devotional.status === DevotionalStatus.PUBLISHED);
  const total = publishedItems.length;
  const boundedSequence = Math.min(Math.max(progress.currentSequence, 1), Math.max(total, 1));
  const currentItem = publishedItems.find((item) => item.sequence >= boundedSequence) ?? publishedItems.at(-1);
  const devotional = currentItem?.devotional ?? null;
  const state = devotional
    ? await prisma.userDevotional.findUnique({
        where: { userId_devotionalId: { userId: user.id, devotionalId: devotional.id } }
      })
    : null;

  return {
    devotional,
    state,
    progress,
    track: progress.track,
    sequence: currentItem?.sequence ?? boundedSequence,
    total,
    isLast: Boolean(currentItem && currentItem.sequence >= total)
  };
}

export async function advanceUserDevotionalProgress(userId: string, devotionalId: string) {
  const progress = await getProgressWithTrack(userId);
  if (!progress) return;

  const publishedItems = progress.track.items.filter((item) => item.devotional.status === DevotionalStatus.PUBLISHED);
  const currentItem = publishedItems.find((item) => item.sequence >= progress.currentSequence) ?? publishedItems.at(-1);

  if (!currentItem || currentItem.devotionalId !== devotionalId) return;

  const total = publishedItems.length;
  const nextSequence = Math.min(currentItem.sequence + 1, total + 1);

  await prisma.userDevotionalProgress.update({
    where: { userId },
    data: {
      currentSequence: nextSequence,
      lastAdvancedAt: new Date(),
      completedTrackAt: nextSequence > total ? new Date() : null
    }
  });
}

export async function getRecommendedDevotionals(profile?: string | null, excludeId?: string) {
  const devotionals = await prisma.devotional.findMany({
    where: {
      status: DevotionalStatus.PUBLISHED,
      id: excludeId ? { not: excludeId } : undefined
    },
    orderBy: { date: "desc" },
    take: 24
  });

  if (!profile) return devotionals.slice(0, 3);

  const matching = devotionals.filter((devotional) => jsonArray(devotional.spiritualFocusCategories).includes(profile));
  return (matching.length ? matching : devotionals).slice(0, 3);
}

export function getUpcomingDevotionalsFromProgress(
  progress: Awaited<ReturnType<typeof getProgressWithTrack>> | null,
  currentSequence: number,
  excludeId?: string
) {
  if (!progress) return [];

  return progress.track.items
    .filter((item) => item.devotional.status === DevotionalStatus.PUBLISHED)
    .filter((item) => item.sequence > currentSequence)
    .filter((item) => item.devotionalId !== excludeId)
    .slice(0, 3)
    .map((item) => item.devotional);
}
