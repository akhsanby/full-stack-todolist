/*
  Warnings:

  - The primary key for the `todo_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status_id` on the `todo_status` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `todos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[status]` on the table `todo_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `todos_status_id_fkey`;

-- AlterTable
ALTER TABLE `todo_status` DROP PRIMARY KEY,
    DROP COLUMN `status_id`;

-- AlterTable
ALTER TABLE `todos` DROP COLUMN `status_id`,
    ADD COLUMN `status` VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `todo_status_status_key` ON `todo_status`(`status`);

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_status_fkey` FOREIGN KEY (`status`) REFERENCES `todo_status`(`status`) ON DELETE RESTRICT ON UPDATE CASCADE;
