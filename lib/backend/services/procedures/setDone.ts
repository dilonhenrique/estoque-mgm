"use server";

import { z } from "zod";
import { getSessionUserOrLogout } from "@/utils/authUtils";
import { revalidatePath } from "next/cache";
import { MutationResult } from "@/types/types";
import { Procedure } from "@/types/schemas";
import { mapZodErrors } from "@/utils/parser/other/mapZodErrors";
import { procedureRepo } from "@/backend/repositories/procedures";
import { sanitizeDate } from "@/utils/parser/other/sanitizeDate";
import { sanitizeEmptyValues } from "@/utils/form/sanitizeEmptyValues";

export default async function setDone(
  id: string,
  data: { [k: string]: any }
): Promise<MutationResult<Procedure | null>> {
  await getSessionUserOrLogout();

  data.scheduled_for = sanitizeDate(data.scheduled_for);
  const payload = schema.safeParse(sanitizeEmptyValues(data));

  if (!payload.success) {
    return { success: false, errors: mapZodErrors(payload.error.errors) };
  }

  const updatedProcedure = await procedureRepo.update(id, {
    service_id: payload.data.service_id,
    customer_id: payload.data.customer_id,
    scheduled_for: payload.data.scheduled_for,
    confirmed_by_customer: payload.data.confirmed_by_customer,
    products: payload.data.products ?? [],
  });

  if (!updatedProcedure) {
    return { success: false, errors: { form: "Erro de servidor" } };
  }

  const response = await procedureRepo.setDone(id, {
    products: updatedProcedure?.products,
  });

  if (response) revalidatePath("/", "layout");
  return { success: true, errors: {}, data: response };
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
