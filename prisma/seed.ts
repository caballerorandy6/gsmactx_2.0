import bcrypt from "bcrypt";
import { prisma } from "@/lib/db/prisma";
import { emailsToSeed } from "@/lib/data";

// Admin passwords come from the environment so they never live in git.
// Set SEED_ADMIN1_PASSWORD and SEED_ADMIN2_PASSWORD in .env.local before `npm run seed`.
// upsert uses `update: {}`, so existing admins (and their passwords) are never changed.
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Set it in .env.local before running the seed.`);
  return value;
}

async function main() {
  console.log("Iniciando seed...");

  // Admin 1: admin@rcweb.dev
  const admin1Email = "admin@rcweb.dev";
  const admin1Password = requireEnv("SEED_ADMIN1_PASSWORD");
  const hashedPassword1 = await bcrypt.hash(admin1Password, 10);

  await prisma.admin.upsert({
    where: {
      email: admin1Email,
    },
    update: {},
    create: {
      email: admin1Email,
      password: hashedPassword1,
      name: "RC Web Admin",
    },
  });

  console.log("✅ Admin 1 created/updated:", admin1Email);

  // Admin 2: gsmactx@gmail.com
  const admin2Email = "gsmactx@gmail.com";
  const admin2Password = requireEnv("SEED_ADMIN2_PASSWORD");
  const hashedPassword2 = await bcrypt.hash(admin2Password, 10);

  await prisma.admin.upsert({
    where: {
      email: admin2Email,
    },
    update: {},
    create: {
      email: admin2Email,
      password: hashedPassword2,
      name: "GSM AC Admin",
    },
  });

  console.log("✅ Admin 2 created/updated:", admin2Email);

  console.log("Seeding completed successfully!");
}

// Ensure unique emails
const uniqueEmails = [
  ...new Set(emailsToSeed.map((email) => email.toLowerCase())),
];

// Create subscribers with unique emails
const subscribersData = uniqueEmails.map((email) => ({
  email: email,
}));

// Seed subscribers
if (subscribersData.length > 0) {
  const result = await prisma.subscriber.createMany({
    data: subscribersData,
    skipDuplicates: true, // Skip duplicates if any in the database
  });
  console.log(
    `Seeded ${subscribersData.length} unique subscribers! ${result.count} were created successfully.`
  );
}

main()
  .then(() => {
    console.log("Seed completed ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//Comand to run the seed script:
//npm run seed
