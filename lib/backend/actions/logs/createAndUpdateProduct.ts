"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { LogComplete } from "@/types/schemas";
import { logService } from "@/backend/services/logs";
import { actionResult } from "@/utils/backend/actionResult";

export default async function createAndUpdateProduct(
  payload: FormData | AnyObject
): Promise<ActionResult<LogComplete>> {
  const response = await logService.createAndUpdateProduct(payload);
  return actionResult(response);
}
