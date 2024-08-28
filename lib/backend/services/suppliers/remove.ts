"use server";

import { MutationResult } from "@/types/types";
import { revalidatePath } from "next/cache";
import { supplierRepo } from "@/backend/repositories/suppliers";

export default async function remove(
  id: string
): Promise<MutationResult<boolean>> {
  const deleted = await supplierRepo.remove(id);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: deleted };
}
