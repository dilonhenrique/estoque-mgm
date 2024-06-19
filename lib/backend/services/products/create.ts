"use server";

import postgres from "prisma/postgres.db";
import { Product } from "../../../../types/schemas";
import { parseProduct } from "./parse";

export default async function create(
  payload: Payload
): Promise<Product | null> {
  const response = await postgres.product.create({
    data: {
      account_id: payload.account_id,
      name: payload.name,
      minStock: payload.minStock,
      unit: payload.unit,
      code: payload.code,
      category_id: payload.category_id,
      img_url: payload.img_url,
    },
    include: {
      category: true,
      stock: { include: { variants: true } },
      variants: { include: { options: true } },
    },
  });

  if (!response) return null;
  return parseProduct(response);
}

type Payload = {
  account_id: string;
  name: string;
  unit?: string;
  minStock?: number;
  code?: string;
  category_id?: string;
  img_url?: string;
};
