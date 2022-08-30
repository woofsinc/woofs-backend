/*
  Warnings:

  - A unique constraint covering the columns `[tutorId,name]` on the table `pet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pet_tutorId_name_key" ON "pet"("tutorId", "name");
