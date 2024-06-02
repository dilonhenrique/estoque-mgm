"use server";

import db from "@/backend/database/database";
import { Product } from "../../../../types/schemas";
import { ObjectId } from "mongodb";

export default async function update(id: string, product: Partial<Product>) {
  const response = await (await db()).collection<Product>("products").updateOne(
    {
      _id: new ObjectId(id),
      userId: product.userId,
    },
    { $set: { ...product } }
  );

  return response.matchedCount > 0;
}
