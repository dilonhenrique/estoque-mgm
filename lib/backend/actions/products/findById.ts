"use server";

import { productService } from "@/backend/services/products";
import { MutationResult } from "../../../../types/types";
import { Product } from "../../../../types/schemas";

export default async function findById(
  productId: string
): Promise<MutationResult<Product | null>> {
  const response = await productService.findById(productId);

  return { success: true, errors: {}, data: response };
}
