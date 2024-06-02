"use server";

import db from "@/backend/database/database";
import { User, UserInput } from "../../../../types/schemas";
import { ObjectId } from "mongodb";

export default async function update(id: string, user: Partial<UserInput>) {
  const response = await (await db())
    .collection<User>("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { ...user } });

  return response.matchedCount > 0;
}
