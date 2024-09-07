"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Customer } from "@/types/schemas";
import { customerService } from "@/backend/services/customers";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<MutationResult<Customer | null>> {
  return await customerService.update(id, payload);
}
