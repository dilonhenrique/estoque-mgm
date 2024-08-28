"use server";

import postgres from "prisma/postgres.db";
import { parseProduct } from "@/utils/parser/schemas/product";
import { includer } from "@/utils/backend/includer";

export default async function update(id: string, payload: Payload) {
  const product = await postgres.product.update({
    where: { id },
    data: {
      name: payload.name,
      unit: payload.unit,
      minStock: payload.minStock,
      code: payload.code,
      category_id: payload.category_id,
      img_url: payload.img_url,
      stock: payload.stock
    },
    include: includer.productWithLogs,
  });

  if (!product) return null;
  return parseProduct(product);
}

type Payload = {
  name?: string;
  stock?: number;
  unit?: string;
  minStock?: number;
  code?: string;
  category_id?: string;
  img_url?: string;
};
