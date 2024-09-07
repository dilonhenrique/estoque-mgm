"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { purchaseService } from "@/backend/services/purchases";
import { actionResult } from "@/utils/backend/actionResult";

export default async function create(
  payload: FormData | AnyObject
): Promise<ActionResult<Purchase | null>> {
  const response = await purchaseService.create(payload);
  return actionResult(response);
}
