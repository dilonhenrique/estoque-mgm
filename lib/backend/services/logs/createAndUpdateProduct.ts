"use server";

import { logRepo } from "@/backend/repositories/logs";
import { AnyObject, ServiceResult } from "@/types/types";
import { LogComplete } from "@/types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { z } from "zod";
import { LogCause } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function createAndUpdateProduct(
  formData: FormData | AnyObject
): Promise<ServiceResult<LogComplete>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(formData);
  const payload = schema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  const response = await logRepo.createAndUpdateProduct({
    qty: payload.data.qty,
    cause: payload.data.cause,
    product_id: payload.data.product_id,
    procedure_id: payload.data.procedure_id,
    purchase_id: payload.data.purchase_id,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}

const schema = z.object({
  qty: z.coerce.number(),
  cause: z.nativeEnum(LogCause),
  product_id: z.string().uuid(),
  procedure_id: z.string().uuid().optional(),
  purchase_id: z.string().uuid().optional(),
});
