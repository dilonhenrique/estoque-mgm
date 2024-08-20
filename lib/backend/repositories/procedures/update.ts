"use server";

import { includer } from "@/utils/includer";
import { parseProcedure } from "@/utils/parser/procedure";
import postgres from "prisma/postgres.db";

export default async function update(id: string, payload: Payload) {
  const response = await postgres.procedure.update({
    where: { id },
    data: {
      service: payload.service_id
        ? { connect: { id: payload.service_id } }
        : { disconnect: {} },
      customer: payload.customer_id
        ? { connect: { id: payload.customer_id } }
        : { disconnect: {} },
      scheduled_for: payload.scheduled_for ?? null,
      done: payload.done,
      confirmed_by_customer: payload.confirmed_by_customer,
      productsOnProcedures: {
        deleteMany: {},
        createMany: {
          data: payload.products.map((product) => ({
            qty: product.qty,
            product_id: product.id,
          })),
        },
      },
    },
    include: includer.procedure,
  });

  return parseProcedure(response);
}

type Payload = {
  service_id?: string;
  customer_id?: string;
  scheduled_for?: Date;
  done?: boolean;
  confirmed_by_customer?: boolean;
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
};
