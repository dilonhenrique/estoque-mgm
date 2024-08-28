"use server";

import { includer } from "@/utils/backend/includer";
import { parseLogComplete } from "@/utils/parser/schemas/log";
import { LogCause } from "@prisma/client";
import postgres from "prisma/postgres.db";

export default async function createAndUpdateProduct(payload: Payload) {
  const [response, product] = await postgres.$transaction([
    postgres.productLog.create({
      data: {
        qty: payload.qty,
        cause: payload.cause,
        product_id: payload.product_id,
        procedure_id: payload.procedure_id,
        purchase_id: payload.purchase_id,
      },
      include: includer.logComplete,
    }),
    postgres.product.update({
      where: { id: payload.product_id },
      data: {
        stock: { increment: payload.qty },
      },
    }),
  ]);

  return parseLogComplete(response);
}

type Payload = {
  qty: number;
  cause: LogCause;
  product_id: string;
  procedure_id?: string;
  purchase_id?: string;
};
