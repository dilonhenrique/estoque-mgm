"use server";

import { logRepo } from "@/backend/repositories/logs";
import { ServiceResult } from "@/types/types";
import { LogComplete } from "@/types/schemas";

export default async function removeAndUpdateProduct(
  id: string
): Promise<ServiceResult<LogComplete>> {
  const response = await logRepo.removeAndUpdateProduct(id);

  return { success: true, fieldErrors: {}, data: response };
}
