"use server";

import db from "@/backend/database/database";
import { User } from "../../../../types/schemas";
import { idToStringSingle } from "@/utils/parseUtils";

export default async function findByEmail(email: string) {
  const user = await (await db()).collection<User>("users").findOne({ email });

  if (!user) return null;
  return idToStringSingle(user);
}
