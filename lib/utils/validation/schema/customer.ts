import { date, object, string } from "yup";
import { addressSchema } from "./address";

const create = object({
  name: string().required(),
  email: string().email().optional(),
  img_url: string().optional(),
  birthday: date().optional(),
  phone: string().optional(),
  address: addressSchema.optional().default(undefined),
});

const update = create
  // .extend({
  //   address: addressSchema.optional().nullable(),
  // })
  .partial();

export const customerSchema = { create, update };
