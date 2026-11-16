import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// .env.local points to the local dev database (RAN-77); production
// credentials only exist in Vercel, where neither file is present.
config({ path: [".env.local", ".env"], quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Optional so `prisma generate` (postinstall) runs without database
    // credentials; commands that connect still fail fast when it is unset.
    url: process.env.DIRECT_URL,
  },
});
