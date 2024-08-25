"use server";

import { logRepo } from "@/backend/repositories/logs";
import { MutationResult } from "../../../../types/types";
import { LogComplete } from "../../../../types/schemas";

export default async function removeAndUpdateProduct(
  id: string
): Promise<MutationResult<LogComplete>> {
  const response = await logRepo.removeAndUpdateProduct(id);

  return { success: true, errors: {}, data: response };
}
