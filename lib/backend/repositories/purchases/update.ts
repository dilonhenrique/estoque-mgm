"use server";

import { includer } from "@/utils/backend/includer";
import { parsePurchase } from "@/utils/parser/schemas/purchase";
import { LogCause } from "@prisma/client";
import postgres from "prisma/postgres.db";
import { purchaseRepo } from ".";

export default async function update(id: string, payload: Payload) {
  const currentPurchase = await purchaseRepo.findById(id);

  const [response] = await postgres.$transaction([
    postgres.purchase.update({
      where: { id },
      data: {
        supplier: payload.supplier_id
          ? { connect: { id: payload.supplier_id } }
          : { disconnect: {} },
        purchaseItems: {
          deleteMany: {},
          createMany: {
            data: payload.products.map((product) => ({
              qty: product.qty,
              product_id: product.id,
              cost: product.cost,
            })),
          },
        },
        logs: {
          deleteMany: {},
          createMany: {
            data: payload.products.map((product) => ({
              product_id: product.id,
              qty: product.qty,
              cause: LogCause.purchase,
            })),
          },
        },
      },
      include: includer.purchaseWithLog,
    }),
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
    ...payload.products.map((product) =>
      postgres.product.update({
        where: { id: product.id },
        data: {
          stock: {
            increment: product.qty,
          },
        },
      })
    ),
  ]);

  return parsePurchase(response);
}

type Payload = {
  supplier_id?: string;
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
  cost?: number;
};
