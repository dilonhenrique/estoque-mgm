"use server";

import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/types";
import { procedureRepo } from "@/backend/repositories/procedures";

export default async function remove(
  productId: string
): Promise<ServiceResult<boolean>> {
  const deleted = await procedureRepo.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, fieldErrors: {}, data: deleted };
}
