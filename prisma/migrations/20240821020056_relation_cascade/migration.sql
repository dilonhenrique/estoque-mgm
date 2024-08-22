-- DropForeignKey
ALTER TABLE "ProductOnService" DROP CONSTRAINT "ProductOnService_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnService" DROP CONSTRAINT "ProductOnService_service_id_fkey";

-- AddForeignKey
ALTER TABLE "ProductOnService" ADD CONSTRAINT "ProductOnService_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnService" ADD CONSTRAINT "ProductOnService_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
