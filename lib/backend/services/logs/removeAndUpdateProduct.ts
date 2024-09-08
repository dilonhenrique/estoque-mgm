"use server";

import { logRepo } from "@/backend/repositories/logs";
import { ServiceResult } from "@/types/types";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function removeAndUpdateProduct(
  id: string
): Promise<ServiceResult<boolean>> {
  const response = await logRepo.removeAndUpdateProduct(id);

  return serviceResult.success(!!response);
}
