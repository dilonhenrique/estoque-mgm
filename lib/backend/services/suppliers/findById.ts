"use server";

import { MutationResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierRepo } from "@/backend/repositories/suppliers";

export default async function findById(
  id: string
): Promise<MutationResult<Supplier>> {
  const response = await supplierRepo.findById(id);

  return { success: true, errors: {}, data: response };
}
