"use server";

import { customerRepo } from "@/backend/repositories/customers";
import { MutationResult } from "@/types/types";
import { revalidatePath } from "next/cache";

export default async function remove(
  id: string
): Promise<MutationResult<boolean>> {
  const deleted = await customerRepo.remove(id);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: deleted };
}
