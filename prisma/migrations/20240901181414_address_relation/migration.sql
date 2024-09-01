/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address_id]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_address_id_key" ON "Account"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_address_id_key" ON "Customer"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_address_id_key" ON "Supplier"("address_id");
