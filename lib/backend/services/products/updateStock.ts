"use server";

import db from "@/backend/database/database";
import { Product } from "../../../../types/schemas";
import { ObjectId } from "mongodb";

export default async function updateStock(
  id: string,
  userId: string,
  increment: number
) {
  const response = await (await db()).collection<Product>("products").updateOne(
    {
      _id: new ObjectId(id),
      userId: userId,
    },
    { $inc: { stock: increment } }
  );

  return response.matchedCount > 0;
}
