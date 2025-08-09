import bcrypt from "bcrypt";
import { prisma } from "@/libs/prisma";
import { emailsToSeed } from "@/libs/data";

async function main() {
  console.log("Iniciando seed...");

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Las variables de entorno ADMIN_EMAIL y ADMIN_PASSWORD deben estar definidas."
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
