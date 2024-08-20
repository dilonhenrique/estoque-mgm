"use server";

import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";
import { procedureRepo } from "@/backend/repositories/procedures";

export default async function remove(
  productId: string
): Promise<MutationResult<boolean>> {
  const deleted = await procedureRepo.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: deleted };
}
