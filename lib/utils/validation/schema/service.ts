import { array, number, object, string } from "yup";

const create = object({
  name: string().required(),
  products: array(
    object({
      qty: number()
        .transform((value, originalValue) =>
          originalValue === "" ? undefined : value
        )
        .required(),
      id: string().uuid().required(),
    })
  ).required(),
});

const update = create.partial();

export const serviceSchema = { create, update };
