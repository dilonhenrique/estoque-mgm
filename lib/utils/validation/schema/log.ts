import { lazy, number, object, string } from "yup";
import { LogCause } from "@prisma/client";

export const logSchema = object({
  qty: number().required(),
  cause: string().oneOf(Object.values(LogCause)).required(),
  product_id: string().uuid().required(),
  procedure_id: string().uuid().optional(),
  purchase_id: string().uuid().optional(),
});
