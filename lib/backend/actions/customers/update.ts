"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Customer } from "@/types/schemas";
import { customerService } from "@/backend/services/customers";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ServiceResult<Customer | null>> {
  return await customerService.update(id, payload);
}
