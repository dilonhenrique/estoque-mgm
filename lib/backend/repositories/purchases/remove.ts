"use server";

import { includer } from "@/utils/backend/includer";
import postgres from "prisma/postgres.db";
import { purchaseRepo } from ".";

export default async function remove(id: string) {
  const currentPurchase = await purchaseRepo.findById(id);

  const response = await postgres.$transaction([
    ...currentPurchase?.items.map((product) =>
      postgres.product.update({
        where: { id: product.id },
        data: {
          stock: {
            decrement: product.qty,
          },
        },
      })
    ),
    postgres.productLog.deleteMany({
      where: { purchase_id: id },
    }),
    postgres.purchase.delete({
      where: { id },
      include: includer.purchase,
    }),
  ]);

  return !!response;
}
