"use server";

import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/types";
import { procedureRepo } from "@/backend/repositories/procedures";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function remove(
  productId: string
): Promise<ServiceResult<boolean>> {
  const deleted = await procedureRepo.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return serviceResult.success(deleted);
}
