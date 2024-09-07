"use server";

import { ServiceResult } from "@/types/types";
import { revalidatePath } from "next/cache";
import { supplierRepo } from "@/backend/repositories/suppliers";

export default async function remove(
  id: string
): Promise<ServiceResult<boolean>> {
  const deleted = await supplierRepo.remove(id);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, fieldErrors: {}, data: deleted };
}
