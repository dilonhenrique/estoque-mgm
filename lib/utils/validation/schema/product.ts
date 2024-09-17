import { lazy, number, object, string } from "yup";

const create = object({
  name: string().required(),
  unit: string().required(),
  stock: number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required(),
  minStock: number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .optional(),
  code: string().optional(),
  category: object({
    id: string().optional().nullable(),
    name: string().optional(),
  }).optional(),
  img_url: string().optional(),
});

const update = create.partial();

export const productSchema = { create, update };
