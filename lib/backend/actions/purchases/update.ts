"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { purchaseService } from "@/backend/services/purchases";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ServiceResult<Purchase | null>> {
  return await purchaseService.update(id, payload);
}
