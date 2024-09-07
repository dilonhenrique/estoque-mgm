"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Customer } from "@/types/schemas";
import { customerService } from "@/backend/services/customers";
import { actionResult } from "@/utils/backend/actionResult";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ActionResult<Customer | null>> {
  const response = await customerService.update(id, payload);
  return actionResult(response);
}
