import { array, lazy, number, object, string } from "yup";

export const purchaseSchema = object({
  supplier_id: string().uuid().optional(),
  labeled_supplier_id: string().optional(),
  products: array(
    object({
      qty: number()
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required(),
      id: string().uuid().required(),
      cost: number()
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .optional(),
    })
  ).min(1),
});
