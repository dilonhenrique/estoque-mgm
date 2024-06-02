"use server";

import { productService } from "@/backend/services/products";
import { ActionResult } from "../../../../types/types";
import { Product } from "../../../../types/schemas";
import { WithStringId } from "@/utils/parseUtils";

export default async function findById(
  productId: string
): Promise<ActionResult<WithStringId<Product> | null>> {
  const response = await productService.findById(productId);

  return { success: true, errors: [], data: response };
}
