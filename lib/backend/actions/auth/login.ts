"use server";

import { authService } from "@/backend/services/auth";
import { AnyObject, MutationResult } from "@/types/types";

export default async function login(
  formData: FormData | AnyObject
): Promise<MutationResult<string | undefined | null>> {
  return await authService.login(formData);
}
