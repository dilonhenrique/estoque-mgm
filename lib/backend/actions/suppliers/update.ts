"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierService } from "@/backend/services/suppliers";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<MutationResult<Supplier | null>> {
  return await supplierService.update(id, payload);
}
