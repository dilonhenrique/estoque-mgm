"use server";

import { categoryRepo } from "@/backend/repositories/categories";
import { ServiceResult } from "@/types/types";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function remove(
  id: string
): Promise<ServiceResult<boolean>> {
  const response = await categoryRepo.remove(id);

  return serviceResult.success(!!response);
}
