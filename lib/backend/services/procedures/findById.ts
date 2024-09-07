"use server";

import { ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";

export default async function findById(
  productId: string
): Promise<ServiceResult<Procedure | null>> {
  const response = await procedureRepo.findById(productId);

  return { success: true, fieldErrors: {}, data: response };
}
