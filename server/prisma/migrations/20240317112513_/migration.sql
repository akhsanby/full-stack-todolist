/*
  Warnings:

  - Added the required column `position` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todos` ADD COLUMN `position` INTEGER NOT NULL;
