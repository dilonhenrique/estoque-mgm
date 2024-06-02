"use server";

import db from "@/backend/database/database";
import { Product } from "../../../../types/schemas";
import { ObjectId } from "mongodb";
import { idToStringSingle } from "@/utils/parseUtils";

export default async function findById(id: string) {
  const product = await (await db())
    .collection<Product>("products")
    .findOne({ _id: new ObjectId(id) });

  if (!product) return null;
  return idToStringSingle(product);
}
