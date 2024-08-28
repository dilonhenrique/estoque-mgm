"use server";

import { includer } from "@/utils/backend/includer";
import { parseProcedure } from "@/utils/parser/schemas/procedure";
import postgres from "prisma/postgres.db";
import { procedureRepo } from ".";

export default async function unsetDone(id: string) {
  const procedure = await procedureRepo.findById(id);

  if (procedure?.done === false) return procedure;

  const [updatedProcedure] = await postgres.$transaction([
    postgres.procedure.update({
      where: { id },
      data: {
        done: false,
        logs: { deleteMany: {} },
      },
      include: includer.procedureWithLog,
    }),
    ...procedure.products.map((product) =>
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

  return parseProcedure(updatedProcedure);
}
