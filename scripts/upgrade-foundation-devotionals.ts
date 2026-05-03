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

async function main() {
  const { DevotionalStatus, PrismaClient } = await import("@prisma/client");
  const { buildFoundationDevotionals } = await import("../prisma/foundation-track");
  const prisma = new PrismaClient();

  try {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true }
  });

  const foundationDevotionals = buildFoundationDevotionals();
  let updated = 0;

  for (const devotional of foundationDevotionals) {
    const { categories, ...data } = devotional;

    await prisma.devotional.upsert({
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

    updated += 1;
  }

  console.log(`Upgraded ${updated} Daily Bread Foundations devotionals.`);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
