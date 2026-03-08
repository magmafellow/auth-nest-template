/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `User` table. All the data in the column will be lost.
  - Added the required column `dateTimeCreated` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dateCreated",
ADD COLUMN     "dateTimeCreated" TIMESTAMP(3) NOT NULL;
