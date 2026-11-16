import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import type { AppointmentStatus, ServiceType } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

// Development seed: fake data only (example.com emails, 555 phone numbers).
// It wipes every table first, so it refuses to run against production.
//   npm run seed:dev
// Remote dev databases (e.g. the Vercel preview one) also need
// ALLOW_REMOTE_DEV_SEED=1 and DEV_ADMIN_PASSWORD.

const PROD_DB_REF = "focgomtjaliyjgykjaqq";
const DEV_ADMIN_EMAIL = "dev@gsmactx.test";

function assertSafeTarget(): { remote: boolean } {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set.");
  if (url.includes(PROD_DB_REF)) {
    throw new Error("Refusing to seed: DATABASE_URL points to production.");
  }
  const host = new URL(url).hostname;
  const remote = !["localhost", "127.0.0.1", "::1"].includes(host);
  if (remote && process.env.ALLOW_REMOTE_DEV_SEED !== "1") {
    throw new Error(
      `Refusing to seed remote host ${host}. Set ALLOW_REMOTE_DEV_SEED=1 if it is a dev database.`
    );
  }
  return { remote };
}

// Same storage convention as appointmentAction: noon local time on the given day.
function dayFromToday(offset: number): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset, 12, 0, 0);
}

async function main() {
  const { remote } = assertSafeTarget();
  const password =
    process.env.DEV_ADMIN_PASSWORD ?? (remote ? undefined : "DevAdmin123!");
  if (!password) throw new Error("Set DEV_ADMIN_PASSWORD to seed a remote database.");

  // Children first so foreign keys never block the wipe.
  await prisma.campaignEmailLog.deleteMany();
  await prisma.sMSMessage.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.sMSCampaign.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.subscriber.deleteMany();
  await prisma.admin.deleteMany();

  const admin = await prisma.admin.create({
    data: {
      email: DEV_ADMIN_EMAIL,
      password: await bcrypt.hash(password, 10),
      name: "Dev Admin",
    },
  });

  const subscribers = await Promise.all(
    Array.from({ length: 12 }, (_, i) =>
      prisma.subscriber.create({
        data: {
          email: `customer${i + 1}@example.com`,
          name: `Test Customer ${i + 1}`,
          phone: `(281) 555-01${String(i + 1).padStart(2, "0")}`,
          address: `${100 + i} Test Street, Cypress, TX 77429`,
          isSubscribed: i % 5 !== 4,
          unsubscribeToken: randomUUID(),
        },
      })
    )
  );

  const appointments: Array<[number, ServiceType, AppointmentStatus, string]> = [
    [-21, "AC_MAINTENANCE", "COMPLETED", "8:00 AM"],
    [-14, "HEATING_REPAIR", "COMPLETED", "10:00 AM"],
    [-9, "DUCT_CLEANING", "CANCELLED", "1:00 PM"],
    [-3, "AC_REPAIR", "COMPLETED", "3:00 PM"],
    [0, "FREE_ESTIMATE", "IN_PROGRESS", "11:00 AM"],
    [1, "AC_INSTALLATION", "CONFIRMED", "8:00 AM"],
    [2, "HEATING_MAINTENANCE", "PENDING", "12:00 PM"],
    [5, "FULL_HVAC_INSTALLATION", "CONFIRMED", "10:00 AM"],
    [8, "HEATING_INSTALLATION", "PENDING", "2:00 PM"],
    [14, "AC_MAINTENANCE", "PENDING", "4:00 PM"],
  ];
  await prisma.appointment.createMany({
    data: appointments.map(([offset, serviceType, status, scheduledTime], i) => ({
      clientName: `Test Client ${i + 1}`,
      clientEmail: `client${i + 1}@example.com`,
      clientPhone: `(832) 555-02${String(i + 1).padStart(2, "0")}`,
      serviceType,
      status,
      scheduledDate: dayFromToday(offset),
      scheduledTime,
      address: `${200 + i} Sample Lane, Cypress, TX 77433`,
      notes: i % 3 === 0 ? "Seeded test appointment." : null,
      createdBy: i % 2 === 0 ? admin.id : null,
    })),
  });

  const active = subscribers.filter((s) => s.isSubscribed);
  const sentCampaign = await prisma.campaign.create({
    data: {
      title: "Fall Tune-Up Special",
      subject: "Get your heating ready for winter",
      content: "<p>Seeded campaign content for local testing.</p>",
      templateType: "seasonal",
      createdBy: admin.id,
      sent: true,
      sentAt: dayFromToday(-7),
      totalEmails: active.length,
      sentCount: active.length - 1,
      failedCount: 1,
    },
  });
  await prisma.campaignEmailLog.createMany({
    data: active.map((s, i) => ({
      campaignId: sentCampaign.id,
      subscriberId: s.id,
      status: i === 0 ? "failed" : "sent",
      error: i === 0 ? "Seeded failure for retry testing" : null,
      sentAt: i === 0 ? null : dayFromToday(-7),
    })),
  });
  await prisma.campaign.create({
    data: {
      title: "Spring AC Check (draft)",
      subject: "Beat the Texas heat",
      content: "<p>Draft campaign for local testing.</p>",
      templateType: "promotional",
      createdBy: admin.id,
    },
  });

  console.log(
    `Dev seed done: admin ${DEV_ADMIN_EMAIL}, ${subscribers.length} subscribers, ` +
      `${appointments.length} appointments, 2 campaigns.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
