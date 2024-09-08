"use server";

import { productRepo } from "@/backend/repositories/products";
import { ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function findById(
  productId: string
): Promise<ServiceResult<Product | null>> {
  const response = await productRepo.findById(productId);

  return serviceResult.success(response);
}
