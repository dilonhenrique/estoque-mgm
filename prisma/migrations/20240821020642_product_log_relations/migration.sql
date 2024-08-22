/*
  Warnings:

  - You are about to drop the column `log_id` on the `Procedure` table. All the data in the column will be lost.
  - You are about to drop the column `log_id` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Procedure" DROP CONSTRAINT "Procedure_log_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_log_id_fkey";

-- DropIndex
DROP INDEX "Procedure_log_id_key";

-- DropIndex
DROP INDEX "Purchase_log_id_key";

-- AlterTable
ALTER TABLE "Procedure" DROP COLUMN "log_id";

-- AlterTable
ALTER TABLE "ProductLog" ADD COLUMN     "procedure_id" TEXT,
ADD COLUMN     "purchase_id" TEXT;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "log_id";

-- AddForeignKey
ALTER TABLE "ProductLog" ADD CONSTRAINT "ProductLog_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "Procedure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLog" ADD CONSTRAINT "ProductLog_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
