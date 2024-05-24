import db from "../database/database";
import { getCurrentTime } from "@/utils/timeUtils";
import { User as NextAuthUser } from "next-auth";

export async function findUserById(id: string) {
  return (await db()).collection("users").findOne({ _id: { equals: id } });
}

export async function findUserByEmail(email: string) {
  return (await db()).collection("users").findOne({ where: { email } });
}

export async function createUser(user: NextAuthUser) {
  return (await db()).collection("users").insertOne({
    email: user.email as string,
    name: user.name as string,
    lastLoginAt: getCurrentTime(),
  });
}

export async function updateUser(email: string, user: Partial<NextAuthUser>) {
  return (await db()).collection("users").updateOne(
    {
      where: { email },
    },
    user
  );
}

export async function upsertUser(user: NextAuthUser) {
  return (await db()).collection("users").updateOne(
    {
      where: { email: user.email as string },
    },
    {
      email: user.email as string,
      name: user.name as string,
      lastLoginAt: getCurrentTime(),
    },
    {
      upsert: true,
    }
  );
}
