"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";
import { sanitizeDate } from "@/utils/parser/other/sanitizeDate";
import { prepareDataForSchema } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { procedureSchema } from "@/utils/validation/schema/procedure";
import { validateYupSchema } from "@/utils/form/validateYupSchema";

export default async function setDone(
  id: string,
  data: AnyObject
): Promise<ServiceResult<Procedure | null>> {
  await getSessionUserOrLogout();

  const preparedData = prepareDataForSchema(data);
  preparedData.scheduled_for = sanitizeDate(preparedData.scheduled_for);

  const payload = validateYupSchema(procedureSchema.setDone, preparedData);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.errors);
  }

  const updatedProcedure = await procedureRepo.update(id, {
    service_id: payload.data.service_id,
    customer_id: payload.data.customer_id,
    scheduled_for: payload.data.scheduled_for,
    confirmed_by_customer: payload.data.confirmed_by_customer,
    products: payload.data.products ?? [],
  });

  if (!updatedProcedure) {
    return serviceResult.error();
  }

  const response = await procedureRepo.setDone(id, {
    products: updatedProcedure?.products,
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}
