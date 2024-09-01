"use server";

import postgres from "prisma/postgres.db";
import { includer } from "@/utils/backend/includer";
import { parseProcedure } from "@/utils/parser/schemas/procedure";
import { procedureRepo } from ".";
import { productDiff } from "@/utils/backend/productDiff";

export default async function update(id: string, payload: Payload) {
  const currentProcedure = await procedureRepo.findById(id);

  if (currentProcedure?.done === true) return null;

  const products = productDiff(currentProcedure.products, payload.products);

  const response = await postgres.procedure.update({
    where: { id },
    data: {
      name: payload.name,
      service: payload.service_id
        ? { connect: { id: payload.service_id } }
        : currentProcedure.service
        ? { delete: {} }
        : undefined,
      customer: payload.customer_id
        ? { connect: { id: payload.customer_id } }
        : currentProcedure.customer
        ? { delete: {} }
        : undefined,
      scheduled_for: payload.scheduled_for ?? null,
      confirmed_by_customer: payload.confirmed_by_customer,
      productsOnProcedures: {
        updateMany: products.toUpdate.map((prod) => ({
          where: { product_id: prod.id, procedure_id: id },
          data: {
            qty: { increment: prod.qtyDiff },
          },
        })),
        create: products.toAdd.map((prod) => ({
          product_id: prod.id,
          qty: prod.qty,
        })),
        deleteMany: products.toRemove.map((prod) => ({
          product_id: prod.id,
          procedure_id: id,
        })),
      },
    },
    include: includer.procedureWithLog,
  });

  return parseProcedure(response);
}

type Payload = {
  name?: string;
  service_id?: string;
  customer_id?: string;
  scheduled_for?: Date;
  confirmed_by_customer?: boolean;
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
};
