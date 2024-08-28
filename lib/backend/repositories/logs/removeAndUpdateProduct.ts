"use server";

import { includer } from "@/utils/backend/includer";
import { parseLogComplete } from "@/utils/parser/schemas/log";
import postgres from "prisma/postgres.db";
import { logRepo } from ".";

export default async function removeAndUpdateProduct(id: string) {
  const log = await logRepo.findById(id);

  const [response, product] = await postgres.$transaction([
    postgres.productLog.delete({
      where: { id },
      include: includer.logComplete,
    }),
    postgres.product.update({
      where: { id: log.product.id },
      data: {
        stock: { increment: log.qty },
      },
    }),
  ]);

  return parseLogComplete(response);
}
