"use server";

import { includer } from "@/utils/includer";
import { parseProcedure } from "@/utils/parser/procedure";
import postgres from "prisma/postgres.db";

export default async function create(payload: Payload) {
  const response = await postgres.procedure.create({
    data: {
      account: { connect: { id: payload.account_id } },
      created_by: { connect: { id: payload.created_by } },
      service: payload.service_id
        ? { connect: { id: payload.service_id } }
        : undefined,
      customer: payload.customer_id
        ? { connect: { id: payload.customer_id } }
        : undefined,
      scheduled_for: payload.scheduled_for,
      done: payload.done,
      confirmed_by_customer: payload.confirmed_by_customer,
      productsOnProcedures: {
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
  account_id: string;
  service_id?: string;
  customer_id?: string;
  created_by: string;
  scheduled_for?: Date;
  done?: boolean;
  confirmed_by_customer?: boolean;
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
};
