"use server";

import { productRepo } from "@/backend/repositories/products";
import { MutationResult } from "@/types/types";
import { Product } from "@/types/schemas";

export default async function findById(
  productId: string
): Promise<MutationResult<Product | null>> {
  const response = await productRepo.findById(productId);

  return { success: true, errors: {}, data: response };
}
