"use server";

import { customerRepo } from "@/backend/repositories/customers";
import { ServiceResult } from "@/types/types";
import { Customer } from "@/types/schemas";

export default async function findById(
  id: string
): Promise<ServiceResult<Customer>> {
  const response = await customerRepo.findById(id);

  return { success: true, fieldErrors: {}, data: response };
}
