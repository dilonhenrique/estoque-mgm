"use server";

import postgres from "prisma/postgres.db";
import { ProductCategory } from "../../../../types/schemas";

export default async function update(id: string, name: string): Promise<ProductCategory> {
  const response = await postgres.productCategory.update({
    where: { id },
    data: { name },
  });

  return response;
}
