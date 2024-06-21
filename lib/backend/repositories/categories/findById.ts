"use server";

import postgres from "prisma/postgres.db";
import { ProductCategory } from "../../../../types/schemas";

export default async function findById(
  id: string
): Promise<ProductCategory | null> {
  const response = await postgres.productCategory.findFirst({ where: { id } });

  return response;
}
