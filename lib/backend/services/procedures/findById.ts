"use server";

import { MutationResult } from "../../../../types/types";
import { Procedure } from "../../../../types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";

export default async function findById(
  productId: string
): Promise<MutationResult<Procedure | null>> {
  const response = await procedureRepo.findById(productId);

  return { success: true, errors: {}, data: response };
}
