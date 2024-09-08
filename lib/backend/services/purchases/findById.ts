"use server";

import { ServiceResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { purchaseRepo } from "@/backend/repositories/purchases";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function findById(
  productId: string
): Promise<ServiceResult<Purchase | null>> {
  const response = await purchaseRepo.findById(productId);

  return serviceResult.success(response);
}
