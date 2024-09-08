"use server";

import { categoryRepo } from "@/backend/repositories/categories";
import { ProductCategory } from "@/types/schemas";
import { ServiceResult } from "@/types/types";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function findById(
  id: string
): Promise<ServiceResult<ProductCategory>> {
  const response = await categoryRepo.findById(id);

  if (!response) return serviceResult.error(404);

  return serviceResult.success(response);
}
