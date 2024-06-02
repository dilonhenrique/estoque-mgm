"use server";

import db from "@/backend/database/database";
import { User } from "../../../../types/schemas";
import { ObjectId } from "mongodb";
import { idToStringSingle } from "@/utils/parseUtils";

export default async function findById(id: string) {
  const user = await (await db())
    .collection<User>("users")
    .findOne({ _id: new ObjectId(id) });

  if (!user) return null;
  return idToStringSingle(user);
}
