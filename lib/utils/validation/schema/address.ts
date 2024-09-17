import { object, string } from "yup";


export const addressSchema = object({
  zip_code: string().required(),
  country: string().required(),
  state: string().required(),
  city: string().required(),
  neighborhood: string().optional(),
  street: string().required(),
  number: string().required(),
  complement: string().optional(),
})
