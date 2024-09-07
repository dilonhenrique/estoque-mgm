"use server";

import { AnyObject, ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureService } from "@/backend/services/procedures";

export default async function create(
  payload: FormData | AnyObject
): Promise<ServiceResult<Procedure | null>> {
  return await procedureService.create(payload);
}
