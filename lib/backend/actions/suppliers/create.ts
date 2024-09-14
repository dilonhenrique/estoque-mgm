"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { supplierService } from "@/backend/services/suppliers";
import { actionResult } from "@/utils/backend/actionResult";

export default async function create(
  payload: FormData | AnyObject
): Promise<ActionResult<Supplier | null>> {
  const response = await supplierService.create(payload);
  return actionResult(response);
}
