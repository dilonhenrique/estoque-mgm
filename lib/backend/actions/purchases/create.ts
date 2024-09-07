"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { purchaseService } from "@/backend/services/purchases";

export default async function create(
  payload: FormData | AnyObject
): Promise<ServiceResult<Purchase | null>> {
  return await purchaseService.create(payload);
}
