import { array, boolean, date, mixed, number, object, string } from "yup";

const create = object({
  name: string().required(),
  service_id: string().uuid().optional(),
  customer_id: string().uuid().optional(),
  labeled_customer_id: string().optional(),
  scheduled_for: date().optional(),
  confirmed_by_customer: boolean()
    .optional()
    .transform((_, originalValue) => originalValue === "confirmed"),
  products: array(
    object({
      qty: number()
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required(),
      id: string().uuid().required(),
    })
  ).optional(),
});

const update = create.partial();

const setDone = create.required({ scheduled_for: true });

export const procedureSchema = { create, update, setDone };
