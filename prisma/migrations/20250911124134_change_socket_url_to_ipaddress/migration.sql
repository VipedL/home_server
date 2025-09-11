/*
  Warnings:

  - You are about to drop the column `url` on the `Socket` table. All the data in the column will be lost.
  - Added the required column `ipAddress` to the `Socket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Socket` DROP COLUMN `url`,
    ADD COLUMN `ipAddress` VARCHAR(191) NOT NULL;
