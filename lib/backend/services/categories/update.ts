"use server";

import { categoryRepo } from "@/backend/repositories/categories";
import { ProductCategory } from "@/types/schemas";
import { ServiceResult } from "@/types/types";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function update(
  id: string,
  name: string
): Promise<ServiceResult<ProductCategory>> {
  const response = await categoryRepo.update(id, name);
  return serviceResult.success(response);
}
