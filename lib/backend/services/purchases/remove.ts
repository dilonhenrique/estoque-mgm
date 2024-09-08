"use server";

import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/types";
import { purchaseRepo } from "@/backend/repositories/purchases";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function remove(
  id: string
): Promise<ServiceResult<boolean>> {
  const deleted = await purchaseRepo.remove(id);

  if (deleted) revalidatePath("/", "layout");
  return serviceResult.success(deleted);
}
