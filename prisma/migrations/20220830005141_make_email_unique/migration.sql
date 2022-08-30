/*
  Warnings:

  - You are about to drop the column `userId` on the `pet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `about` to the `pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorId` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_userId_fkey";

-- AlterTable
ALTER TABLE "pet" DROP COLUMN "userId",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT[],
ADD COLUMN     "tutorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
