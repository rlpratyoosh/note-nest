/*
  Warnings:

  - Made the column `title` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "description" TEXT,
ALTER COLUMN "title" SET NOT NULL;
