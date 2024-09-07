"use server";

import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/types";
import { serviceRepo } from "@/backend/repositories/services";

export default async function remove(
  productId: string
): Promise<ServiceResult<boolean>> {
  const deleted = await serviceRepo.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return { success: true, fieldErrors: {}, data: deleted };
}
