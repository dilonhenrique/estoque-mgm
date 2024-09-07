"use server";

import { ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierRepo } from "@/backend/repositories/suppliers";

export default async function findById(
  id: string
): Promise<ServiceResult<Supplier>> {
  const response = await supplierRepo.findById(id);

  return { success: true, fieldErrors: {}, data: response };
}
