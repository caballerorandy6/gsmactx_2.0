import bcrypt from "bcrypt";
import { prisma } from "@/libs/prisma";
import { emailsToSeed } from "@/libs/data";

async function main() {
  console.log("Iniciando seed...");

  // Admin 1: From environment variables (main admin)
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "The ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be defined."
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: {
      email: adminEmail,
    },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("✅ Admin 1 created/updated:", adminEmail);

  // Admin 2: Secondary admin (hardcoded for seed)
  const secondAdminEmail = "admin2@gsmactx.com";
  const secondAdminPassword = "***REMOVED***"; // Change this in production
  const hashedPassword2 = await bcrypt.hash(secondAdminPassword, 10);

  await prisma.admin.upsert({
    where: {
      email: secondAdminEmail,
    },
    update: {},
    create: {
      email: secondAdminEmail,
      password: hashedPassword2,
      name: "Secondary Admin",
    },
  });

  console.log("✅ Admin 2 created/updated:", secondAdminEmail);
  console.log("📧 Admin 2 password:", secondAdminPassword);

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
