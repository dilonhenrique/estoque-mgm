"use server";

import { productService } from "@/backend/services/products";
import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";

export default async function remove(
  productId: string
): Promise<MutationResult<boolean>> {
  const deleted = await productService.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: deleted };
}
