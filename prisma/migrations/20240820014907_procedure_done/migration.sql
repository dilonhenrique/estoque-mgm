/*
  Warnings:

  - You are about to drop the column `done_at` on the `Procedure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Procedure" DROP COLUMN "done_at",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
