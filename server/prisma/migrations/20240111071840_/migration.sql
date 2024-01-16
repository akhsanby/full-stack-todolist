/*
  Warnings:

  - The primary key for the `todo_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `status_id` on the `todo_status` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `status_id` on the `todos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `todos_status_id_fkey`;

-- AlterTable
ALTER TABLE `todo_status` DROP PRIMARY KEY,
    MODIFY `status_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`status_id`);

-- AlterTable
ALTER TABLE `todos` MODIFY `status_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `todo_status`(`status_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
