import { z } from "zod";
import { DocType } from "@prisma/client";

export const accountSchema = z.object({
  fullname: z.string(),
  professional_number: z.string(),
  document_type: z.nativeEnum(DocType),
  document: z.string(),
});
