"use server";

import { productRepo } from "@/backend/repositories/products";
import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/types";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function remove(
  productId: string
): Promise<ServiceResult<boolean>> {
  const deleted = await productRepo.remove(productId);

  if (deleted) revalidatePath("/", "layout");
  return serviceResult.success(deleted);
}
