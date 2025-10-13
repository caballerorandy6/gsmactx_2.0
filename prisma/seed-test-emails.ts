import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const testEmails = [
  "caballerorandy7@gmail.com",
  "gsmactx@outlook.com",
  "michel@gsmactx.com",
  "***REMOVED***",
  "***REMOVED***",
];

async function main() {
  console.log("🧪 Seeding test emails...");

  for (const email of testEmails) {
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      console.log(`✓ Test email already exists: ${email}`);
      // Ensure they're subscribed
      await prisma.subscriber.update({
        where: { email },
        data: { isSubscribed: true },
      });
    } else {
      await prisma.subscriber.create({
        data: {
          email,
          isSubscribed: true,
        },
      });
      console.log(`✓ Created test email: ${email}`);
    }
  }

  console.log("✅ Test emails seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding test emails:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
