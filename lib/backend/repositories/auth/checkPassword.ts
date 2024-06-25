"use server";

import postgres from "prisma/postgres.db";
import { compareSync } from "bcrypt-ts";

export default async function checkPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await postgres.user.findFirst({
    where: { email },
  });

  if (!response || !compareSync(password, response.password)) return null;

  return response;
}
