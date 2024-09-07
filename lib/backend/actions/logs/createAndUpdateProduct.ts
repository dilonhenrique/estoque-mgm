"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { LogComplete } from "@/types/schemas";
import { logService } from "@/backend/services/logs";

export default async function createAndUpdateProduct(
  payload: FormData | AnyObject
): Promise<ServiceResult<LogComplete>> {
  return await logService.createAndUpdateProduct(payload);
}
