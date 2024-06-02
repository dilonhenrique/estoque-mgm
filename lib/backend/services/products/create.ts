"use server";

import db from "@/backend/database/database";
import { Product } from "../../../../types/schemas";
import { z } from "zod";

export default async function create(product: Product) {
  const payload = schema.parse(product);

  const response = await (await db())
    .collection<Product>("products")
    .insertOne(payload);

  return response.insertedId?.toString();
}

const schema = z.object({
  name: z.string(),
  unit: z.string(),
  stock: z.coerce.number(),
  minStock: z.coerce.number().optional(),
  userId: z.string(),
  code: z.string().optional(),
  categoryId: z.string().optional(),
  image: z.string().optional(),
  brand: z.string().optional(),
});
