"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Service } from "@/types/schemas";
import { serviceService } from "@/backend/services/services";
import { actionResult } from "@/utils/backend/actionResult";

export default async function create(
  payload: FormData | AnyObject
): Promise<ActionResult<Service | null>> {
  const response = await serviceService.create(payload);
  return actionResult(response);
}
