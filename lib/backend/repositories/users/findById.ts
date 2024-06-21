"use server";

import postgres from "prisma/postgres.db";

export default async function findById(id: string) {
  const user = await postgres.user.findFirst({
    where: { id },
  });

  return user;
}
