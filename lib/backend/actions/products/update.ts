"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Product } from "@/types/schemas";
import { productService } from "@/backend/services/products";
import { actionResult } from "@/utils/backend/actionResult";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ActionResult<Product | null>> {
  const response = await productService.update(id, payload);
  return actionResult(response);
}
