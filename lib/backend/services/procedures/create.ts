"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "../../../../types/types";
import { isEmpty, omitBy } from "lodash";
import { Procedure } from "../../../../types/schemas";
import { mapZodErrors } from "@/utils/mapZodErrors";
import { procedureRepo } from "@/backend/repositories/procedures";
import { sanitizeDate } from "@/utils/sanitizeDate";
import { customerService } from "../customers";

export default async function create(
  product: FormData | { [k: string]: any }
): Promise<MutationResult<Procedure | null>> {
  const user = await getSessionUserOrLogout();

  const data: { [k: string]: any } = {
    ...(product instanceof FormData ? Object.fromEntries(product) : product),
    account_id: user.account_id,
    created_by: user.id,
  };
  data.scheduled_for = sanitizeDate(data.scheduled_for);

  const payload = schema.safeParse(omitBy(data, isEmpty));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  if (!payload.data.customer_id && payload.data.labeled_customer_id) {
    const customerResponse = await customerService.create({
      name: payload.data.labeled_customer_id,
    });
    payload.data.customer_id = customerResponse.data?.id;
  }

  const response = await procedureRepo.create({
    account_id: payload.data.account_id,
    created_by: payload.data.created_by,
    service_id: payload.data.service_id,
    customer_id: payload.data.customer_id,
    scheduled_for: payload.data.scheduled_for,
    confirmed_by_customer: payload.data.confirmed_by_customer,
    products: payload.data.products ?? [],
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
}

const schema = z.object({
  account_id: z.string().uuid(),
  created_by: z.string().uuid(),
  service_id: z.string().uuid().optional(),
  customer_id: z.string().uuid().optional(),
  labeled_customer_id: z.string().optional(),
  scheduled_for: z.coerce.date().optional(),
  confirmed_by_customer: z
    .literal("confirmed")
    .optional()
    .transform((val) => val === "confirmed"),
  products: z.array(
    z.object({
      qty: z.coerce.number(),
      id: z.string().uuid(),
    })
  ).optional(),
});
