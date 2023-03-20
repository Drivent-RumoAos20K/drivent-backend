/*
  Warnings:

  - You are about to drop the column `Capacity` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `daysActivitiesId` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_daysActivitiesId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "Capacity",
DROP COLUMN "daysActivitiesId",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "dayId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "DaysActivities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
