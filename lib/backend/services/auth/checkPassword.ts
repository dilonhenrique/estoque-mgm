"use server";

import { authRepo } from "@/backend/repositories/auth";

export default async function checkPassword(payload: {
  email: string;
  password: string;
}) {
  return await authRepo.checkPassword(payload);
}
