-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "failedCount" INTEGER,
ADD COLUMN     "sentCount" INTEGER,
ADD COLUMN     "totalEmails" INTEGER;
