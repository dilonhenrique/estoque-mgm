"use server";

import { MutationResult } from "../../../../types/types";
import { Purchase } from "../../../../types/schemas";
import { purchaseRepo } from "@/backend/repositories/purchases";

export default async function findById(
  productId: string
): Promise<MutationResult<Purchase | null>> {
  const response = await purchaseRepo.findById(productId);

  return { success: true, errors: {}, data: response };
}
