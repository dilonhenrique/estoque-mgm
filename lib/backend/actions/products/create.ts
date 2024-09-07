"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { productService } from "@/backend/services/products";

export default async function create(
  payload: FormData | AnyObject
): Promise<MutationResult<Product | null>> {
  return await productService.create(payload);
}
