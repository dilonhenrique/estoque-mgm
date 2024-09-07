"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureService } from "@/backend/services/procedures";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<ServiceResult<Procedure | null>> {
  return await procedureService.update(id, payload);
}
