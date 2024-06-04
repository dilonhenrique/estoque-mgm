"use server";

import { productService } from "@/backend/services/products";
import { getSessionUserOrThrow } from "@/utils/apiUtils";
import { revalidatePath } from "next/cache";
import { ActionResult } from "../../../../types/types";

export default async function updateStock(
  productId: string,
  increment: number
): Promise<ActionResult<boolean>> {
  const user = await getSessionUserOrThrow();

  const response = await productService.updateStock(
    productId,
    user._id,
    increment
  );

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: [], data: response };
}
