/*
  Warnings:

  - You are about to drop the `SubTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SubTask` DROP FOREIGN KEY `SubTask_taskId_fkey`;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `subTasks` JSON NOT NULL;

-- DropTable
DROP TABLE `SubTask`;
