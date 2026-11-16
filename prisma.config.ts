import "dotenv/config";
import { defineConfig } from "prisma/config";

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
