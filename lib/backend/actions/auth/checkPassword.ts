"use server";

import { authService } from "@/backend/services/auth";

export default async function checkPassword(payload: {
  email: string;
  password: string;
}) {
  return await authService.checkPassword(payload);
}
