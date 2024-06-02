"use server";

import db from "@/backend/database/database";
import { Product } from "../../../../types/schemas";
import { ObjectId } from "mongodb";

export default async function remove(id: string) {
  const response = await (await db())
    .collection<Product>("products")
    .deleteOne({
      _id: new ObjectId(id),
    });

  return response.deletedCount > 0;
}
