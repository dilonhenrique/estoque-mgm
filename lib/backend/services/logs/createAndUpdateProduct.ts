"use server";

import { logRepo } from "@/backend/repositories/logs";
import { AnyObject, ServiceResult } from "@/types/types";
import { LogComplete } from "@/types/schemas";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { logSchema } from "@/utils/validation/schema/log";
import { validateYupSchema } from "@/utils/form/validateYupSchema";

export default async function createAndUpdateProduct(
  formData: FormData | AnyObject
): Promise<ServiceResult<LogComplete>> {
  await getSessionUserOrLogout();

  const data = prepareDataForSchema(formData);
  // const payload = logSchema.validate(data);

  const payload = validateYupSchema(logSchema, data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.errors);
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
