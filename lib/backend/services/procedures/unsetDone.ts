"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function unsetDone(
  id: string
): Promise<ServiceResult<Procedure | null>> {
  await getSessionUserOrLogout();

  const response = await procedureRepo.unsetDone(id);

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}
