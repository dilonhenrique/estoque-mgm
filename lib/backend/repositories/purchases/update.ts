"use server";

import postgres from "prisma/postgres.db";
import { includer } from "@/utils/backend/includer";
import { parsePurchase } from "@/utils/parser/schemas/purchase";
import { LogCause } from "@prisma/client";
import { purchaseRepo } from ".";
import { productDiff } from "@/utils/backend/productDiff";

export default async function update(id: string, payload: Payload) {
  const currentPurchase = await purchaseRepo.findById(id);

  const products = productDiff(currentPurchase.items, payload.products);

  const [response] = await postgres.$transaction([
    postgres.purchase.update({
      where: { id },
      data: {
        supplier: payload.supplier_id
          ? { connect: { id: payload.supplier_id } }
          : currentPurchase.supplier
          ? { delete: {} }
          : undefined,
        purchaseItems: {
          updateMany: products.toUpdate.map((prod) => ({
            where: { product_id: prod.id, purchase_id: id },
            data: {
              qty: { increment: prod.qtyDiff },
              cost: prod.costUpdate,
            },
          })),
          create: products.toAdd.map((prod) => ({
            product_id: prod.id,
            qty: prod.qty,
            cost: prod.cost,
          })),
          deleteMany: products.toRemove.map((prod) => ({
            product_id: prod.id,
            purchase_id: id,
          })),
        },
        logs: {
          updateMany: products.toUpdate.map((prod) => ({
            where: { product_id: prod.id, purchase_id: id },
            data: {
              qty: { increment: prod.qtyDiff },
            },
          })),
          create: products.toAdd.map((prod) => ({
            product_id: prod.id,
            qty: prod.qty,
            cause: LogCause.purchase,
          })),
          deleteMany: products.toRemove.map((prod) => ({
            product_id: prod.id,
            purchase_id: id,
          })),
        },
      },
      include: includer.purchaseWithLog,
    }),
    ...products.toUpdate.map((prod) =>
      postgres.product.update({
        where: { id: prod.id },
        data: {
          stock: { increment: prod.qtyDiff },
        },
      })
    ),
    ...products.toAdd.map((prod) =>
      postgres.product.update({
        where: { id: prod.id },
        data: {
          stock: { increment: prod.qty },
        },
      })
    ),
    ...products.toRemove.map((prod) =>
      postgres.product.update({
        where: { id: prod.id },
        data: {
          stock: { decrement: prod.qty },
        },
      })
    ),
  ]);

  return parsePurchase(response);
}

type Payload = {
  supplier_id?: string | null;
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
  cost?: number;
};
