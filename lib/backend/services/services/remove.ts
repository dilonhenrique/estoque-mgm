"use server";

import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";
import { serviceRepo } from "@/backend/repositories/services";

export default async function remove(
  productId: string
): Promise<MutationResult<boolean>> {
  const deleted = await serviceRepo.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: deleted };
}
