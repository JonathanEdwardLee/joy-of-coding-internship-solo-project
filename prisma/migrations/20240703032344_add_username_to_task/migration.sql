/*
  Warnings:

  - You are about to drop the column `name` on the `task` table. All the data in the column will be lost.
  - Added the required column `username` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `name`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
