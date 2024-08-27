-- DropForeignKey
ALTER TABLE "ProductLog" DROP CONSTRAINT "ProductLog_purchase_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductLog" ADD CONSTRAINT "ProductLog_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
