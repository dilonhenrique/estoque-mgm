"use server";

import db from "@/backend/database/database";
import { Product } from "../../../../types/schemas";
import { getSessionUser } from "@/utils/authUtils";
import { idToStringArray } from "@/utils/parseUtils";
import { Query } from "../../../../types/types";

export default async function search(query?: Query) {
  const user = await getSessionUser();
  if (!user) return [];

  const { search, sort, limit, skip } = query ?? {};
  const find = search ? { $text: { $search: search } } : {};

  const products = await (
    await db()
  )
    .collection<Product>("products")
    .find({ ...find, userId: user._id })
    .sort(sort ?? { name: "asc" })
    .limit(limit ?? 0)
    .skip(skip ?? 0)
    .toArray();

  return idToStringArray(products);
}
