import { z } from "zod";
import { LogCause } from "@prisma/client";

export const logSchema = z.object({
  qty: z.coerce.number(),
  cause: z.nativeEnum(LogCause),
  product_id: z.string().uuid(),
  procedure_id: z.string().uuid().optional(),
  purchase_id: z.string().uuid().optional(),
});
