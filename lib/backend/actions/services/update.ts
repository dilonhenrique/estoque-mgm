"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Service } from "@/types/schemas";
import { serviceService } from "@/backend/services/services";
import { actionResult } from "@/utils/backend/actionResult";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ActionResult<Service | null>> {
  const response = await serviceService.update(id, payload);
  return actionResult(response);
}
