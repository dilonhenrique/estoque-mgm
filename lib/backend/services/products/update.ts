"use server";

import postgres from "prisma/postgres.db";
import { parseProduct } from "./parse";

export default async function update(id: string, payload: Payload) {
  const response = await postgres.product.update({
    where: { id },
    data: payload,
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
  name?: string;
  unit?: string;
  minStock?: number;
  code?: string;
  category_id?: string;
  img_url?: string;
};
