"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierService } from "@/backend/services/suppliers";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ServiceResult<Supplier | null>> {
  return await supplierService.update(id, payload);
}
