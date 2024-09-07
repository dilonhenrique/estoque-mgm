"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Customer } from "@/types/schemas";
import { customerService } from "@/backend/services/customers";

export default async function create(
  payload: FormData | AnyObject
): Promise<MutationResult<Customer | null>> {
  return await customerService.create(payload);
}
