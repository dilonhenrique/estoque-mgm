"use server";

import { ActionResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureService } from "@/backend/services/procedures";
import { actionResult } from "@/utils/backend/actionResult";

export default async function unsetDone(
  id: string
): Promise<ActionResult<Procedure | null>> {
  const response = await procedureService.unsetDone(id);
  return actionResult(response);
}
