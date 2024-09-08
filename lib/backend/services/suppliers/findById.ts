"use server";

import { ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierRepo } from "@/backend/repositories/suppliers";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function findById(
  id: string
): Promise<ServiceResult<Supplier>> {
  const response = await supplierRepo.findById(id);

  return serviceResult.success(response);
}
