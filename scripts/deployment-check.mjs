const required = ["DATABASE_URL", "DIRECT_URL", "NEXTAUTH_URL", "NEXTAUTH_SECRET"];
const optional = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "OPENAI_API_KEY"];
const placeholderValues = new Set(["", "replace-with-a-long-random-secret", "your-production-url", "your-supabase-database-url"]);

const missing = required.filter((key) => placeholderValues.has(process.env[key] ?? ""));
const optionalMissing = optional.filter((key) => placeholderValues.has(process.env[key] ?? ""));

if (missing.length > 0) {
  console.error(`Missing required production environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

if (!process.env.DATABASE_URL?.startsWith("postgres")) {
  console.error("DATABASE_URL should use a postgres:// or postgresql:// connection string for production.");
  process.exit(1);
}

if (!process.env.DIRECT_URL?.startsWith("postgres")) {
  console.error("DIRECT_URL should use a postgres:// or postgresql:// direct connection string for production database setup.");
  process.exit(1);
}

if (!process.env.NEXTAUTH_URL?.startsWith("https://")) {
  console.error("NEXTAUTH_URL should be the public HTTPS URL of the deployed app.");
  process.exit(1);
}

if (optionalMissing.length > 0) {
  console.warn(`Optional variables not set yet: ${optionalMissing.join(", ")}`);
}

console.log("Production environment check passed.");
