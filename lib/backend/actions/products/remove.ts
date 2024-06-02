"use server";

import { productService } from "@/backend/services/products";
import { revalidatePath } from "next/cache";
import { ActionResult } from "../../../../types/types";

export default async function remove(
  productId: string
): Promise<ActionResult<boolean>> {
  const deleted = await productService.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: [], data: deleted };
}
