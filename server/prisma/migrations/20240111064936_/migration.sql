/*
  Warnings:

  - You are about to drop the `todo_done` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todo_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todo_upcoming` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `todo_done` DROP FOREIGN KEY `todo_done_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `todo_progress` DROP FOREIGN KEY `todo_progress_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `todo_upcoming` DROP FOREIGN KEY `todo_upcoming_user_id_fkey`;

-- DropTable
DROP TABLE `todo_done`;

-- DropTable
DROP TABLE `todo_progress`;

-- DropTable
DROP TABLE `todo_upcoming`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `token` TEXT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todos` (
    `todo_id` VARCHAR(100) NOT NULL,
    `category` VARCHAR(50) NULL,
    `status` VARCHAR(10) NOT NULL,
    `text` TEXT NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `status_id` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`todo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todo_status` (
    `status_id` VARCHAR(100) NOT NULL,
    `status` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `todo_status`(`status_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
