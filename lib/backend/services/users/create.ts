"use server";

import db from "@/backend/database/database";
import { getCurrentTime } from "@/utils/timeUtils";
import { User, UserInput } from "../../../../types/schemas";

export default async function create(user: UserInput) {
  const response = await (await db()).collection<User>("users").insertOne({
    email: user.email,
    name: user.name,
    image: user.image,
    lastLoginAt: getCurrentTime(),
  });

  return response.insertedId.toString();
}
