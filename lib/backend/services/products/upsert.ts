"use server";

import db from "@/backend/database/database";
import { Product } from "../../../../types/schemas";
import { WithStringId } from "@/utils/parseUtils";
import { ObjectId } from "mongodb";

export default async function upsert(product: Partial<WithStringId<Product>>) {
  const response = await (await db()).collection<Product>("products").updateOne(
    { $or: [{ _id: new ObjectId(product._id) }, { code: product.code }] },
    {
      $set: { ...product },
    },
    {
      upsert: true,
    }
  );

  return response.upsertedId?.toString() || response.matchedCount > 0;
}
