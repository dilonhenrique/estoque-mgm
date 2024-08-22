"use server";

import { includer } from "@/utils/includer";
import { parseProcedure } from "@/utils/parser/procedure";
import { LogCause } from "@prisma/client";
import postgres from "prisma/postgres.db";
import { procedureRepo } from ".";

export default async function setDone(id: string, payload: Payload) {
  const procedure = await procedureRepo.findById(id);

  if (procedure?.done === true) return procedure;

  const [updatedProcedure] = await postgres.$transaction([
    postgres.procedure.update({
      where: { id },
      data: {
        done: true,
        // productsOnProcedures: {
        //   deleteMany: {},
        //   createMany: {
        //     data: payload.products.map((product) => ({
        //       qty: product.qty,
        //       product_id: product.id,
        //     })),
        //   },
        // },
        logs: {
          createMany: {
            data: payload.products.map((product) => ({
              product_id: product.id,
              qty: product.qty,
              cause: LogCause.procedure,
            })),
          },
        },
      },
      include: includer.procedureWithLog,
    }),
    ...payload.products.map((product) =>
      postgres.product.update({
        where: { id: product.id },
        data: {
          stock: {
            decrement: product.qty,
          },
        },
      })
    ),
  ]);

  return parseProcedure(updatedProcedure);
}

type Payload = {
  products: ProductPayload[];
};

type ProductPayload = {
  qty: number;
  id: string;
};
