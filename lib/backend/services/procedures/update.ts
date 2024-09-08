"use server";

import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";
import { sanitizeDate } from "@/utils/parser/other/sanitizeDate";
import { customerService } from "../customers";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";
import { procedureSchema } from "@/utils/validation/schema/procedure";

export default async function update(
  id: string,
  product: FormData | AnyObject
): Promise<ServiceResult<Procedure | null>> {
  await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  data.scheduled_for = sanitizeDate(data.scheduled_for);

  const payload = procedureSchema.update.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  if (!payload.data.customer_id && payload.data.labeled_customer_id) {
    const customerResponse = await customerService.create({
      name: payload.data.labeled_customer_id,
    });
    payload.data.customer_id = customerResponse.data?.id;
  }

  const response = await procedureRepo.update(id, {
    name: payload.data.name,
    service_id: payload.data.service_id,
    customer_id: payload.data.customer_id,
    scheduled_for: payload.data.scheduled_for,
    confirmed_by_customer: payload.data.confirmed_by_customer,
    products: payload.data.products ?? [],
  });

  if (response) revalidatePath("/", "layout");
  return serviceResult.success(response);
}
