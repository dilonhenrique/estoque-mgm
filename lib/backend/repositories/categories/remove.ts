"use server";

import postgres from "prisma/postgres.db";
import { ProductCategory } from "../../../../types/schemas";

export default async function remove(id: string): Promise<ProductCategory> {
  const response = await postgres.productCategory.delete({ where: { id } });

  return response;
}
