"use server";

import postgres from "prisma/postgres.db";
import { parseProduct } from "./parse";

export default async function findById(id: string) {
  const response = await postgres.product.findFirst({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!response) return null;
  return parseProduct(response);
}
