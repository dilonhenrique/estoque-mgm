"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierService } from "@/backend/services/suppliers";

export default async function create(
  payload: FormData | AnyObject
): Promise<ServiceResult<Supplier | null>> {
  return await supplierService.create(payload);
}
