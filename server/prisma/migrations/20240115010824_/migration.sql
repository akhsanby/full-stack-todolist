/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `todos` DROP COLUMN `updatedAt`,
    MODIFY `createdAt` VARCHAR(50) NULL;
