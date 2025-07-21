import bcrypt from "bcrypt";
import { prisma } from "@/libs/prisma";

async function main() {
  console.log("Iniciando seed...");

  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      email: email,
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("Seeding completed successfully!");
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
