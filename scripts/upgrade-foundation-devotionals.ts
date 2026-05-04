import fs from "node:fs";
import path from "node:path";

function loadEnvFile(filename: string) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const equalsIndex = trimmed.indexOf("=");
    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");
loadEnvFile(".env.production.local");

const focusCategories = [
  "Strengthening Faith",
  "Healing and Comfort",
  "Overcoming Anxiety",
  "Seeking Purpose",
  "Learning to Pray",
  "Growing in Scripture",
  "Wrestling with Doubt",
  "Building Discipline",
  "Forgiveness and Restoration",
  "Community and Belonging"
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function jsonArray(value: unknown) {
  return Array.isArray(value) ? value.map(String) : [];
}

async function main() {
  const { DevotionalStatus, PrismaClient } = await import("@prisma/client");
  const { buildFoundationDevotionals } = await import("../prisma/foundation-track");
  const prisma = new PrismaClient();

  try {
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { id: true }
    });

    const foundationTrack = await prisma.devotionalTrack.upsert({
      where: { slug: "daily-bread-foundations" },
      update: {
        title: "Daily Bread Foundations",
        description: "A 365-day ordered discipleship path that starts with grace, Scripture, prayer, core doctrine, spiritual formation, and everyday faithfulness.",
        focusCategory: "Core Foundations",
        startingLevel: "FOUNDATIONS"
      },
      create: {
        title: "Daily Bread Foundations",
        slug: "daily-bread-foundations",
        description: "A 365-day ordered discipleship path that starts with grace, Scripture, prayer, core doctrine, spiritual formation, and everyday faithfulness.",
        focusCategory: "Core Foundations",
        startingLevel: "FOUNDATIONS"
      }
    });

    await prisma.devotionalTrackItem.deleteMany({ where: { trackId: foundationTrack.id } });

    const foundationDevotionals = [];
    let updated = 0;

    for (const devotional of buildFoundationDevotionals()) {
      const { categories, ...data } = devotional;

      const saved = await prisma.devotional.upsert({
        where: { date: data.date },
        update: {
          ...data,
          spiritualFocusCategories: categories,
          status: DevotionalStatus.PUBLISHED,
          createdBy: admin?.id ?? null
        },
        create: {
          ...data,
          spiritualFocusCategories: categories,
          status: DevotionalStatus.PUBLISHED,
          createdBy: admin?.id ?? null
        }
      });

      foundationDevotionals.push(saved);
      updated += 1;
    }

    await prisma.devotionalTrackItem.createMany({
      data: foundationDevotionals.map((devotional, index) => ({
        trackId: foundationTrack.id,
        devotionalId: devotional.id,
        sequence: index + 1
      }))
    });

    for (const focus of focusCategories) {
      const track = await prisma.devotionalTrack.upsert({
        where: { slug: slugify(focus) },
        update: {
          title: `${focus} Path`,
          description: `A sequential devotional pathway for ${focus.toLowerCase()}, beginning with foundations and moving one step at a time.`,
          focusCategory: focus,
          startingLevel: "FOUNDATIONS"
        },
        create: {
          title: `${focus} Path`,
          slug: slugify(focus),
          description: `A sequential devotional pathway for ${focus.toLowerCase()}, beginning with foundations and moving one step at a time.`,
          focusCategory: focus,
          startingLevel: "FOUNDATIONS"
        }
      });

      await prisma.devotionalTrackItem.deleteMany({ where: { trackId: track.id } });

      const ordered = [...foundationDevotionals].sort((a, b) => {
        const aMatch = jsonArray(a.spiritualFocusCategories).includes(focus) ? 0 : 1;
        const bMatch = jsonArray(b.spiritualFocusCategories).includes(focus) ? 0 : 1;

        return aMatch - bMatch || a.date.getTime() - b.date.getTime();
      });

      await prisma.devotionalTrackItem.createMany({
        data: ordered.map((devotional, index) => ({
          trackId: track.id,
          devotionalId: devotional.id,
          sequence: index + 1
        }))
      });
    }

    console.log(`Upgraded ${updated} Daily Bread Foundations devotionals and rebuilt ${focusCategories.length + 1} devotional tracks.`);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
