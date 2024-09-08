"use server";

import { ServiceResult } from "@/types/types";
import { revalidatePath } from "next/cache";
import { supplierRepo } from "@/backend/repositories/suppliers";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function remove(
  id: string
): Promise<ServiceResult<boolean>> {
  const deleted = await supplierRepo.remove(id);

  if (deleted) revalidatePath("/", "layout");
  return serviceResult.success(deleted);
}
