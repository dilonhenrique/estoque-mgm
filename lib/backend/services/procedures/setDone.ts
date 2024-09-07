"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";
import { sanitizeDate } from "@/utils/parser/other/sanitizeDate";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function setDone(
  id: string,
  data: AnyObject
): Promise<ServiceResult<Procedure | null>> {
  await getSessionUserOrLogout();

  const preparedData = prepareDataForZod(data);
  preparedData.scheduled_for = sanitizeDate(preparedData.scheduled_for);
  
  const payload = schema.safeParse(preparedData);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
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

const schema = z.object({
  service_id: z.string().uuid().optional(),
  customer_id: z.string().uuid().optional(),
  labeled_customer_id: z.string().optional(),
  scheduled_for: z.coerce.date(),
  confirmed_by_customer: z
    .literal("confirmed")
    .optional()
    .transform((val) => val === "confirmed"),
  products: z
    .array(
      z.object({
        qty: z.coerce.number(),
        id: z.string().uuid(),
      })
    )
    .optional(),
});
