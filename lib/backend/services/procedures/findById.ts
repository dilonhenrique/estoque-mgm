"use server";

import { ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function findById(
  productId: string
): Promise<ServiceResult<Procedure | null>> {
  const response = await procedureRepo.findById(productId);

  return serviceResult.success(response);
}
