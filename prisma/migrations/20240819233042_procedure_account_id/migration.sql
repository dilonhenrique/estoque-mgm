/*
  Warnings:

  - Added the required column `account_id` to the `Procedure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Procedure" ADD COLUMN     "account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
