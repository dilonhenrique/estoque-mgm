"use server";

import { ActionResult, AnyObject, ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureService } from "@/backend/services/procedures";
import { actionResult } from "@/utils/backend/actionResult";

export default async function setDone(
  id: string,
  payload: AnyObject
): Promise<ActionResult<Procedure | null>> {
  const response = await procedureService.setDone(id, payload);
  return actionResult(response);
}
