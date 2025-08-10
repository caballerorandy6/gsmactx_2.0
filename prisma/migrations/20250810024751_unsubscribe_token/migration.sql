/*
  Warnings:

  - A unique constraint covering the columns `[unsubscribeToken]` on the table `Subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "unsubscribeToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_unsubscribeToken_key" ON "Subscriber"("unsubscribeToken");
