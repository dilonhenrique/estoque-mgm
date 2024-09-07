"use server";

import { productRepo } from "@/backend/repositories/products";
import { ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";

export default async function findById(
  productId: string
): Promise<ServiceResult<Product | null>> {
  const response = await productRepo.findById(productId);

  return { success: true, fieldErrors: {}, data: response };
}
