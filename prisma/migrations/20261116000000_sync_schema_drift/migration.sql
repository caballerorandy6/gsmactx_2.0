-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('AC_MAINTENANCE', 'HEATING_MAINTENANCE', 'AC_REPAIR', 'HEATING_REPAIR', 'AC_INSTALLATION', 'HEATING_INSTALLATION', 'FULL_HVAC_INSTALLATION', 'DUCT_CLEANING', 'FREE_ESTIMATE');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "passwordResetExpires" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "address" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "scheduledTime" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "notes" TEXT,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Appointment_createdBy_idx" ON "Appointment"("createdBy");

-- CreateIndex
CREATE INDEX "Appointment_scheduledDate_idx" ON "Appointment"("scheduledDate");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_passwordResetToken_key" ON "Admin"("passwordResetToken");

-- CreateIndex
CREATE INDEX "Campaign_createdBy_idx" ON "Campaign"("createdBy");

-- CreateIndex
CREATE INDEX "Campaign_sent_idx" ON "Campaign"("sent");

-- CreateIndex
CREATE INDEX "SMSCampaign_createdBy_idx" ON "SMSCampaign"("createdBy");

-- CreateIndex
CREATE INDEX "SMSCampaign_sent_idx" ON "SMSCampaign"("sent");

-- CreateIndex
CREATE INDEX "SMSMessage_smsCampaignId_status_idx" ON "SMSMessage"("smsCampaignId", "status");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

