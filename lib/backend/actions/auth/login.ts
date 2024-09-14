"use server";

import { authService } from "@/backend/services/auth";
import { ActionResult, AnyObject } from "@/types/types";
import { actionResult } from "@/utils/backend/actionResult";

export default async function login(
  formData: FormData | AnyObject
): Promise<ActionResult<string | undefined | null>> {
  const response = await authService.login(formData);
  return actionResult(response);
}
