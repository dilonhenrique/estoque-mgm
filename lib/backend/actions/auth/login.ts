"use server";

import { authService } from "@/backend/services/auth";
import { AnyObject, ServiceResult } from "@/types/types";

export default async function login(
  formData: FormData | AnyObject
): Promise<ServiceResult<string | undefined | null>> {
  return await authService.login(formData);
}
