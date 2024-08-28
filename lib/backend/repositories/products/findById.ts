"use server";

import postgres from "prisma/postgres.db";
import { parseProduct } from "@/utils/parser/schemas/product";
import { includer } from "@/utils/backend/includer";

export default async function findById(id: string) {
  const response = await postgres.product.findFirst({
    where: { id },
    include: includer.productWithLogs,
  });

  if (!response) return null;
  return parseProduct(response);
}
