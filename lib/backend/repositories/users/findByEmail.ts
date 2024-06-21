"use server";

import postgres from "prisma/postgres.db";

export default async function findByEmail(email: string) {
  const user = await postgres.user.findFirst({
    where: { email },
  });

  return user;
}
