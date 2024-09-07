"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { productService } from "@/backend/services/products";

export default async function create(
  payload: FormData | AnyObject
): Promise<ServiceResult<Product | null>> {
  return await productService.create(payload);
}
