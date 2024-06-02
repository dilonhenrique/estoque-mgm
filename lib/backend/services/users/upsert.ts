"use server";

import db from "@/backend/database/database";
import { getCurrentTime } from "@/utils/timeUtils";
import { User, UserInput } from "../../../../types/schemas";

export default async function upsert(user: UserInput) {
  const response = await (await db()).collection<User>("users").updateOne(
    { email: user.email },
    {
      $set: {
        name: user.name,
        image: user.image,
        lastLoginAt: getCurrentTime(),
      },
      $setOnInsert: {
        email: user.email,
      },
    },
    {
      upsert: true,
    }
  );

  return response.upsertedId?.toString() || response.matchedCount > 0;
}
