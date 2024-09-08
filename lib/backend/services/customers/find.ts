"use server";

import { customerRepo } from "@/backend/repositories/customers";
import { ServiceResult } from "@/types/types";
import { Customer } from "@/types/schemas";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function findById(
  id: string
): Promise<ServiceResult<Customer>> {
  const response = await customerRepo.findById(id);

  return serviceResult.success(response);
}
