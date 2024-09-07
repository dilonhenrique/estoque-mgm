"use server";

import { ServiceResult } from "@/types/types";
import { Service } from "@/types/schemas";
import { serviceRepo } from "@/backend/repositories/services";

export default async function findById(
  productId: string
): Promise<ServiceResult<Service | null>> {
  const response = await serviceRepo.findById(productId);

  return { success: true, fieldErrors: {}, data: response };
}
