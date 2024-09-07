"use server";

import { AnyObject, MutationResult } from "@/types/types";
import { Service } from "@/types/schemas";
import { serviceService } from "@/backend/services/services";

export default async function update(
  id: string,
  payload: FormData | AnyObject
): Promise<MutationResult<Service | null>> {
  return await serviceService.update(id, payload);
}
