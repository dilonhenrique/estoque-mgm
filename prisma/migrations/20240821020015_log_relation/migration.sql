/*
  Warnings:

  - You are about to drop the column `procedure_id` on the `ProductLog` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_id` on the `ProductLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[log_id]` on the table `Procedure` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[log_id]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `log_id` to the `Procedure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `log_id` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_procedure_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_purchase_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnProcedure" DROP CONSTRAINT "ProductOnProcedure_procedure_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnProcedure" DROP CONSTRAINT "ProductOnProcedure_product_id_fkey";

-- AlterTable
ALTER TABLE "Procedure" ADD COLUMN     "log_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductLog" DROP COLUMN "procedure_id",
DROP COLUMN "purchase_id";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "log_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Procedure_log_id_key" ON "Procedure"("log_id");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_log_id_key" ON "Purchase"("log_id");

-- AddForeignKey
ALTER TABLE "Procedure" ADD CONSTRAINT "Procedure_log_id_fkey" FOREIGN KEY ("log_id") REFERENCES "ProductLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnProcedure" ADD CONSTRAINT "ProductOnProcedure_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnProcedure" ADD CONSTRAINT "ProductOnProcedure_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "Procedure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_log_id_fkey" FOREIGN KEY ("log_id") REFERENCES "ProductLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
