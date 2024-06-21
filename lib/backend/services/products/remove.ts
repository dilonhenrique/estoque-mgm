"use server";

import { productRepo } from "@/backend/repositories/products";
import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";

export default async function remove(
  productId: string
): Promise<MutationResult<boolean>> {
  const deleted = await productRepo.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: deleted };
}
