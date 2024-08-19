"use server";

import { customerRepo } from "@/backend/repositories/customers";
import { MutationResult } from "../../../../types/types";
import { Customer } from "../../../../types/schemas";

export default async function findById(
  id: string
): Promise<MutationResult<Customer>> {
  const response = await customerRepo.findById(id);

  return { success: true, errors: {}, data: response };
}
