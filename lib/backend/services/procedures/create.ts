"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { AnyObject, ServiceResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { procedureRepo } from "@/backend/repositories/procedures";
import { sanitizeDate } from "@/utils/parser/other/sanitizeDate";
import { customerService } from "../customers";
import { prepareDataForZod } from "@/utils/form/prepareDataForZod";
import { serviceResult } from "@/utils/backend/serviceResult";

export default async function create(
  product: FormData | AnyObject
): Promise<ServiceResult<Procedure | null>> {
  const user = await getSessionUserOrLogout();

  const data = prepareDataForZod(product);
  data.scheduled_for = sanitizeDate(data.scheduled_for);

  const payload = schema.safeParse(data);

  if (!payload.success) {
    return serviceResult.fieldErrors(payload.error.errors);
  }

  if (!payload.data.customer_id && payload.data.labeled_customer_id) {
    const customerResponse = await customerService.create({
      name: payload.data.labeled_customer_id,
    });
    payload.data.customer_id = customerResponse.data?.id;
  }

  const response = await procedureRepo.create({
    account_id: user.account_id,
    created_by: user.id,
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

const schema = z.object({
  name: z.string(),
  service_id: z.string().uuid().optional(),
  customer_id: z.string().uuid().optional(),
  labeled_customer_id: z.string().optional(),
  scheduled_for: z.coerce.date().optional(),
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
