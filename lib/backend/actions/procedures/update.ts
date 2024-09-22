"use server";

import { ActionResult, AnyObject } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureService } from "@/backend/services/procedures";
import { actionResult } from "@/utils/backend/actionResult";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ActionResult<Procedure | null>> {
  const response = await procedureService.update(id, payload);
  return actionResult(response);
}
