/*
  Warnings:

  - Added the required column `updated_at` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_procedure_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_purchase_id_fkey";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductLog" ADD CONSTRAINT "ProductLog_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "Procedure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLog" ADD CONSTRAINT "ProductLog_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
