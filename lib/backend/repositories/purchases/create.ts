"use server";

import { includer } from "@/utils/backend/includer";
import { parsePurchase } from "@/utils/parser/schemas/purchase";
import { LogCause } from "@prisma/client";
import postgres from "prisma/postgres.db";

export default async function create(payload: Payload) {
  const [response] = await postgres.$transaction([
    postgres.purchase.create({
      data: {
        account: { connect: { id: payload.account_id } },
        supplier: payload.supplier_id
          ? { connect: { id: payload.supplier_id } }
          : undefined,
        purchaseItems: {
          createMany: {
            data: payload.products.map((product) => ({
              qty: product.qty,
              product_id: product.id,
              cost: product.cost,
            })),
          },
        },
        logs: {
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
  account_id: string;
  supplier_id?: string;
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
  cost?: number;
};
