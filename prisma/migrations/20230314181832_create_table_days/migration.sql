/*
  Warnings:

  - Added the required column `daysActivitiesId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "daysActivitiesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_daysActivitiesId_fkey" FOREIGN KEY ("daysActivitiesId") REFERENCES "DaysActivities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
