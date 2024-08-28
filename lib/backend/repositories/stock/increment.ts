"use server";

import postgres from "prisma/postgres.db";
import { parseProduct } from "@/utils/parser/schemas/product";

export default async function increment(id: string, increment: number) {
  const product = await postgres.product.update({
    where: { id },
    data: { stock: { increment } },
    include: { category: true },
  });

  if (!product) return null;
  return parseProduct(product);
}
