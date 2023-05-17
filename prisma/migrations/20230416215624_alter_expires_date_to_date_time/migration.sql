/*
  Warnings:

  - You are about to alter the column `expires_date` on the `usertoken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `usertoken` MODIFY `expires_date` DATETIME(3) NOT NULL;
