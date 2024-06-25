"use server";

import postgres from "prisma/postgres.db";

export default async function findByEmail(email: string) {
  const response = await postgres.user.findUnique({
    where: { email },
  });
  return response;
}
