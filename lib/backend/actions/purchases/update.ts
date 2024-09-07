"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { purchaseService } from "@/backend/services/purchases";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<MutationResult<Purchase | null>> {
  return await purchaseService.update(id, payload);
}
