"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { LogComplete } from "@/types/schemas";
import { logService } from "@/backend/services/logs";

export default async function createAndUpdateProduct(
  payload: FormData | AnyObject
): Promise<MutationResult<LogComplete>> {
  return await logService.createAndUpdateProduct(payload);
}
