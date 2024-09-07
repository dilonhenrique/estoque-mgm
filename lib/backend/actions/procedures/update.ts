"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureService } from "@/backend/services/procedures";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<MutationResult<Procedure | null>> {
  return await procedureService.update(id, payload);
}
