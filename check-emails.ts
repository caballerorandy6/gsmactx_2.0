import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const emailsToCheck = [
  "***REMOVED***",
  "***REMOVED***",
];

async function main() {
  console.log("🔍 Checking emails in database...\n");

  for (const email of emailsToCheck) {
    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (subscriber) {
      console.log(`✓ Found: ${email}`);
      console.log(`  - ID: ${subscriber.id}`);
      console.log(`  - Subscribed: ${subscriber.isSubscribed}`);
      console.log(`  - Token: ${subscriber.unsubscribeToken ? "Yes" : "No"}`);
      console.log(`  - Created: ${subscriber.createdAt}\n`);
    } else {
      console.log(`✗ NOT FOUND: ${email}\n`);
    }
  }

  // Check all test emails
  console.log("\n📋 All test emails in database:");
  const allTestEmails = await prisma.subscriber.findMany({
    where: {
      email: {
        in: [
          "caballerorandy7@gmail.com",
          "caballerorandy6@gmail.com",
          "yani.cruz4997@gmail.com",
          "contactus@rcweb.dev",
          "gsmactx@outlook.com",
          "michel@gsmactx.com",
          "***REMOVED***",
          "***REMOVED***",
        ],
      },
    },
  });

  console.log(`Total found: ${allTestEmails.length}/8`);
  allTestEmails.forEach((sub) => {
    console.log(`  - ${sub.email} (Subscribed: ${sub.isSubscribed})`);
  });
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
