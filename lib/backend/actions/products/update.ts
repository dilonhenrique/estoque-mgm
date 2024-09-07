"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Product } from "@/types/schemas";
import { productService } from "@/backend/services/products";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ServiceResult<Product | null>> {
  return await productService.update(id, payload);
}
