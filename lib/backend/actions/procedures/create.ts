"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureService } from "@/backend/services/procedures";
import { actionResult } from "@/utils/backend/actionResult";

export default async function create(
  payload: FormData | AnyObject
): Promise<ActionResult<Procedure | null>> {
  const response = await procedureService.create(payload);
  return actionResult(response);
}
