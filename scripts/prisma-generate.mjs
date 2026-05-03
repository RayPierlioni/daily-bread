import { spawnSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL ?? "";
const usesPostgres = databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://");
const schema = usesPostgres ? "prisma/schema.postgres.prisma" : "prisma/schema.prisma";
const prismaCommand = process.platform === "win32" ? "prisma.cmd" : "prisma";

console.log(`Generating Prisma Client with ${schema}`);

const result = spawnSync(prismaCommand, ["generate", "--schema", schema], {
  shell: process.platform === "win32",
  stdio: "inherit"
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
