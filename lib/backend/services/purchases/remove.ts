"use server";

import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { purchaseRepo } from "@/backend/repositories/purchases";

export default async function remove(
  id: string
): Promise<MutationResult<boolean>> {
  const deleted = await purchaseRepo.remove(id);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: deleted };
}
